import parse from 'html-react-parser'
// Transformed data from Strapi
export const transformPostData = (strapiPosts) =>
  strapiPosts.map((post) => {
    const { id, attributes } = post
    const title = attributes?.Title || 'Titre non disponible'
    const date = attributes?.Date || 'Date non disponible'
    const content = attributes?.Content ? parse(attributes.Content) : 'Contenu non disponible'
    return {
      slug: id?.toString() || 'id-inconnu',
      date,
      title,
      content,
      tags: [], // Ajoutez des tags si disponibles
    }
  })
export function flattenAttributes(data: any): any {
  console.log('Flattening data:', data) // Log initial data

  // Base case for recursion
  if (!data) return null

  // Handling array data
  if (Array.isArray(data)) {
    console.log('Data is an array, processing each item...') // Log for array data
    return data.map(flattenAttributes)
  }

  const flattened: { [key: string]: any } = {}

  // Handling attributes
  if (data.attributes) {
    console.log('Processing attributes...') // Log for attributes
    for (const key in data.attributes) {
      if (
        typeof data.attributes[key] === 'object' &&
        data.attributes[key] !== null &&
        'data' in data.attributes[key]
      ) {
        console.log(`Flattening nested data for key: ${key}`) // Log for nested data
        flattened[key] = flattenAttributes(data.attributes[key].data)
      } else {
        flattened[key] = data.attributes[key]
      }
    }
  }
  // Traitement spécifique pour la propriété Content
  if (flattened.Content && Array.isArray(flattened.Content)) {
    flattened.Content = flattened.Content.map((contentItem) => {
      if (contentItem.children && Array.isArray(contentItem.children)) {
        return {
          ...contentItem,
          children: contentItem.children.map(flattenAttributes),
        }
      }
      return contentItem
    })
  }

  // Copying non-attributes and non-data properties
  for (const key in data) {
    if (key !== 'attributes' && key !== 'data') {
      flattened[key] = data[key]
    }
  }

  console.log('Flattened data:', flattened) // Log final flattened data
  return flattened
}
