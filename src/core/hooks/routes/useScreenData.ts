import { TScreenParamsResult, useScreenParams } from 'src/core/hooks/routes';

import { gamesHash } from 'src/core/constants/game/games';

export function useScreenData() {
  const { gameId, scenarioId, screenNo } = useScreenParams() as TScreenParamsResult;
  const gameData = gamesHash[gameId];
  const scenarioData = gameData.scenarios.find(({ id }) => id === scenarioId);
  if (!scenarioData) {
    const error = new Error(`Not found a scenario for id ${scenarioId}`);
    console.log('[GameScreenPage:useScreenData]', error.message, {
      gameData,
      screenNo,
      scenarioId,
      gameId,
      error,
    });
    throw error;
  }
  // NOTE: screen numbers are start from 1
  const screenData = scenarioData.screens[screenNo - 1];
  if (!screenData) {
    const error = new Error(`Not found a screen for no ${screenNo}`);
    console.log('[GameScreenPage:useScreenData]', error.message, {
      scenarioData,
      gameData,
      screenNo,
      scenarioId,
      gameId,
      error,
    });
    throw error;
  }
  return {
    gameId,
    scenarioId,
    screenNo,
    gameData,
    scenarioData,
    screenData,
  };
}
