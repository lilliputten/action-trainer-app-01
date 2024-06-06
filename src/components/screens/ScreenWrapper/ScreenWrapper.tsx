import { Box, IconButton } from '@mui/material';
import { Replay } from '@mui/icons-material';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { RouterLinkComponent } from 'src/components/MUI';
// import { Scrollable } from 'src/ui/Basic';

export const ScreenWrapper: React.FC<TPropsWithChildrenAndClassName> = observer((props) => {
  const { children, className } = props;
  return (
    <Box className={classNames(className)}>
      {/* Main content */}
      {children}
      <IconButton
        component={RouterLinkComponent}
        sx={{
          position: 'absolute',
          right: 4,
          bottom: 4,
        }}
        to="/"
        title="Начать сначала"
      >
        <Replay />
      </IconButton>
    </Box>
  );
});
