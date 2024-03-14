'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchAllArticles } from 'app/lib/api'
import transformArticlesData from 'app/utils/transformRawData'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetchAllArticles()
        const articles = transformArticlesData(response)
        setArticles(articles)
      } catch (error) {
        console.error('Erreur lors de la récupération des articles', error)
      }
    }

    loadArticles()
  }, [])

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Rechercher des articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-md border-2 border-gray-300 p-4 focus:border-blue-500 focus:outline-none"
      />
      <div className="absolute mt-1 w-full rounded-md border border-gray-300 bg-white">
        {filteredArticles.map((article) => (
          <div
            key={article.slug}
            className="cursor-pointer p-2 hover:bg-gray-100"
            onClick={() => router.push(`/blog/${article.slug}`)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                router.push(`/blog/${article.slug}`)
              }
            }}
            role="button" // rôle "button" pour l'accessibilité
            tabIndex={0}
          >
            {article.attributes.title}
          </div>
        ))}
      </div>
    </div>
  )
}
