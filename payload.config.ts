import path from 'path'
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from 'payload/i18n/en'
import {
  lexicalEditor
} from '@payloadcms/richtext-lexical'
//import { slateEditor } from '@payloadcms/richtext-slate'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload/config'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/users';
import { Sites } from './src/collections/sites';
import { Media } from './src/collections/media';
import { ContactRequests } from './src/collections/contactRequests';
import { Pages } from './src/collections/pages';
import { Agent } from './src/collections/agent';
import { seed } from './seed';
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  //editor: slateEditor({}),
  editor: lexicalEditor(),
  collections: [
    ContactRequests,
    Media,
    Pages,
    Sites,
    Users,
    Agent,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { en },
  },
  // COMMENTING OUT THIS AS VERCEL HAS ISSUE SENDING VIA REST
  email: resendAdapter({
    defaultFromAddress: 'info@smover.noenough.com',
    defaultFromName: 'Payload CMS',
    apiKey: 're_DRdVHBSc_2tqRYjjpLb5acrAdFoeBpWNw',
  }),
  admin: {
    autoLogin: {
      email: 'dev@payloadcms.com',
      password: 'test',
      prefillOnly: true,
    },
  },
  async onInit(payload) {
    
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
})
