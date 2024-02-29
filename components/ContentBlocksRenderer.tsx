import { BlocksRenderer } from '@strapi/blocks-react-renderer'
const ContentBlocksRenderer = ({ content }) => {
  return <BlocksRenderer content={content} />
}

export default ContentBlocksRenderer
