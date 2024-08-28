import React from "react";
import Styles from "./ItemEmpty.scss";

const SurveyItemEmpty: React.FC = () => {
  return (
    <div>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
    </>
  );
};

export default SurveyItemEmpty;
