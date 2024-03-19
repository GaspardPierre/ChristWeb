import ListLayout from '@/layouts/ListLayoutWithTags'
import { fetchAllArticles } from 'app/lib/api'
import { genPageMetadata } from 'app/seo'
import transformArticlesData from 'app/utils/transformRawData'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })
//It will be used at build time to generate pagination paths.
export async function generateStaticParams() {
  const response = await fetchAllArticles()
  const articles = response.data
  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE)

  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: { page: (index + 1).toString() },
  }))

  return paths
}

export default async function Page({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page, 10)
  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const { data: articles } = await fetchAllArticles()
  const posts = transformArticlesData(articles)
  const postsToShow = posts.slice(startIndex, endIndex)
  console.log('*****POST TO SHOW :', postsToShow)

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(articles.length / POSTS_PER_PAGE),
  }

  return <ListLayout posts={postsToShow} pagination={pagination} title="articles..." />
}
