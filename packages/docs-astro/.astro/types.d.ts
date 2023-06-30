declare module 'astro:content' {
  interface Render {
    '.mdx': Promise<{
      Content: import('astro').MarkdownInstance<{}>['Content'];
      headings: import('astro').MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  }
}

declare module 'astro:content' {
  interface Render {
    '.md': Promise<{
      Content: import('astro').MarkdownInstance<{}>['Content'];
      headings: import('astro').MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  }
}

declare module 'astro:content' {
  export { z } from 'astro/zod';
  export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

  // TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
  /**
   * @deprecated
   * `astro:content` no longer provide `image()`.
   *
   * Please use it through `schema`, like such:
   * ```ts
   * import { defineCollection, z } from "astro:content";
   *
   * defineCollection({
   *   schema: ({ image }) =>
   *     z.object({
   *       image: image(),
   *     }),
   * });
   * ```
   */
  export const image: never;

  // This needs to be in sync with ImageMetadata
  export type ImageFunction = () => import('astro/zod').ZodObject<{
    src: import('astro/zod').ZodString;
    width: import('astro/zod').ZodNumber;
    height: import('astro/zod').ZodNumber;
    format: import('astro/zod').ZodUnion<
      [
        import('astro/zod').ZodLiteral<'png'>,
        import('astro/zod').ZodLiteral<'jpg'>,
        import('astro/zod').ZodLiteral<'jpeg'>,
        import('astro/zod').ZodLiteral<'tiff'>,
        import('astro/zod').ZodLiteral<'webp'>,
        import('astro/zod').ZodLiteral<'gif'>,
        import('astro/zod').ZodLiteral<'svg'>
      ]
    >;
  }>;

  type BaseSchemaWithoutEffects =
    | import('astro/zod').AnyZodObject
    | import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
    | import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
    | import('astro/zod').ZodIntersection<
        import('astro/zod').AnyZodObject,
        import('astro/zod').AnyZodObject
      >;

  type BaseSchema =
    | BaseSchemaWithoutEffects
    | import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

  export type SchemaContext = { image: ImageFunction };

  type DataCollectionConfig<S extends BaseSchema> = {
    type: 'data';
    schema?: S | ((context: SchemaContext) => S);
  };

  type ContentCollectionConfig<S extends BaseSchema> = {
    type?: 'content';
    schema?: S | ((context: SchemaContext) => S);
  };

  type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

  export function defineCollection<S extends BaseSchema>(
    input: CollectionConfig<S>
  ): CollectionConfig<S>;

  type AllValuesOf<T> = T extends any ? T[keyof T] : never;
  type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
    ContentEntryMap[C]
  >['slug'];

  export function getEntryBySlug<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {})
  >(
    collection: C,
    // Note that this has to accept a regular string too, for SSR
    entrySlug: E
  ): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;

  export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
    collection: C,
    entryId: E
  ): Promise<CollectionEntry<C>>;

  export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => entry is E
  ): Promise<E[]>;
  export function getCollection<C extends keyof AnyEntryMap>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => unknown
  ): Promise<CollectionEntry<C>[]>;

  export function getEntry<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {})
  >(entry: {
    collection: C;
    slug: E;
  }): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C] | (string & {})
  >(entry: {
    collection: C;
    id: E;
  }): E extends keyof DataEntryMap[C]
    ? Promise<DataEntryMap[C][E]>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {})
  >(
    collection: C,
    slug: E
  ): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C] | (string & {})
  >(
    collection: C,
    id: E
  ): E extends keyof DataEntryMap[C]
    ? Promise<DataEntryMap[C][E]>
    : Promise<CollectionEntry<C> | undefined>;

  /** Resolve an array of entry references from the same collection */
  export function getEntries<C extends keyof ContentEntryMap>(
    entries: {
      collection: C;
      slug: ValidContentEntrySlug<C>;
    }[]
  ): Promise<CollectionEntry<C>[]>;
  export function getEntries<C extends keyof DataEntryMap>(
    entries: {
      collection: C;
      id: keyof DataEntryMap[C];
    }[]
  ): Promise<CollectionEntry<C>[]>;

  export function reference<C extends keyof AnyEntryMap>(
    collection: C
  ): import('astro/zod').ZodEffects<
    import('astro/zod').ZodString,
    C extends keyof ContentEntryMap
      ? {
          collection: C;
          slug: ValidContentEntrySlug<C>;
        }
      : {
          collection: C;
          id: keyof DataEntryMap[C];
        }
  >;
  // Allow generic `string` to avoid excessive type errors in the config
  // if `dev` is not running to update as you edit.
  // Invalid collection names will be caught at build time.
  export function reference<C extends string>(
    collection: C
  ): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

  type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
  type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
    ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
  >;

  type ContentEntryMap = {
    blog: {
      'first-post.md': {
        id: 'first-post.md';
        slug: 'first-post';
        body: string;
        collection: 'blog';
        data: InferEntrySchema<'blog'>;
      } & { render(): Render['.md'] };
      'markdown-style-guide.md': {
        id: 'markdown-style-guide.md';
        slug: 'markdown-style-guide';
        body: string;
        collection: 'blog';
        data: InferEntrySchema<'blog'>;
      } & { render(): Render['.md'] };
      'second-post.md': {
        id: 'second-post.md';
        slug: 'second-post';
        body: string;
        collection: 'blog';
        data: InferEntrySchema<'blog'>;
      } & { render(): Render['.md'] };
      'third-post.md': {
        id: 'third-post.md';
        slug: 'third-post';
        body: string;
        collection: 'blog';
        data: InferEntrySchema<'blog'>;
      } & { render(): Render['.md'] };
    };
    components: {
      'alert.mdx': {
        id: 'alert.mdx';
        slug: 'alert';
        body: string;
        collection: 'components';
        data: InferEntrySchema<'components'>;
      } & { render(): Render['.mdx'] };
      'dropdown.mdx': {
        id: 'dropdown.mdx';
        slug: 'dropdown';
        body: string;
        collection: 'components';
        data: InferEntrySchema<'components'>;
      } & { render(): Render['.mdx'] };
    };
    foundation: {
      'spacing.mdx': {
        id: 'spacing.mdx';
        slug: 'spacing';
        body: string;
        collection: 'foundation';
        data: InferEntrySchema<'foundation'>;
      } & { render(): Render['.mdx'] };
    };
    'getting-started': {
      'child-design-systems.mdx': {
        id: 'child-design-systems.mdx';
        slug: 'child-design-systems';
        body: string;
        collection: 'getting-started';
        data: InferEntrySchema<'getting-started'>;
      } & { render(): Render['.mdx'] };
      'for-developers.mdx': {
        id: 'for-developers.mdx';
        slug: 'for-developers';
        body: string;
        collection: 'getting-started';
        data: InferEntrySchema<'getting-started'>;
      } & { render(): Render['.mdx'] };
    };
    guidelines: {
      'accessibility.mdx': {
        id: 'accessibility.mdx';
        slug: 'accessibility';
        body: string;
        collection: 'guidelines';
        data: InferEntrySchema<'guidelines'>;
      } & { render(): Render['.mdx'] };
    };
  };

  type DataEntryMap = {};

  type AnyEntryMap = ContentEntryMap & DataEntryMap;

  type ContentConfig = typeof import('../src/content/config');
}
