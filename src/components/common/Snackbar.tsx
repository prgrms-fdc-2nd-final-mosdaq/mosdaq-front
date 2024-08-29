import React, { useState } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

interface SnackbarOptions {
  message: string;
  autoHideDuration?: number;
}

export const MySnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    autoHideDuration: 6000, // Default duration
  });

  const openSnackbar = (options: SnackbarOptions) => {
    setSnackbar({
      open: true,
      message: options.message,
      autoHideDuration: options.autoHideDuration || 6000,
    });
  };

  const closeSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const SnackbarComponent = (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.autoHideDuration}
      onClose={closeSnackbar}
      message={snackbar.message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    />
  );

  return { openSnackbar, closeSnackbar, SnackbarComponent };
};
