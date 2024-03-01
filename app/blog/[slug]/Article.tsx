'use client'
import { useEffect, useState } from 'react'
import { fetchPostBySlug } from 'app/lib/api'
import PostLayout from '@/layouts/PostLayout'
import PageTitle from '@/components/PageTitle'
import ContentBlocksRenderer from '@/components/ContentBlocksRenderer'

export default function Article(slug) {
  const [articleData, setArticleData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPostBySlug(slug.params)
      .then((data) => {
        setArticleData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching article', error)
        setLoading(false)
      })
  }, [slug])
  if (loading) {
    return <div>Loading...</div>
  }

  if (!articleData) {
    return <div>Article not found</div>
  }

  const article = articleData.data[0].attributes
  console.log('article :', article)
  const { Title, Content } = article
  console.log('Title is', Title)
  const isArray = Array.isArray(Content)

  const Layout = PostLayout

  return (
    <>
      <PageTitle>{Title}</PageTitle>
      <Layout>
        <ContentBlocksRenderer content={Content} />

        <p>Le contenu de l'article n'est pas disponible.</p>

        {/* Autres éléments de la page ici */}
      </Layout>
    </>
  )
}
