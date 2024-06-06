import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, ButtonBase } from '@mui/material';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { useAppSessionStore } from 'src/store/AppSessionStore';
import { effectTime } from 'src/core/assets/scss';

import styles from './StartPage.module.scss';

export const StartPage: React.FC = observer(() => {
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
    <Box className={classNames(styles.root, isStarted && styles.started)}>
      <ButtonBase className={classNames(styles.button)} onClick={handleStart}>
        Начать
      </ButtonBase>
      <Box className={classNames(styles.curtain)}></Box>
    </Box>
  );
});
