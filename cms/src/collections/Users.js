export const Users = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Only admins can create or delete users
    create: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
    // Users can read/update themselves, but only admins can read/update others
    read: ({ req: { user }, id }) => {
      if (user?.role === 'admin') return true;
      if (user) return { id: { equals: user.id } }; // Can only read themselves
      return false;
    },
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true;
      if (user) return { id: { equals: user.id } };
      return false;
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Field-level access: Only admins can change a user's role
        update: ({ req: { user } }) => user?.role === 'admin',
      }
    },
    {
      name: 'gearAccess',
      type: 'relationship',
      relationTo: 'gear',
      hasMany: true,
      label: 'Gear Access (Editors Only)',
      admin: {
        description: 'Which gear can this user manage articles for?',
      },
      access: {
        // Field-level access: Only admins can assign gear access
        update: ({ req: { user } }) => user?.role === 'admin',
      }
    }
  ],
}