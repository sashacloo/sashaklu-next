import { colorInput } from "@sanity/color-input"
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'sashaklu',

  projectId: 't8936xyj',
  dataset: 'production',

  plugins: [
    colorInput(),
    structureTool(),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
