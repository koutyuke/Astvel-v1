import { useSetRecoilState } from "recoil";
import { TeamsAtom } from "stores/atom/dnd";
import { v4 as uuidv4 } from "uuid";
import { FormValue } from "../components/elements/form/teamSetting";

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

export { useCreateTeam };
