export interface ImageData {
  data: {
    attributes: {
      url: string
      alternativeText: string
    }
  }
}
export interface TagData {
  id: number
  attributes: {
    Categorie: string
  }
}

/* export interface ArticleAttributes {
  Title: string
  Content: string
  Date: string
  Image: ImageData
  tags: TagData
  slug: string
  path: string
  VideoUrl: string
}

export interface Article {
  id: number
  attributes: ArticleAttributes
  meta?: Record<string, unknown>
}
 */
/* export interface ArticlesResponse {
  data: Article[]
  meta?: Record<string, unknown>
} */

export interface ArticleActions {
  id: string
  name: string
  keywords: string
  section: string
  subtitle: string
  slug: string
  perform: () => void
}
export interface SearchConfig {
  // Exemples de champs, adaptez-les à vos besoins
  provider: 'algolia' | 'kbar'
  apiKey: string
  indexName: string
  query: string
}

export interface SearchProviderProps {
  children: React.ReactNode
  searchConfig?: SearchConfig
}
