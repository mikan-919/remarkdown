'use server'
import { GoogleGenAI, Type } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' })

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    detectedLanguage: {
      type: Type.STRING,
      description: 'BCP-47 language code of the input text (e.g. "ja", "en", "zh-CN")',
    },
    translatedText: {
      type: Type.STRING,
      description: 'Translated markdown text. Preserve all markdown syntax.',
    },
  },
  required: ['detectedLanguage', 'translatedText'],
}

export type TranslationResult = {
  detectedLanguage: string
  translatedText: string
}

export async function translateAction(source: string, targetLang: string): Promise<TranslationResult> {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: `First, identify the primary language of the following text and return its exact BCP-47 code (e.g. "ja", "en", "zh-CN", "zh-TW", "ko", "fr", "de", "es"). Then translate the text to ${targetLang}. Preserve all markdown syntax exactly. Do not translate code blocks.\n\n${source}`,
    config: {
      responseMimeType: 'application/json',
      responseSchema,
    },
  })

  return JSON.parse(response.text ?? '{}') as TranslationResult
}
