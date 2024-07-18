import type { CollectionConfig } from "payload";
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      required: true,
    },
    {
      name: "shortDescription",
      type: "text",
      label: "Short description",
      required: true,
    },
    {
      name: "price",
      type: "number",
      label: "Price",
      required: true,
    },
    {
      name: "currency",
      type: "text",
      label: "Currency",
      required: true,
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
      ],
      required: true,
    },
    {
      name: "inventoryQuantity",
      type: "text",
      label: "Inventory Quantity",
      required: true,
    },
    {
      name: "images",
      fields: [
        {
          name: "image",
          relationTo: 'media',
          type: "upload",
        },
      ],
      type: "array",
      label: "Images",
    },
    {
      name: "contentBlocks",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Block title",
        },
        {
          name: "type",
          type: "select",
          options: [
            {
              label: "List",
              value: "list",
            },
            {
              label: "Paragraph",
              value: "Paragraph",
            },
          ],
        },
        {
          name: "content",
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              // The HTMLConverter Feature is the feature which manages the HTML serializers.
              // If you do not pass any arguments to it, it will use the default serializers.
              HTMLConverterFeature({}),
            ],
          }),
          type: "richText",
        },
        lexicalHTML('content', { name: 'content_html' }),
      ],
      type: "array",
      label: "Content blocks",
    },
    {
      name: "categories",
      fields: [
        {
          name: "name",
          type: "text",
        },
      ],
      type: "array",
      label: "Categories",
    },
    {
      name: "options",
      fields: [
        {
          name: "name",
          type: "text",
        },
        {
          name: "values",
          type: "text",
        },
      ],
      type: "array",
      label: "Options",
    },

    {
      name: "sku",
      type: "text",
      label: "SKU",
    },
    {
      name: "tags",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
      type: "array",
      label: "Tags",
    },
    {
      name: "variants",
      fields: [
        {
          name: "variant",
          type: "text",
        },
      ],
      type: "array",
      label: "Variants",
    },
    {
      name: "weight",
      type: "text",
      label: "Weight",
    },
    {
      name: "weightUnit",
      type: "text",
      label: "Weight Unit",
    },
  ],
};
