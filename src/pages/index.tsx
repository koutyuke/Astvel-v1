import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();
  if (data) {
    return (
      <>
        Signed in
        <br />
        <button className="bg-red-200" type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not Sign in
      <br />
      <button className="bg-gray-200" type="button" onClick={() => signIn("discord")}>
        Sign in
      </button>
    </>
  );
};

export default Home;
