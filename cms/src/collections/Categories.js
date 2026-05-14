const editorGearConstraint = ({ req: { user } }) => {
  // 1. If there's no user, it's an unauthenticated API request (e.g., your Eleventy build). 
  // Let it read the data. (Return false for create/update/delete).
  if (!user) return true; 

  // 2. Admins get God Mode.
  if (user.role === 'admin') return true;

  // 3. For Editors, we extract their assigned Gear IDs.
  // Payload sometimes populates relationship data, so we map it to ensure we just have an array of string IDs.
  const gearIds = (user.gearAccess || []).map(g => typeof g === 'object' ? g.id : g);

  // If they have no gear assigned, they have access to nothing.
  if (gearIds.length === 0) return false;

  // 4. Return the Payload Query Constraint.
  return {
    // Note: Use 'parentGear' for the Categories collection
    relatedGear: { 
      in: gearIds
    }
  };
}

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
      },
      filterOptions: ({ req: { user } }) => {
        // Admins see all gear in the dropdown
        if (user?.role === 'admin') return true;
        
        // Editors only see their assigned gear in the dropdown
        const gearIds = (user?.gearAccess || []).map(g => typeof g === 'object' ? g.id : g);
        return {
          id: {
            in: gearIds
          }
        };
      }
    },
  ],
}