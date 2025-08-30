import { z } from "zod";

export const AzelysseClientSchema = z.object({
  client: z.object({
    first_name: z.string(),
    email: z.email(),
  }),
});

export const AzelysseServiceSchema = z.object({
  name: z.string(),
  duration: z.number(),
});

export const AzelysseProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  aget_restriction: z.number().optional(),
});

export const AzelyssePrestationSchema = z.object({
  service: AzelysseServiceSchema,
  product: AzelysseProductSchema.optional().nullable(),
});

export const AzelysseMeetingSchema = z.object({
  meeting: z.object({
    id: z.string(),
    start_time: z.union([z.string(), z.date()]),
    end_time: z.union([z.string(), z.date()]).optional(),
    client: AzelysseClientSchema,
    prestations: z.array(AzelyssePrestationSchema),
  }),
});

export const AzelysseContactSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
  message: z.string().min(1, "Message cannot be empty"),
});
