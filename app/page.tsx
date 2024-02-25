import { fetchAllArticles } from './lib/api'
import Main from './Main'

export default async function Page() {
  try {
    const { data } = await fetchAllArticles()
    const posts = data

    return <Main posts={posts} />
  } catch (error) {
    console.error('Erreur lors de la récupération des articles: ', error)
    return <div>Erreur lors du chargement des articles</div>
  }
}
