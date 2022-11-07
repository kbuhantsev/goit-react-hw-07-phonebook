import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from 'components/ToggleColorMode';
import { Container } from '@mui/system';
import PhoneBook from './PhoneBook';

export default function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Container>
      <IconButton
        sx={{ ml: 1, color: 'text.primary' }}
        onClick={colorMode.toggleColorMode}
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      <PhoneBook />
    </Container>
  );
}
