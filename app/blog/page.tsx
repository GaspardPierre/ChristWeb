import ListLayout from '@/layouts/ListLayoutWithTags'
import { fetchAllArticles } from 'app/lib/api'
import { genPageMetadata } from 'app/seo'
import transformArticlesData from 'app/utils/transformRawData'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const { data } = await fetchAllArticles()
  const posts = transformArticlesData(data)
  console.log('POSTS********', posts)
  const pageNumber = 1
  let pagination = {}
  let initialDisplayPosts = ''
  if (data && data.length && posts) {
    initialDisplayPosts = posts.slice(
      POSTS_PER_PAGE * (pageNumber - 1),
      POSTS_PER_PAGE * pageNumber
    )
    pagination = {
      currentPage: pageNumber,
      totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    }
    console.log(pagination, initialDisplayPosts)
  }
  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="articles..."
      t
    />
  )
}
