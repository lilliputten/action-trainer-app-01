import { TScreenParamsResult, useScreenParams } from 'src/core/hooks/routes';

import { gamesHash } from 'src/core/constants/game/games';

export function useScreenData() {
  const { gameId, scenarioId, screenId } = useScreenParams() as TScreenParamsResult;
  const gameData = gamesHash[gameId];
  const scenarioData = gameData.scenarios.find(({ id }) => id === scenarioId);
  if (!scenarioData) {
    const error = new Error(`Not found a scenario for id ${scenarioId}`);
    console.log('[GameScreenPage:useScreenData]', error.message, {
      gameData,
      screenId,
      scenarioId,
      gameId,
      error,
    });
    throw error;
  }
  const screenData = scenarioData.screens[screenId];
  if (!screenData) {
    const error = new Error(`Not found a screen for no ${screenId}`);
    console.log('[GameScreenPage:useScreenData]', error.message, {
      scenarioData,
      gameData,
      screenId,
      scenarioId,
      gameId,
      error,
    });
    throw error;
  }
  return {
    gameId,
    scenarioId,
    screenId,
    gameData,
    scenarioData,
    screenData,
  };
}
