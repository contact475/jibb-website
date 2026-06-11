import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = 'https://npo-jibb.org'
  return [
    {
      url: `${domain}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${domain}/jisc`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${domain}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${domain}/events/india-japan-manufacturing-collaboration-2026`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${domain}/events/semicon-india-2026`,
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${domain}/events/bharat-mobility-2026`,
      lastModified: new Date('2026-05-11'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
