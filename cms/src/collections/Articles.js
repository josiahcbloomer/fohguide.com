import { CustomHTMLBlock } from '../blocks/CustomHTMLBlock.js'
import { ContentBlock } from '../blocks/ContentBlock.js'

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

export const Articles = {
  slug: 'articles',
  admin: { useAsTitle: 'title' },
  access: {
    // For Read: Editors only see their gear in the Admin UI list. Eleventy sees all.
    read: editorGearConstraint, 
    // For Update/Delete: Editors can only modify their gear's articles.
    update: editorGearConstraint,
    delete: editorGearConstraint,
    // Create doesn't support query constraints, so we just allow Admins and Editors to hit "Create New"
    // We will restrict what they can actually create using `filterOptions` below.
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'relatedGear',
      type: 'relationship',
      relationTo: 'gear',
      hasMany: true,
      required: true,
      admin: { position: 'sidebar' },
      
      // THIS IS THE MAGIC UI FILTER
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