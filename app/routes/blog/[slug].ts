/* import { fetchPostBySlug } from 'app/lib/api'
import { fetchAuthorById } from 'app/lib/author'
import transformAuthorsData from 'app/utils/transformAuthorsData'

export default async function ArticleHandler({ params }) {
  try {
    console.log('Slug dans ArticleHandler: ', params.slug)
    const articleResponse = await fetchPostBySlug(params.slug)

    const article = articleResponse.data[0]
    console.log('*****************article******** : ', article)

    const authorId = article.attributes.author.data.id

    const authorResponse = await fetchAuthorById(authorId)
    const authorDetails = transformAuthorsData(authorResponse.data)

    return { props: { article, authorDetails } }
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error)
    return { notFound: true }
  }
}
 */
