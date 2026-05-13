import { lexicalEditor } from '@payloadcms/richtext-lexical'

// 1. Import the new standalone HTML converter utility
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

export const ContentBlock = {
  slug: 'content',
  labels: {
    singular: 'Standard Content',
    plural: 'Content Blocks',
  },
  fields: [
    {
      name: 'richText',
      type: 'richText',
      required: true,
      label: 'Article Text',
      editor: lexicalEditor(), // The standard editor works fine now!
    },
    {
      // 2. Manually define the "sibling" field to store the HTML
      name: 'richText_html',
      type: 'text',
      admin: {
        hidden: true, // Keep the author interface clean
      },
      hooks: {
        // 3. Intercept the data right before it hits the database
        beforeChange: [
          ({ siblingData }) => {
            // Check if the author wrote anything in the richText editor
            if (siblingData?.richText) {
              // Convert the JSON to raw HTML and save it into this field
              return convertLexicalToHTML({ 
                data: siblingData.richText 
              });
            }
            return null;
          }
        ]
      }
    }
  ],
}