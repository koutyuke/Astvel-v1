import { z } from "zod";

const sessionSchema = z.object({
  user: z.object({
    id: z.string(),
    provider_id: z.string(),
    username: z.string(),
    global_name: z.string(),
    avatar: z.string().nullable(),
    discriminator: z.string(),
    banner_color: z.string().nullable(),
    access_token: z.string(),
    refresh_token: z.string(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export { sessionSchema };
