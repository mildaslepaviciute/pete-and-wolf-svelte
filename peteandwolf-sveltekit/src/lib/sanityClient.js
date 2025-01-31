import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '46eerxjm',
  dataset: 'production',
  apiVersion: '2024-01-30', // using today's date
  useCdn: false,
  ignoreBrowserTokenWarning: true
})