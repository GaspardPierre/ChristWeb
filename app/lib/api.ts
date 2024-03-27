'use server'

const STRAPI_URL = process.env.STRAPI_URL

export const fetchAllArticles = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?sort=Date:desc&populate[tags]=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600',
        /*  'Cache-Control': 'force-cache', */
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des articles: ', error)
  }
}

export const fetchAllArticleSlugs = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?fields[0]=slug&populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600',
      },
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des slugs des articles: ', error)
  }
}

export const fetchPostBySlug = async (slug) => {
  console.log('slug dans li/api ,', slug)
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate[tags][populate]=*&populate[author][populate]=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      }
    )
    const data = await response.json()

    return data
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error)
    return null
  }
}
export const fetchPostByTag = async (tag) => {
  try {
    const url = `${STRAPI_URL}/api/articles-by-tag?tag=${encodeURIComponent(tag)}`
    const response = await fetch(url)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error)
    return null
  }
}
export const fetchAllTags = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })
    const { data } = await response.json()

    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des categories: ', error)
    return []
  }
}

export async function fetchTagsWithArticleCount() {
  console.log('Tags with Count appelé !!!')
  const tags = await fetchAllTags()
  const tagsWithCounts = await Promise.all(
    tags.map(async (tag) => {
      try {
        const articles = await fetchPostByTag(tag)
        return { tag, count: articles ? articles.length : 0 }
      } catch (error) {
        console.error('Erreur lors de la récupération des articles pour le tag:', tag, error)
        return { tag, count: 0 }
      }
    })
  )
  console.log(tagsWithCounts, 'Tags with count')
  return tagsWithCounts
}

export async function searchStrapi(query, options = {}) {
  const defaultOptions = {
    sort: 'createdAt:desc',
    fields: ['Title', 'Date'],
    populate: '*',
    ...options,
  }

  const queryParams = new URLSearchParams({
    'filters[Title][$containsi]': query,
    sort: defaultOptions.sort,
    'fields[]': defaultOptions.fields.join(','),
    populate: defaultOptions.populate,
  }).toString()

  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Erreur HTTP: ${response.status}, Corps de la réponse: ${errorBody}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    return null
  }
}
