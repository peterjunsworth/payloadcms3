import { Block, CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";
import { isLoggedIn } from "../access/isLoggedIn";

const profileBlock: Block = {
  slug: 'profile',
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
    },
  ],
}

const mlsBlock: Block = {
  slug: 'mls',
  fields: [
    {
      name: 'mls',
      type: 'text'
    },
    {
      name: 'mlsId',
      type: 'text'
    },
  ],
}

const brokerBlock: Block = {
  slug: 'broker',
  fields: [
    {
      name: 'brokerName',
      type: 'text'
    },
    {
      name: 'licenseType',
      type: 'text'
    },
    {
      name: 'licenseNumber',
      type: 'text'
    },
  ],
}

export const Agent: CollectionConfig = {
  slug: 'agent',
  admin: {
    useAsTitle: 'firstName',
  },
  access: {
    // Anyone logged in can create
    create: isAdmin,
    // Only admins or editors with site access can update
    update: isAdminOrSelf,
    // Only admins or editors with site access can read
    read: isLoggedIn,
    // Only admins or editors with site access can delete
    delete: isAdminOrSelf,
  },
  fields: [
    {
      name: 'owner', // required
      type: 'relationship', // required
      relationTo: 'users', // required
      hasMany: false,
    },
    {
      type: 'row',
      fields: profileBlock.fields,
    },
    {
      type: 'row',
      fields: mlsBlock.fields,
    },
    {
      name: 'businessName',
      type: 'text'
    },
    {
      name: 'location',
      type: 'text'
    },
    {
        type: 'row',
        fields: brokerBlock.fields
    },
    {
      name: 'smoverVerified',
      type: 'checkbox',
      label: 'Is Agent Verified',
      defaultValue: false,
    },
    {
      name: 'socialMedia', // required
      type: 'group', // required
      fields: [
        {
            name: 'facebook',
            type: 'text'
        },
        {
            name: 'twitter',
            type: 'text'
        },
        {
            name: 'linkedin',
            type: 'text'
        },
        {
            name: 'instagram',
            type: 'text'
        },
        {
            name: 'youtube',
            type: 'text'
        },
        {
            name: 'homepage',
            type: 'text'
        }
      ]
    },
    {
      name: 'yearsOfExperience',
      type: 'number',
      admin: {
        step: 1,
      },
    },
    {
      name: 'personalDescription',
      type: 'text'
    },
    {
      name: 'communication',
      type: 'text'
    },
    {
      name: 'negotiation',
      type: 'text'
    },
    {
      name: 'marketingPlan',
      type: 'text'
    }
  ]
}