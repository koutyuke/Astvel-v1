import { useSetRecoilState } from "recoil";
import { TeamsAtom } from "utils/recoil/dnd";
import { v4 as uuidv4 } from "uuid";
import { FormValue } from "../components/elements/form/teamInfo";

const useCreateTeam = () => {
  const setTeam = useSetRecoilState(TeamsAtom);

  return ({ name, emoji }: FormValue) => {
    const id = uuidv4();
    setTeam(current => [
      ...current,
      {
        name,
        iconEmoji: emoji,
        id,
      },
    ]);
  };
};

export default useCreateTeam;
