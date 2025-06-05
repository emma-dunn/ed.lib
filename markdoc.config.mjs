import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  tags: {
    image: {
      attributes: {
        caption: {
          type: String,
        },
        ...nodes.image.attributes,
      },
      render: component("./src/components/MarkdocImage.astro"),
    },
  },
});
