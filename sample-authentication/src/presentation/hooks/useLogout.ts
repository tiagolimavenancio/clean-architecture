import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentAccountState } from "@/presentation/components";

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const navitate = useNavigate();
  const { setCurrentAccount } = useRecoilValue(currentAccountState);

  return (): void => {
    setCurrentAccount(undefined);
    navitate("/login", { replace: true });
  };
};
