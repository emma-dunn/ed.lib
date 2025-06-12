import { glob } from "astro/loaders";
import sizeOf from "image-size";
import path from "path";
import {
  defineCollection,
  getCollection,
  z,
  type CollectionEntry,
} from "astro:content";
import { readFileSync } from "fs";
import { parseLocalDate, type PrettyDeep } from "./utils";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdoc}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    date: z.string().transform(parseLocalDate),
    updatedDate: z.string().transform(parseLocalDate).optional(),
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
    description: z.string().optional(),
    dateCreated: z.string().transform(parseLocalDate).optional(),
    dateArchived: z.string().transform(parseLocalDate),
    src: z.string(),
    alt: z.string(),
    isHidden: z.boolean().optional(),
  }),
});

export type GalleryPostProps = PrettyDeep<
  CollectionEntry<"gallery"> & {
    data: {
      width: number;
      height: number;
    };
  }
>;
export async function getGallery(): Promise<GalleryPostProps[]> {
  const x = (await getCollection("gallery"))
    .filter((item) => !item.data.isHidden)
    .sort(
      (a, b) => b.data.dateArchived.valueOf() - a.data.dateArchived.valueOf()
    )
    .map((item) => {
      const imgPath = path.join("public", item.data.src);
      const raw = readFileSync(imgPath);
      const { width, height } = sizeOf(Buffer.from(raw));

      return {
        ...item,
        data: {
          ...item.data,
          width,
          height,
        },
      };
    });

  return x;
}

export const collections = { blog, gallery };
