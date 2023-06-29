import { CollectionEntry, defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
  }),
});

const basicPageConfig = {
  schema: z.object({
    title: z.string(),
  }),
};

export const basicCollections = {
  foundation: defineCollection(basicPageConfig),
  guidelines: defineCollection(basicPageConfig),
  'getting-started': defineCollection(basicPageConfig),
} as const;

export type BasicCollection = keyof typeof basicCollections;
export type BasicEntry<T = BasicCollection> = T extends BasicCollection
  ? CollectionEntry<T>
  : never;

export const collections = {
  blog,
  ...basicCollections,
};
