import { glob } from "astro/loaders";
import { defineCollection, getCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdoc}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    isHidden: z.boolean().optional(),
  }),
});

export async function getBlogs() {
  return (await getCollection("blog"))
    .filter((blog) => !blog.data.isHidden)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const gallery = defineCollection({
  loader: glob({ base: "./src/content/gallery", pattern: "**/*.{md,mdoc}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dateCreated: z.coerce.date().optional(),
    dateArchived: z.coerce.date(),
    src: z.string(),
    alt: z.string(),
    isHidden: z.boolean().optional(),
  }),
});

export async function getGallery() {
  return (await getCollection("gallery"))
    .filter((item) => !item.data.isHidden)
    .sort(
      (a, b) => b.data.dateArchived.valueOf() - a.data.dateArchived.valueOf()
    );
}

export const collections = { blog, gallery };
