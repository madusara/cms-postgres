import type { CollectionConfig } from 'payload/types'

export const Brps: CollectionConfig = {
  slug: 'brps',
  admin: {
    useAsTitle: 'area',
  },
  access:{
    read: () => true
  },
  fields: [
    {
      name: 'area',
      type: 'text',
      label: 'Area'
    },
    {
      name: 'brps',
      fields: [
        {
          name: 'brpName',
          type: 'text',
        },
        {
          name: 'capacity',
          type: 'text',
        },
      ],
      type: 'array',
      label: 'Brps'
    }
  ],
}
