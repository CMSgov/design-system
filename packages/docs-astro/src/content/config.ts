import { CollectionEntry, defineCollection, z } from 'astro:content';

const basicSchema = {
  title: z.string(),
  intro: z.string().optional(),
};
const basicPageConfig = {
  schema: z.object(basicSchema),
};

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    ...basicSchema,
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

const components = defineCollection({
  schema: z.object({
    ...basicSchema,
    core: z.object({
      githubLink: z.string(),
      sketchLink: z.string(),
      storybookLink: z.string(),
    }),
    healthcare: z
      .object({
        sketchLink: z.string(),
      })
      .optional(),
    medicare: z
      .object({
        sketchLink: z.string(),
      })
      .optional(),
  }),
});

export const basicCollections = {
  foundation: defineCollection(basicPageConfig),
  guidelines: defineCollection(basicPageConfig),
  'getting-started': defineCollection(basicPageConfig),
  components,
} as const;

export type BasicCollection = keyof typeof basicCollections;
export type BasicEntry<T = BasicCollection> = T extends BasicCollection
  ? CollectionEntry<T>
  : never;
export const basicCollectionKeys = Object.keys(basicCollections) as BasicCollection[];

export const collections = {
  blog,
  ...basicCollections,
};
