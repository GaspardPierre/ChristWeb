'use server'

const STRAPI_URL = process.env.STRAPI_URL

export const fetchAllCategories = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/cattegories?sort=Date:desc&populate[tags]=*`, {
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
    console.error('Erreur lors de la récupération des categories: ', error)
  }
}

export const fetchCategoryById = async (categoryId) => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories/${categoryId}?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600', // ou 'Cache-Control': 'no-store' pour les données dynamiques
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie: ', error)
  }
}
