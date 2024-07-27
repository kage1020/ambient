import { z } from 'zod';

export const MediaManagementYouTubeSchema = z.object({
  url: z
    .string()
    .url()
    .regex(/^(https:\/\/|)www\.youtube\.com/),
  category: z.string(),
  title: z.string(),
  artist: z.string().optional(),
  description: z.string().optional(),
  volume: z.number(),
  start: z.number().optional(),
  end: z.number().optional(),
  fadeIn: z.number().optional(),
  fadeOut: z.number().optional(),
});

export type MediaManagementYouTube = z.infer<typeof MediaManagementYouTubeSchema>;

export const MediaManagementLocalSchema = z.object({
  file: z.string(),
  category: z.string(),
  title: z.string(),
  artist: z.string().optional(),
  description: z.string().optional(),
  volume: z.number(),
  start: z.number().optional(),
  end: z.number().optional(),
  fadeIn: z.number().optional(),
  fadeOut: z.number().optional(),
});

export type MediaManagementLocal = z.infer<typeof MediaManagementLocalSchema>;

export const SymbolicLinkSchema = z.object({
  path: z.string(),
  symbolicLinkName: z.string(),
});

export type SymbolicLink = z.infer<typeof SymbolicLinkSchema>;
