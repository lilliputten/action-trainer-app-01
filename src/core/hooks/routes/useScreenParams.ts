import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { EGameType, EScenarioType, TGameRouterParams } from 'src/core/types';

interface TScreenParamsOptions {
  allowNoGame?: boolean;
  allowNoScreen?: boolean;
  allowNoScenario?: boolean;
}

export interface TScreenParamsResult {
  gameId: EGameType;
  scenarioId: EScenarioType;
  screenId: number;
}

export function useScreenParams(opts: TScreenParamsOptions | undefined = undefined) {
  // TODO: Use options, eg: allowNoScreen, allowNoScenario
  // Eg page url: /game/first/irina/1
  const navigate = useNavigate();
  const { game: gameId, scenario: scenarioId, screen } = useParams<TGameRouterParams>();
  const screenId = Number(screen);
  React.useEffect(() => {
    if (!gameId) {
      if (!opts?.allowNoGame) {
        return navigate('/');
      }
    }
    if (!scenarioId) {
      if (!opts?.allowNoScenario) {
        return navigate(`/game/${gameId}`);
      }
    }
    if (!screenId) {
      if (!opts?.allowNoScreen) {
        return navigate(`/game/${gameId}`);
      }
    }
  }, [gameId, scenarioId, screenId, navigate, opts]);
  return { gameId, scenarioId, screenId };
}
