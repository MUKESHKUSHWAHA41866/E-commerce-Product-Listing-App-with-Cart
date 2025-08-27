import { z } from "zod";

export const productCreateSchema = z.object({
  title: z.string().min(2),
  price: z.coerce.number().min(0),
  description: z.string().min(5),
  categoryId: z.string().min(1),
  imageUrl: z.string().url(),
});
export const productUpdateSchema = productCreateSchema.partial();

export const categoryCreateSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
});

export const cartAddSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).default(1),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
