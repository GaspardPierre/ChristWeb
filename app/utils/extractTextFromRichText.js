export default function extractTextFromRichText(richTextContent) {
  if (!Array.isArray(richTextContent)) {
    throw new Error('Invalid input: richTextContent should be an array.')
  }

  // Fonction récursive pour extraire le texte des blocs de texte imbriqués
  const extractText = (block) => {
    if (block && Array.isArray(block.children)) {
      return block.children.map((child) => extractText(child)).join(' ')
    }

    return block.text || ''
  }

  // Appliquez la fonction récursive à chaque bloc de texte et concaténez les résultats
  return richTextContent
    .map((block) => extractText(block))
    .join(' ')
    .trim()
}
