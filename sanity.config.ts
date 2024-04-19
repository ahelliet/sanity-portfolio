'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import { assist } from '@sanity/assist'
import { codeInput } from '@sanity/code-input'
import { frFRLocale } from '@sanity/locale-fr-fr'
import {scheduledPublishing} from '@sanity/scheduled-publishing'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import {media} from 'sanity-plugin-media'
import {muxInput} from 'sanity-plugin-mux-input'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { locate } from '@/sanity/plugins/locate'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import blogPost from '@/sanity/schemas/documents/blogPost'
import page from '@/sanity/schemas/documents/page'
import project from '@/sanity/schemas/documents/project'
import duration from '@/sanity/schemas/objects/duration'
import milestone from '@/sanity/schemas/objects/milestone'
import timeline from '@/sanity/schemas/objects/timeline'
import blog from '@/sanity/schemas/singletons/blog'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'

const title =
  'BreizhWeb.Dev' ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  document: {
    unstable_comments: {
      enabled: true
    },
  },
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      blog,
      // Documents
      duration,
      page,
      project,
      blogPost,
      // Objects
      milestone,
      // @ts-expect-error
      timeline,
    ],
  },
  plugins: [
    frFRLocale(),
    structureTool({
      structure: pageStructure([home, blog, settings]),
    }),
    presentationTool({
      locate,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name, blog.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    media(),
    scheduledPublishing(),
    muxInput(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    assist(),
  ],
})