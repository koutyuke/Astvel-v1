import { useSession } from "next-auth/react";
import sessionSchema from "schema/session";

const useValidatedSession = () => {
  const { data: SESSION, status } = useSession();
  const session = sessionSchema.safeParse(SESSION);
  return { session, status };
};

export default useValidatedSession;
