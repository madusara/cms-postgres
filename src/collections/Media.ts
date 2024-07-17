import type { CollectionConfig } from 'payload'

import path from 'path'

export const Media: CollectionConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  slug: 'media',
  upload: true,
}
