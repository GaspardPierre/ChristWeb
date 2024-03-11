'use client'
import { useEffect, useState } from 'react'
import { KBarSearchProvider } from 'pliny/search/KBar'
import { KBarResults, useMatches, useKBar } from 'kbar'
import { useRouter } from 'next/navigation'
import { fetchAllArticles } from 'app/lib/api'
import { ArticlesResponse, ArticleActions } from 'Types/types'

export const SearchProvider = ({ children }) => {
  const router = useRouter()
  const { query } = useKBar()
  const [actions, setActions] = useState<ArticleActions[]>([])

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response: ArticlesResponse = await fetchAllArticles()
        console.log('Articles response', response)

        const articleActions = response.data.map((article) => {
          // Make sure to use the correct case for 'Title' if it's uppercase in the API
          const title = article.attributes.Title || article.attributes.title
          const tags = Array.isArray(article.attributes.tags)
            ? article.attributes.tags.join(', ')
            : ''

          return {
            id: article.id.toString(),
            name: title,
            slug: article.attributes.slug,
            keywords: title, // This is important for searching by title
            section: 'Blog',
            subtitle: tags,
            perform: () => router.push(`/blog/${article.attributes.slug}`),
          }
        })

        setActions(articleActions)
      } catch (error) {
        console.error('Erreur lors de la récupération des articles', error)
      }
    }
console.log('QUERY ', query)
    loadArticles()
  }, [query]) // React to changes in the kbar query

  const RenderResults = () => {
    const { results } = useMatches()
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) => (
          <div style={{ background: active ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}>
              {({ name }: ActionImpl) => name}
          </div>
        )}
      />
    )
  }

  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: false,
        defaultActions: actions,
      }}
    >
      {children}
      <RenderResults /> {/* This will render the search results */}
    </KBarSearchProvider>
  )
}
