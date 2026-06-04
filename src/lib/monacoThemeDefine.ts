export function defineElmsCloudTheme(monaco) {
  monaco.editor.defineTheme('elms-cloud', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '909090', fontStyle: 'italic' },
      { token: 'keyword', foreground: '5570c5' },
      { token: 'string', foreground: '2e4296' },
      { token: 'number', foreground: '5570c5' },
      { token: 'type', foreground: '2e4296' },
      { token: 'function', foreground: '5570c5' },
    ],
    colors: {
      'editor.background': '#f7f7f7',
      'editor.foreground': '#111111',
      'editorLineNumber.foreground': '#bbbbbb',
      'editorLineNumber.activeForeground': '#252525',
      'editor.selectionBackground': '#bec9ea',
      'editor.inactiveSelectionBackground': '#eef0fa',
      'editorCursor.foreground': '#2e4296',
      'editor.lineHighlightBackground': '#f6f6f6',
      'editorWhitespace.foreground': '#e2e2e2',
      'editorIndentGuide.background': '#e2e2e2',
      'editorIndentGuide.activeBackground': '#bbbbbb',
      'editorBracketMatch.background': '#eef0fa',
      'editorBracketMatch.border': '#5570c5',
    },
  })

  monaco.editor.defineTheme('elms-cloud-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6f6f6f', fontStyle: 'italic' }, // dusk → #fff - #909090
      { token: 'keyword', foreground: '2e4296' },                       // prism → depth
      { token: 'string', foreground: '5570c5' },                        // depth → prism
      { token: 'number', foreground: '2e4296' },
      { token: 'type', foreground: '5570c5' },
      { token: 'function', foreground: '2e4296' },
    ],
    colors: {
      'editor.background': '#111111',              // cloud → ink
      'editor.foreground': '#f7f7f7',              // ink → cloud
      'editorLineNumber.foreground': '#444444',    // fog → #fff - #bbbbbb
      'editorLineNumber.activeForeground': '#e2e2e2', // ash → smoke
      'editor.selectionBackground': '#bec9ea',     // haze → haze (そのまま)
      'editor.inactiveSelectionBackground': '#110f05', // tint → #fff - #eef0fa
      'editorCursor.foreground': '#5570c5',        // depth → prism
      'editor.lineHighlightBackground': '#090909', // veil → #fff - #f6f6f6
      'editorWhitespace.foreground': '#252525',    // smoke → ash
      'editorIndentGuide.background': '#252525',
      'editorIndentGuide.activeBackground': '#444444', // fog → #fff - #bbbbbb
      'editorBracketMatch.background': '#110f05',  // tint → #fff - #eef0fa
      'editorBracketMatch.border': '#2e4296',      // prism → depth
    },
  })
}
