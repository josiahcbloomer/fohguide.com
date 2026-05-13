export const Categories = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name (e.g., Troubleshooting, Macros, Networking)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'parentGear',
      type: 'relationship',
      relationTo: 'gear',
      required: true,
      label: 'Which Gear does this category belong to?',
      admin: {
        position: 'sidebar',
      }
    },
  ],
}