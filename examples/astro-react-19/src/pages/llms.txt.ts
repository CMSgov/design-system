import type { APIRoute } from 'astro';
/**
 * Settomg `prerender = true` allows us to run this handler at build time
 * and emit a static file to `dist/llms.txt` which is then served in production.
 * Note: `astro dev` executes this handler (below) on request; `astro preview` serves the last build output.
 */
export const prerender = true;

async function fakeFetchDocs() {
  await new Promise((r) => setTimeout(r, 150));

  return [
    { slug: '/components/accordion', title: 'Accordion' },
    { slug: '/foundation/typography/headings', title: 'Headings' },
    { slug: '/foundation/typography/overview', title: 'Typography overview' },
  ];
}

export const GET: APIRoute = async () => {
  // Simulate fetching content asynchronously (e.g. Astro's `getCollection` API)
  const docs = await fakeFetchDocs();

  /**
   * In the final implementation, we would reuse the same Markdown-generation logic
   * from our Gatsby post-build script, with minor adjustments for Astro’s
   * content metadata structure.
   */

  // For now, let's simply render a list in Markdown from the dummy data.
  const baseUrl = 'https://design.cms.gov';
  const content =
    `# The CMS Design System\n\n` +
    `> Experimental llms.txt generated during the Astro build.\n\n` +
    `## Docs\n\n` +
    docs.map((d) => `- [${d.title}](${baseUrl}${d.slug})`).join('\n') +
    `\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
};
