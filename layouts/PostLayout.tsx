import React from 'react'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface LayoutProps {
  title: string
  children: React.ReactNode
}

export default function PostLayout({ title, children }: LayoutProps) {
  console.log('title: ', title)
  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <PageTitle>{title}</PageTitle>
          </div>
        </header>
        <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
      </article>
    </SectionContainer>
  )
}
