import React from "react";
import { Spinner } from "@/presentation/components";
import Styles from "./Form.scss";

type Props = {
  state: unknown;
};

const FormStatus: React.FC<Props> = ({ state }: Props) => {
  const { isLoading, mainError } = state;

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}

      {mainError && (
        <span data-testid="main-error" className={Styles.error}>
          {mainError}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
