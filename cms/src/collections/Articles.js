import { CustomHTMLBlock } from '../blocks/CustomHTMLBlock.js'
import { ContentBlock } from '../blocks/ContentBlock.js'

export const Articles = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'relatedGear',
      type: 'relationship',
      relationTo: 'gear',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      }
    },
    // --- THE NEW CATEGORIES FIELD ---
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
        // Optional: You can filter the UI to only show categories 
        // that match the Gear selected, but let's keep it simple for now.
      }
    },
    {
      name: 'isFree',
      type: 'checkbox',
      label: 'Free Article',
      defaultValue: false,
      admin: { position: 'sidebar' }
    },
    {
      name: 'versions',
      type: 'array',
      label: 'Article Versions',
      minRows: 1,
      fields: [
        {
          name: 'versionName',
          type: 'text',
          required: true,
          defaultValue: 'Default',
        },
        {
          name: 'content',
          type: 'blocks',
          required: true,
          blocks: [
            CustomHTMLBlock,
            ContentBlock
          ],
        }
      ]
    },
  ],
}