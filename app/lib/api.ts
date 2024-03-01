'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { flattenAttributes } from 'app/utils/data'

const STRAPI_URL = process.env.STRAPI_URL

export const fetchAllArticles = async () => {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?sort[publishedAt]=desc&populate[tags]=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          /* 'Cache-Control': 'max-age=3600', */
        },
      }
    )
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

export const fetchAllTags = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        /*  'Cache-Control': 'no-store', */
      },
    })
    const { data } = await response.json()

    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des categories: ', error)
    return []
  }
}
