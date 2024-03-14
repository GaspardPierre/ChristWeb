import React, { ReactNode } from 'react'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import FormattedDate from '@/components/FormattedDate'
import Link from '@/components/Link'

interface LayoutProps {
  title: string
  children: ReactNode
  date: string
  locale: string
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostLayout({ title, children, date, locale, next, prev }: LayoutProps) {
  console.log('title: ', title)
  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <FormattedDate date={date} locale={locale} />
            <PageTitle>{title}</PageTitle>
          </div>
        </header>
        <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
        <footer>
          <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
            {prev && prev.path && (
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${prev.path}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={`Previous post: ${prev.title}`}
                >
                  &larr; {prev.title}
                </Link>
              </div>
            )}
            {next && next.path && (
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${next.path}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={`Next post: ${next.title}`}
                >
                  {next.title} &rarr;
                </Link>
              </div>
            )}
          </div>
        </footer>
      </article>
    </SectionContainer>
  )
}
