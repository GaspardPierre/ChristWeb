import { unstable_noStore as noStore } from 'next/cache'
import { flattenAttributes } from 'app/utils/data'

const STRAPI_URL = process.env.STRAPI_URL

export const fetchAllArticles = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?sort[publishedAt]=desc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    })
    const data = await response.json()
    console.log('*******************DATA***********************', data)
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des articles: ', error)
  }
}
