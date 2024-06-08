import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, IconButton, Stack } from '@mui/material';

import { Fullscreen, FullscreenExit, Replay } from '@mui/icons-material';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import screenfull from 'screenfull';

import { TGameRouterParams, TPropsWithChildrenAndClassName, defaultGameType } from 'src/core/types';
import { RouterLinkComponent } from 'src/components/MUI';
import { useAppSessionStore } from 'src/store';
import { LoaderSplash } from 'src/ui/Basic';

interface TProps extends TPropsWithChildrenAndClassName {
  ref?: React.ForwardedRef<HTMLDivElement>;
}

export const ScreenWrapper = observer<TProps, HTMLDivElement>(
  React.forwardRef((props, ref) => {
    // TODO: Show loader while session hasn't ready?
    const appSessionStore = useAppSessionStore();
    const { game: gameId = defaultGameType } = useParams<TGameRouterParams>();
    const { fullscreen, ready } = appSessionStore;
    const { children, className } = props;
    const location = useLocation();
    const { pathname } = location;
    const isRoot = !pathname || pathname === '/';
    const [isFullscreen, setFullscreen] = React.useState(fullscreen);
    React.useEffect(() => {
      if (isFullscreen !== appSessionStore.fullscreen) {
        appSessionStore.setFullscreen(isFullscreen);
        if (isFullscreen) {
          screenfull.request();
        } else {
          screenfull.exit();
        }
      }
    }, [appSessionStore, isFullscreen]);
    const toggleFullscreen = React.useCallback(() => {
      setFullscreen((isFullscreen) => !isFullscreen);
    }, []);
    return (
      <Box className={classNames(className)} ref={ref}>
        {/* Main content */}
        {children}
        {ready && (
          <Stack
            sx={{
              position: 'absolute',
              right: 4,
              bottom: 4,
            }}
            spacing={1}
            direction="row"
          >
            {!isRoot && (
              <IconButton
                component={RouterLinkComponent}
                to={`/game/${gameId}`}
                title="Начать сначала"
              >
                <Replay />
              </IconButton>
            )}
            <IconButton title="Полноэкранный режим" onClick={toggleFullscreen}>
              {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          </Stack>
        )}
        <LoaderSplash
          // prettier-ignore
          fullSize
          bg="videoBlue"
          themeMode="dark"
          mode="cover"
          show={!ready}
        />
      </Box>
    );
  }),
);
