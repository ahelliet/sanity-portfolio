import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { toPlainText } from 'next-sanity'
import { Suspense } from 'react'

import { Footer } from '@/components/global/Footer'
import { Navbar } from '@/components/global/Navbar'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadBlogPage, loadSettings } from '@/sanity/loader/loadQuery'

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing'),
)

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: blogPage }] = await Promise.all([
    loadSettings(),
    loadBlogPage(),
  ])

  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  return {
    title: blogPage?.title
      ? {
          template: `%s | ${blogPage.title}`,
          default: blogPage.title || 'Personal website',
        }
      : undefined,
    description: blogPage?.overview
      ? toPlainText(blogPage.overview)
      : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function BlogRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white text-black">
        <Suspense>
          <Navbar />
        </Suspense>
        <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">
          <Suspense>{children}</Suspense>
        </div>
        <Suspense>
          <Footer />
        </Suspense>
      </div>
      {draftMode().isEnabled && <LiveVisualEditing />}
    </>
  )
}