import { TScreenParamsResult, useScreenParams } from 'src/core/hooks/routes';

import { gamesHash } from 'src/core/constants/game/games';
import { EGameType, EScenarioType, TGame, TScenario, TScreen } from 'src/core/types';

export interface TScreenData {
  gameId: EGameType;
  scenarioId: EScenarioType;
  screenNo: number;
  gameData: TGame;
  scenarioData: TScenario;
  screenData: TScreen;
}

export function useScreenData() {
  const { gameId, scenarioId, screenNo } = useScreenParams() as TScreenParamsResult;
  if (!gameId) {
    throw new Error(`Не указана игра!`);
  }
  const gameData = gamesHash[gameId];
  if (!gameData) {
    throw new Error(`Игры '${gameId}' не существует.`);
  }
  const { scenarios } = gameData;
  if (!scenarios) {
    throw new Error(`Не определны сценарии для игры ${gameId}.`);
  }
  const scenarioData = scenarios.find(({ id }) => id === scenarioId);
  if (!scenarioData) {
    const error = new Error(`Не найден сценарий '${scenarioId}' для игры '${gameId}'.`);
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
