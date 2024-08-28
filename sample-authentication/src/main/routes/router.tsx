import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { PrivateRoute } from "@/main/proxies";
import { makeLogin, makeSignUp, makeSurveyList, makeSurveyResult } from "@/main/factories/pages";
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from "@/main/adapters";
import { currentAccountState } from "@/presentation/components";

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter,
  };
  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Router;
