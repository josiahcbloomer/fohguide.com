export const Gear = {
  slug: 'gear',
  admin: { useAsTitle: 'name' },
  access: {
    // The public API (Eleventy) needs to read this during build
    read: () => true, 
    // Only admins can add, edit, or delete Gear
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
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