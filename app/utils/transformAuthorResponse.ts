/* eslint-disable no-unused-vars, no-undef */

interface AuthorAttributes {
  name: string
  web?: string
  bio?: string
  links?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  articles?: any[]
  avatar?: any
}

interface Author {
  id: number
  attributes: AuthorAttributes
}

interface AuthorResponse {
  data: Author
  meta: any
}

export default function transformAuthorResponse(authorResponse: AuthorResponse): Author[] {
  const { data } = authorResponse

  return [data]
}
