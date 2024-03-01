export default function transformArticlesData(rawData) {
  return rawData.map((article) => {
    const { Title, Content, tags } = article.attributes

    // Extraire les noms des catégories des tags
    let transformedTags = []
    if (tags && tags.data && Array.isArray(tags.data)) {
      transformedTags = tags.data.map((tag) => tag.attributes.Categorie)
    }

    return {
      title: Title,
      content: Content,
      tags: transformedTags,
    }
  })
}
