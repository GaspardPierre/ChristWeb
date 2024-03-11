export interface ImageData {
  data: {
    attributes: {
      url: string
      alternativeText: string
    }
  }
}
export interface ArticleAttributes {
  title: string
  content: string
  date: string
  Image: ImageData
  tags: string[]
  slug: string
  path: string
  video: string
}

export interface Article {
  id: number
  attributes: ArticleAttributes
  meta?: Record<string, unknown>
}

export interface ArticlesResponse {
  data: Article[]
  meta?: Record<string, unknown>
}

export interface ArticleActions {
  id: string
  name: string
  keywords: string
  section: string
  subtitle: string
  slug: string
  perform: () => void
}
