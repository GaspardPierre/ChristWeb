'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { flattenAttributes } from 'app/utils/data'

const STRAPI_URL = process.env.STRAPI_URL

export const fetchAllArticles = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?sort=Date:desc&populate[tags]=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        /* 'Cache-Control': 'max-age=3600', */
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
        /*  'Cache-Control': 'max-age=3600', */
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des slugs des articles: ', error)
  }
}

export const fetchPostBySlug = async (slug) => {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=tags`
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
