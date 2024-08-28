import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/presentation/components";
import { SurveyResultAnswer } from "@/presentation/pages/survey-result/components";
import { LoadSurveyResult } from "@/domain/usecases";
import Styles from "./Result.scss";

type Props = {
  surveyResult: LoadSurveyResult.Model;
};

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <ul data-testid="answers" className={Styles.answersList}>
        {surveyResult.answers.map((answer) => (
          <SurveyResultAnswer key={answer.answer} answer={answer} />
        ))}
      </ul>
      <button className={Styles.button} data-testid="back-button" onClick={onGoBack}>
        Voltar
      </button>
    </>
  );
};

export default Result;
