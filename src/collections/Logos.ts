import type { CollectionConfig } from 'payload/types'

import { LinkFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

export const Logos: CollectionConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      required: true,
      type: 'text',
    },
    {
      name: 'caption',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [LinkFeature({})],
      }),
      type: 'richText',
    },
  ],
  slug: 'logos',
  upload: {
    staticDir: path.resolve(__dirname, '../../../logos'),
  },
}
