import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Pete&Wolf',
  projectId: '46eerxjm',
  dataset: 'production',
  plugins: [
    structureTool({
      structure
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})