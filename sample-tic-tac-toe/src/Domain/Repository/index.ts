import type { Board } from "../Model";

export type Step = {
  board: Board;
  stepNumber: number;
  numOfAllSteps: number;
};

/**
 * Repository managing the history of TicTacToe steps.
 * Each step consists of a board.
 */
export interface Repository {
  addStep(board: Board): Promise<void>;
  setCurrentStepNumber(stepNumber: number): Promise<void>;
  getCurrentStep(): Promise<Step>;
  deleteStepsAfterCurrentStepNumber(): Promise<void>;
}
