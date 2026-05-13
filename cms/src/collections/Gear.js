export const Gear = {
  slug: 'gear',
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
      label: 'Gear Name',
    },
    {
      name: 'manufacturer',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'stripeProductID',
      type: 'text',
      label: 'Stripe Product ID',
      admin: {
        description: 'The ID from Stripe used to unlock this gear category',
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}