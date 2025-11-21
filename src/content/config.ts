import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    featured: z.boolean().optional(),
    image: z.string().optional(),
    links: z
      .object({
        repo: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .partial()
      .optional(),
    stack: z.array(z.string()).optional(),
  }),
});

export const collections = { projects };


