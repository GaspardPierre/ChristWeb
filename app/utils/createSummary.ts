export default function createSummary(content, maxWords = 100) {
  if (typeof content !== 'string') {
    console.error('createSummary: content must be a string')
    return ''
  }
  const words = content.split(' ')
  let summary = ''
  let wordCount = 0

  for (let i = 0; i < words.length; i++) {
    summary += words[i] + ' '
    wordCount++
    if (wordCount >= maxWords) break
  }

  return summary.trim() + '...'
}
