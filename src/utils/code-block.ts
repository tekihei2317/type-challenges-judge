export function changeToCodeMarkdown(code: string, language: string) {
  return '```' + `${language}\n` + `${code}\n` + '```'
}
