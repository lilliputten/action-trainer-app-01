import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { TGameRouterParams } from 'src/core/types';

export function useScreenParams() {
  // Eg page url: /game/first/irina/1
  const navigate = useNavigate();
  const { game: gameId, scenario: scenarioId, screen } = useParams<TGameRouterParams>();
  const screenId = Number(screen);
  React.useEffect(() => {
    if (!gameId) {
      navigate('/');
    }
    if (!scenarioId) {
      navigate(`/game/${gameId}`);
    }
    if (!screenId || !screenId) {
      navigate(`/game/${gameId}`);
    }
  }, [gameId, scenarioId, screenId, navigate]);
  return { gameId, scenarioId, screenId };
}
