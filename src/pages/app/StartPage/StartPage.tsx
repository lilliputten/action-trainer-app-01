import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Box, ButtonBase } from '@mui/material';
import classNames from 'classnames';

import { useAppSessionStore } from 'src/store/AppSessionStore';
import { effectTime } from 'src/core/assets/scss';
import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';

import styles from './StartPage.module.scss';

export const StartPage: React.FC = observer(() => {
  const { game } = useParams();
  console.log('[StartPage]', game);
  const appSessionStore = useAppSessionStore();
  const [isStarted, setStarted] = React.useState(false);
  const navigate = useNavigate();
  const handleStart = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    setStarted(true);
    appSessionStore.setStarted(true);
    setTimeout(() => {
      navigate('/select-scenario');
    }, effectTime);
  }, [appSessionStore, navigate]);
  return (
    <ScreenWrapper className={classNames(styles.root, isStarted && styles.started)}>
      <ButtonBase className={classNames(styles.button)} onClick={handleStart}>
        Начать
      </ButtonBase>
      <Box className={classNames(styles.curtain)}></Box>
    </ScreenWrapper>
  );
});
