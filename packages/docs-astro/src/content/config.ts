import { defineCollection, z } from 'astro:content';

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

const gettingStarted = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
  }),
});

const basicPageConfig = {
  schema: z.object({
    title: z.string(),
  }),
};

const foundation = defineCollection(basicPageConfig);
const guidelines = defineCollection(basicPageConfig);

export const collections = {
  blog,
  foundation,
  guidelines,
  'getting-started': gettingStarted,
};
