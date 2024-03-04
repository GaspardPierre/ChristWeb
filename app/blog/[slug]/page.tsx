import { useEffect, useState } from 'react'
import 'css/prism.css'
import 'katex/dist/katex.css'
import PageTitle from '@/components/PageTitle'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import Article from './Article'
import { fetchPostBySlug, fetchAllArticleSlugs } from '../../lib/api'
import extractTextFromRichText from 'app/utils/extractTextFromRichText'
import siteMetadata from '@/data/siteMetadata'

// Mappings des layouts
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateStaticParams() {
  const response = await fetchAllArticleSlugs()
  const articles = response.data
  console.log('REsponse from generate', articles)
  return articles.map((article) => ({
    params: { slug: article.slug },
  }))
}

export async function generateMetadata(params) {
  const slug = params.params.slug

  const articleResponse = await fetchPostBySlug(slug)

  if (!articleResponse || !articleResponse.data || !articleResponse.data[0]) {
    return undefined
  }

  const article = articleResponse.data[0].attributes
  const contentText = extractTextFromRichText(article.Content)
  const description = contentText.length > 150 ? contentText.substring(0, 150) + '...' : contentText
  const publishedAt = article.Date ? new Date(article.Date).toISOString() : ''
  const imageUrl = article.Image
    ? article.Image.includes('http')
      ? article.Image
      : siteMetadata.siteUrl + article.Image
    : siteMetadata.socialBanner
  /*  const tags =
      article.tags && Array.isArray(article.tags)
        ? article.tags.map((tag) => tag.Categorie).join(', ')
        : '' */
  console.log(description, article.Title, publishedAt)
  return {
    slug,
    title: article.Title,
    description,
    contentText,
    content: article.Content,
    openGraph: {
      title: article.Title,
      description,
      siteName: siteMetadata.title,
      locale: 'fr_FR',
      type: 'article',
      publishedTime: publishedAt,
      url: `./${article.slug}`,
      images: [{ url: imageUrl }],
      /*   tags, */
    },
  }
}

export default async function Page({ params }) {
  const { slug } = params
  return <Article params={slug} />
}
