export const ContentBlock = {
  slug: 'content', // This is the blockType you will look for in Eleventy
  labels: {
    singular: 'Standard Content',
    plural: 'Content Blocks',
  },
  fields: [
    {
      name: 'richText',
      type: 'richText', // This tells Payload to load the full Lexical editor
      required: true,
      label: 'Article Text',
      admin: {
        description: 'Use this for headings, paragraphs, lists, and images.',
      }
    },
  ],
}