import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf } from '../access/isAdminOrSelf';
import { isAnonymous } from '@/access/anonymous';
import { truncate } from 'fs/promises';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Only admins can create users
    create: isAnonymous,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAnonymous,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelf,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: false,
        },
        {
          name: 'lastName',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'roles',
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ]
    },
    {
      name: 'sites',
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: 'relationship',
      relationTo: 'sites',
      hasMany: true,
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ roles }) => roles && !roles.includes('admin'),
        description: 'This field sets which sites that this user has access to.'
      }
    }
  ],
};