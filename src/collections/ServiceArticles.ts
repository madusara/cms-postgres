import type { CollectionConfig } from 'payload/types'

export const ServiceArticles: CollectionConfig = {
  slug: 'ServiceArticles',
  admin: {
    useAsTitle: 'title',
  },
  access:{
    read: () => true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true
    },
    {
      name: 'shortDescription',
      type: 'text',
      label: 'Short description',
      required: true
    },
    {
        name: 'longDescription',
        type: 'text',
        label: 'Long description',
        required: true
    },
    // {
    //   name: 'media',
    //   relationTo: 'media',
    //   type: 'upload',
    // },
    {
        name: 'imageUrl',
        type: 'text',
        label: 'Image URL',
      },
  ],
}
