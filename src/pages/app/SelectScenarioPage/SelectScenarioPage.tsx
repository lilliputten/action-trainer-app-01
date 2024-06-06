import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Box, ButtonBase } from '@mui/material';
import classNames from 'classnames';

import { EScenarioType } from 'src/core/types';
import Video from 'src/assets/videos/1c-0-start.mp4';

import { useAppSessionStore } from 'src/store/AppSessionStore';
import { vw } from 'src/core/helpers/styles';
import { animationTime, effectTime } from 'src/core/assets/scss';
import { getScreenRoute } from 'src/core/helpers/routes';
import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';

import styles from './SelectScenarioPage.module.scss';

const defaultButtonSx = {
  left: vw(4),
  top: vw(10),
  width: vw(45.5),
  height: vw(46),
};

export const SelectScenarioPage: React.FC = observer(() => {
  const { game } = useParams();
  console.log('[SelectScenarioPage]', game);
  const navigate = useNavigate();
  // TODO: Check `started` state if not in dev mode?
  const appSessionStore = useAppSessionStore();
  const refVideo = React.useRef<HTMLVideoElement>(null);
  const [isActive, setActive] = React.useState(false);
  const startPlay = React.useCallback(() => {
    refVideo.current?.play();
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
      appSessionStore.setScenario(scenario);
      appSessionStore.setScreen(1); // From the 1st screen
      const nextScreenRoute = getScreenRoute(scenario, 1, true);
      console.log('[SelectScenarioPage:handleScenarioSelect]', nextScreenRoute);
      setTimeout(() => {
        navigate(nextScreenRoute);
      }, effectTime);
    },
    [appSessionStore, navigate],
  );
  const isFinished = !!scenario;
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
        src={Video}
        className={styles.video}
        preload="auto"
        onEnded={handleVideoEnd}
        ref={refVideo}
        // controls
        // autoPlay
        muted
      ></video>
      <Box className={classNames(styles.over)}>
        <ButtonBase
          id={EScenarioType.N}
          className={classNames(styles.button, scenario === EScenarioType.N && styles.selected)}
          onClick={handleScenarioSelect}
          sx={{
            ...defaultButtonSx,
          }}
        ></ButtonBase>
        <ButtonBase
          id={EScenarioType.I}
          className={classNames(styles.button, scenario === EScenarioType.I && styles.selected)}
          onClick={handleScenarioSelect}
          sx={{
            ...defaultButtonSx,
            left: vw(50.5),
          }}
        ></ButtonBase>
      </Box>
      <Box className={classNames(styles.curtain)}></Box>
      {/*
      <Scrollable>
        <Demo />
      </Scrollable>
      */}
    </ScreenWrapper>
  );
});
