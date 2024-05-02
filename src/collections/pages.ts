import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrSelf } from '../access/isAdminOrSelf';
import { isLoggedIn } from '../access/isLoggedIn';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  access: {
    // Anyone logged in can create
    create: isLoggedIn,
    // Only admins or editors with site access can update
    update: isAdminOrSelf,
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read:   isLoggedIn,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites',
      required: true,
      // If user is not admin, set the site by default
      // to the first site that they have access to
      defaultValue: ({user} : {user:any}) => {
        if (!user.roles.includes('admin') && user.sites?.[0]) {
          return user.sites[0];
        }
      }
    }
  ],
}