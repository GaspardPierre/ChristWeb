'use server'

const STRAPI_URL = process.env.STRAPI_URL

export const fetchAllAuthors = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/autors`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600',
      },
    })
    const { data } = await response.json()

    return data
  } catch (error) {
    {
      console.error('Erreur lors de la récupération des articles: ', error)
    }
  }
}

export const fetchAuthorById = async (authorId) => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/autors/${authorId}?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600', // ou 'Cache-Control': 'no-store' pour les données dynamiques
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération de l" auteur: ', error)
  }
}
