import { ErrorBoundary } from 'react-error-boundary';

import { useScreenData } from 'src/core/hooks/routes';
import { ShowError } from 'src/components/app/ShowError';

import { GameScreen } from './GameScreen';

function GameScreenWrapper() {
  const screenData = useScreenData();
  const {
    // prettier-ignore
    gameId,
    scenarioId,
    screenNo,
  } = screenData;
  return (
    <ErrorBoundary fallbackRender={ShowError}>
      <GameScreen
        // prettier-ignore
        key={['GameScreenPage', gameId, scenarioId, screenNo].join('-')}
        {...screenData}
      />
    </ErrorBoundary>
  );
}

export function GameScreenPage() {
  return (
    <ErrorBoundary fallbackRender={ShowError}>
      <GameScreenWrapper />
    </ErrorBoundary>
  );
}
