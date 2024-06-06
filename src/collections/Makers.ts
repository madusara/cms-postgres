import type { CollectionConfig } from 'payload/types'

export const Makers: CollectionConfig = {
  slug: 'makers',
  admin: {
    useAsTitle: 'id',
  },
  access:{
    read: () => true
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: 'ID',
      required: true
    },
    {
      name: 'products',
      fields: [
        {
          name: 'product',
          type: 'text',
        },
      ],
      type: 'array',
      label: 'Products',
      required: true
    },
    // {
    //   name: 'logo',
    //   relationTo: 'logos',
    //   type: 'upload',
    //   label: 'Brand',
    //   filterOptions: {
    //     mimeType: { contains: 'image' },
    //   },
    // },
    {
      name: 'logoUrl',
      type: 'text',
      label: 'Logo URL',
      required: true
    },
    {
      name: 'fcr-d',
      type: 'checkbox',
      label: "FCR-D"
    },
    {
      name: 'ffr',
      type: 'checkbox',
      label: "FFR"
    },
  ],
}
