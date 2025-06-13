import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getBlogs } from "../content.config";

export async function GET(context) {
  const posts = await getBlogs();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}/`,
      pubDate: post.data.date,
    })),
    stylesheet: "/rss/styles.xsl",
  });
}
