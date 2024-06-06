import type { CollectionConfig } from 'payload/types'

export const Guides: CollectionConfig = {
  slug: 'guides',
  admin: {
    useAsTitle: 'name',
  },
  access:{
    read: () => true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Title',
      required: true
    },
    {
      name: 'image',
      relationTo: 'media',
      type: 'upload',
      label: 'Image'
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Image URL',
    },
  ],
}
