/* eslint-disable no-unused-vars, no-undef */

export default function transformAuthorsData(rawData) {
  return rawData.map((authors) => {
    const { name, web, bio, links, avatar, articles } = authors.attributes

    let transformedArticles = []
    if (articles && articles.data && Array.isArray(articles.data)) {
      transformedArticles = articles.data.map((article) => article.attributes.slug)
    }

    return {
      name,
      web,
      bio,
      links,
      avatar,
      articles: transformedArticles,
    }
  })
}
