'use client'
import { useEffect, useState } from 'react'
import { fetchPostBySlug } from 'app/lib/api'
import PostLayout from '@/layouts/PostLayout'
import ContentBlocksRenderer from '@/components/ContentBlocksRenderer'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import FormattedDate from '@/components/FormattedDate'
import { metadata } from 'app/layout'
interface ImageData {
  data: {
    attributes: {
      url: string
      alternativeText: string
    }
  }
}

interface ArticleData {
  data: {
    attributes: {
      Title: string
      Content: string
      Date: string
      Image: ImageData
      VideoUrl?: string
    }[]
  }
}

export default function Article(slug) {
  const [articleData, setArticleData] = useState<ArticleData | null>(null)
  const [loading, setLoading] = useState(true)
  console.log('Slug dans article, ', slug)

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
  const articleImage = article.Image.data ? article.Image.data.attributes : null
  const { Title, Content, Date, VideoUrl } = article
  const isArray = Array.isArray(Content)
  const Layout = PostLayout

  return (
    <>
      <Layout title={Title} date={Date} locale={siteMetadata.locale}>
        {VideoUrl ? (
          <iframe
            width="560"
            height="315"
            src={VideoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            className="  w-full object-cover object-center md:h-64 lg:h-72"
          ></iframe>
        ) : (
          articleImage && (
            <Image
              alt={articleImage.alternativeText || 'Image'}
              src={`http://127.0.0.1:1337${articleImage.url}`}
              className="  w-full object-cover object-center md:h-64 lg:h-72"
              width={544}
              height={306}
            />
          )
        )}

        {Content && <ContentBlocksRenderer content={Content} />}
      </Layout>
    </>
  )
}
