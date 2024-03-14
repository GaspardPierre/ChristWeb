import ListLayout from '@/layouts/ListLayoutWithTags'
import { fetchAllArticles } from 'app/lib/api'
import { genPageMetadata } from 'app/seo'
import transformArticlesData from 'app/utils/transformRawData'

const POSTS_PER_PAGE = 5

interface Pagination {
  currentPage: number
  totalPages: number
}

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const { data } = await fetchAllArticles()
  const posts = transformArticlesData(data)
  const pageNumber = 1

  // Initialiser avec les types appropriés
  let pagination: Pagination = { currentPage: 0, totalPages: 0 }
  let initialDisplayPosts = []

  if (data && data.length > 0 && posts) {
    initialDisplayPosts = posts.slice(
      POSTS_PER_PAGE * (pageNumber - 1),
      POSTS_PER_PAGE * pageNumber
    )
    pagination = {
      currentPage: pageNumber,
      totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    }
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="Tous les articles..."
    />
  )
}
