import { useSession } from "next-auth/react";
import sessionSchema from "schema/session";

const useValidatedSession = () => {
  const { data: SESSION } = useSession();
  const session = sessionSchema.safeParse(SESSION);
  return session;
};

export default useValidatedSession;
