import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { BlogPage } from '@/components/pages/blog/BlogPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadBlogPage } from '@/sanity/loader/loadQuery'
const BlogPagePreview = dynamic(
  () => import('@/components/pages/blog/BlogPagePreview'),
)

export default async function BlogRoute() {
  const initial = await loadBlogPage()

  if (draftMode().isEnabled) {
    return <BlogPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a blog page yet,{' '}
        <Link href={`${studioUrl}/desk/blog`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <BlogPage data={initial.data} />
}