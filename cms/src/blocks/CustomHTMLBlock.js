export const CustomHTMLBlock = {
  slug: 'customHTML',
  labels: {
    singular: 'Custom HTML / JS Widget',
    plural: 'Custom HTML Widgets',
  },
  fields: [
    {
      name: 'htmlCode',
      type: 'code',
      required: true,
      admin: {
        language: 'html', 
      },
    },
    {
      name: 'clientJS',
      label: 'Vanilla JS Script URL (Optional)',
      type: 'text',
      admin: {
        description: 'URL to a vanilla JS file to load for this specific block',
      }
    }
  ],
}