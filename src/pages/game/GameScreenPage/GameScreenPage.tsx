import { useScreenData } from 'src/core/hooks/routes';

import { GameScreen } from './GameScreen/GameScreen';

export function GameScreenPage() {
  // Get game data...
  const screenData = useScreenData();
  const {
    // prettier-ignore
    gameId,
    scenarioId,
    screenNo,
  } = screenData;
  return (
    <GameScreen
      // prettier-ignore
      key={['GameScreenPage', gameId, scenarioId, screenNo].join('-')}
      {...screenData}
    />
  );
}
