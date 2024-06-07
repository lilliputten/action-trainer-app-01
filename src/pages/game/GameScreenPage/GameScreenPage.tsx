import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';
import { TScreenParamsResult, useScreenData, useScreenParams } from 'src/core/hooks/routes';

import { px } from 'src/core/helpers/styles';
import { getVideoSizeByRef } from 'src/core/helpers/video';
import { useContainerSize } from 'src/ui/hooks';
import { gamesHash } from 'src/core/constants/game/games';

import styles from './GameScreenPage.module.scss';

export function GameScreenPage() {
  // Eg page url: /game/first/irina/1
  const navigate = useNavigate();
  const {
    ref: refVideo,
    width: videoContainerWidth,
    height: videoContainerHeight,
  } = useContainerSize<HTMLVideoElement>();
  const refBox = React.useRef<HTMLDivElement>(null);
  const updateBoxGeometry = React.useCallback(() => {
    const box = refBox.current;
    if (box) {
      const { width, height } = getVideoSizeByRef(refVideo);
      if (width && height) {
        box.style.width = px(width);
        box.style.height = px(height);
      }
    }
  }, [refVideo, refBox]);
  React.useEffect(updateBoxGeometry, [
    videoContainerWidth,
    videoContainerHeight,
    refVideo,
    updateBoxGeometry,
  ]);
  const {
    // prettier-ignore
    gameId,
    scenarioId,
    screenId,
    // gameData,
    // scenarioData,
    screenData,
  } = useScreenData();
  const {
    // prettier-ignore
    videoUrl,
    finalSplashUrl,
  } = screenData;
  // Get game data...
  // const { startVideoUrl } = gameData;
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
