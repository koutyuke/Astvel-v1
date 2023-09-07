import { z } from "zod";

const guildPageQuerySchema = z.object({
  id: z.string(),
});

export { guildPageQuerySchema };
