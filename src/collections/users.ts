import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf } from '../access/isAdminOrSelf';
import { isAnonymous } from '@/access/anonymous';
import { resend } from "../helpers/config";
import MagicLinkEmail from "../emails/magic-link-email";

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    forgotPassword: {
      generateEmailSubject: () => 'Reset your password',
      generateEmailHTML: async ({ req, token, user }: any) => {

        // Added the direct send as forgotPassword REST on vercel seems to have issue sending email
        await resend.emails.send({
          from: "info@smover.noenough.com",
          to: "peterjunsworth@gmail.com",
          subject: "Your Magic Sign-in Link",
          react: MagicLinkEmail({magicLink: token}),
        });
        
        // Once resolved, ideally use this instead of above
        const resetPasswordURL = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`
        return `
          <!doctype html>
          <html>
            <body>
              <h1>Here is my custom email template!</h1>
              <p>Hello, ${user.email}!</p>
              <p>Click below to reset your password.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `
      },
    },
  },
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