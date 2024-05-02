import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";
import { isLoggedIn } from "../access/isLoggedIn";

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    // Anyone logged in can create
    create: isLoggedIn,
    // Only admins or editors with site access can update
    update: isAdminOrSelf,
    // Only admins or editors with site access can read
    read: isAdminOrSelf,
    // Only admins or editors with site access can delete
    delete: isAdminOrSelf,
  },
  fields: [
    {
      name: 'alt',
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
  ]
}