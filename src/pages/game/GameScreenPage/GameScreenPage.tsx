import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';
import { useScreenParams } from 'src/core/hooks/routes';

import styles from './GameScreenPage.module.scss';

export function GameScreenPage() {
  // Eg page url: /game/first/irina/1
  const navigate = useNavigate();
  const { gameId, scenarioId, screenId } = useScreenParams();
  return (
    <ScreenWrapper
      className={classNames(
        styles.root,
        // videoComplete && styles.videoComplete,
        // videoEffectComplete && styles.videoEffectComplete,
        // scenario && styles.finished,
        // isActive && !isFinished && styles.active,
      )}
    >
      <h1>Screen page</h1>
      <p>
        Game: <u>{gameId}</u>
      </p>
      <p>
        Scenario: <u>{scenarioId}</u>
      </p>
      <p>
        Screen: <u>{screenId}</u>
      </p>
    </ScreenWrapper>
  );
}
