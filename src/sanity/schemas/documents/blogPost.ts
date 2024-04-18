import { ImageIcon, TiersIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'blogPost',
  title: 'Article de blog',
  icon: TiersIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      type: 'array',
      name: 'body',
      title: 'Body',
      description:
        "This is where you can write the page's content. Including custom blocks like timelines for more a more visual display of information.",
      of: [
        // Paragraphs
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Paragraphe', value: 'normal' },
            { title: 'Citation', value: 'blockquote' },
            { title: 'Inline Code', value: 'inline-code' },
            { title: 'Lead', value: 'lead' },
            { title: 'Large', value: 'large' },
            { title: 'Small', value: 'small' },
            { title: 'Muted', value: 'muted' },
          ],
          marks: {
            decorators: [],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien externe',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'Liste à puces' },
            { title: 'Numbered', value: 'Liste ordonnée' },
          ],
        }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
        defineField({
          type: 'code',
          name: 'codeBloc',
          title: 'Bloc de code',
          options: {
            withFilename: true,
          },
        }),
        defineField({
          type: 'object',
          name: 'video',
          title: 'Video',
          fields: [
            defineField({
              type: 'mux.video',
              name: 'src',
              title: 'Src',
            }),
            defineField({
              type: 'string',
              name: 'caption',
              title: 'Caption',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Page',
        title,
      }
    },
  },
})
