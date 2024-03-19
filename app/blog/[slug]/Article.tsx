'use client'
/* eslint-disable no-unused-vars, no-undef */

import { useEffect, useState } from 'react'
import { fetchPostBySlug } from 'app/lib/api'
import PostLayout from '@/layouts/PostLayout'
import ContentBlocksRenderer from '@/components/ContentBlocksRenderer'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'

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
  console.log('Article  :', article)
  const articleImage = article.Image.data ? article.Image.data.attributes : null
  const { Title, Content, Date, VideoUrl, tags } = article
  const isArray = Array.isArray(Content)
  const Layout = PostLayout

  return (
    <>
      <Layout title={Title} date={Date} locale={siteMetadata.locale}>
        {VideoUrl ? (
          <iframe
            width="560"
            height="560"
            src={VideoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className=" mx-auto md:h-64 lg:h-72"
          ></iframe>
        ) : (
          articleImage && (
            <Image
              alt={articleImage.alternativeText || 'Image'}
              className=" mx-auto h-48 w-48 rounded-full  "
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
