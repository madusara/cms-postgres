

// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
// import { ServiceArticles } from './collections/ServiceArticles'
// import { Media } from './collections/Media'
import { Makers } from './collections/Makers'
// import { Logos } from './collections/Logos'
import { Guides } from './collections/Guides'
import { Brps } from './collections/Brps'
import { Products } from './collections/Products'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Media, Brps, Guides, Makers, Users, Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI5,
      // connectionString: `postgres://${process.env.PG_USER}:${encodeURIComponent(process.env.PG_PASSWORD ?? '')}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}?ssl=true`,
    },
  }),
  cors: ['https://app.qurrent.se'],
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
