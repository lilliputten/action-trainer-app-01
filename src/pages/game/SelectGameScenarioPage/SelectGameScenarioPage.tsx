import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Box, ButtonBase, SxProps } from '@mui/material';
import classNames from 'classnames';

import {
  EScenarioType,
  TGameRouterParams,
  defaultGameType,
  gameNames,
  scenarioNames,
} from 'src/core/types';

import { vw } from 'src/core/helpers/styles';
import { animationTime, effectTime } from 'src/core/assets/scss';
import { getGameRoute } from 'src/core/helpers/routes';
import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';
import { gamesHash } from 'src/core/constants/game/games';

import styles from './SelectGameScenarioPage.module.scss';

const videoUrl = '/videos/1c-0-start.mp4';

const defaultButtonSx: SxProps = {
  left: vw(4),
  top: vw(10),
  width: vw(45.5),
  height: vw(46),
};

export const SelectGameScenarioPage: React.FC = observer(() => {
  const { game: gameId = defaultGameType } = useParams<TGameRouterParams>();
  const navigate = useNavigate();
  // TODO: Check `started` state if not in dev mode?
  const refVideo = React.useRef<HTMLVideoElement>(null);
  const [isActive, setActive] = React.useState(false);
  const startPlay = React.useCallback(() => {
    const video = refVideo.current;
    if (video) {
      refVideo.current?.play();
      const rect = video.getBoundingClientRect();
      const { width, height } = rect;
      console.log('[SelectGameScenarioPage:startPlay]', {
        width,
        height,
        rect,
      });
      debugger;
    }
  }, [refVideo]);
  React.useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, animationTime);
    const video = refVideo.current;
    if (video && startPlay) {
      video.addEventListener('canplay', () => {
        setTimeout(startPlay, effectTime);
      });
      return () => {
        video?.removeEventListener('canplay', startPlay);
      };
    }
  }, [refVideo, startPlay]);
  const [videoComplete, setVideoComplete] = React.useState(false);
  const [videoEffectComplete, setVideoEffectComplete] = React.useState(false);
  const [scenario, setScenario] = React.useState<EScenarioType | undefined>();
  const handleVideoEnd = React.useCallback(() => {
    setVideoComplete(true);
    setTimeout(() => {
      setVideoEffectComplete(true);
    }, effectTime);
  }, []);
  const handleScenarioSelect = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const scenario = event.currentTarget.id as EScenarioType;
      setScenario(scenario);
      const nextScreenRoute = getGameRoute(gameId, scenario, 1, true);
      setTimeout(() => {
        navigate(nextScreenRoute);
      }, effectTime);
    },
    [navigate, gameId],
  );
  const isFinished = !!scenario;
  // Create scenario buttons...
  const buttons = React.useMemo(() => {
    const gameData = gamesHash[gameId];
    return gameData.scenarios.map((game) => {
      const { id, selectButtonSx, name } = game;
      return (
        <ButtonBase
          key={'scenario-button-' + id}
          id={id}
          className={classNames(styles.button, scenario === id && styles.selected)}
          onClick={handleScenarioSelect}
          sx={selectButtonSx}
          title={name || scenarioNames[id]}
        ></ButtonBase>
      );
    });
  }, [gameId, handleScenarioSelect, scenario]);
  return (
    <ScreenWrapper
      className={classNames(
        styles.root,
        videoComplete && styles.videoComplete,
        videoEffectComplete && styles.videoEffectComplete,
        scenario && styles.finished,
        isActive && !isFinished && styles.active,
      )}
    >
      <video
        src={videoUrl}
        className={styles.video}
        preload="auto"
        onEnded={handleVideoEnd}
        ref={refVideo}
        // controls
        // autoPlay
        muted
      ></video>
      <Box className={classNames(styles.over)}>
        {/* Scenario buttons */}
        {buttons}
      </Box>
      <Box className={classNames(styles.curtain)}></Box>
    </ScreenWrapper>
  );
});
