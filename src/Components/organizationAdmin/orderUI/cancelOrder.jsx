import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import closeicon from "../../../Assets/CartCross.png"
const CancelOrderDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          width: 400,
          textAlign: 'center',
        },
      }}
    >
      <DialogTitle
        sx={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center' }}
      >
        Are you sure want to cancel this order?
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ my: 2 }}>
          <img
            src={closeicon} // replace with your image path or URL
            alt="Cancel Cart"
            style={{ width: 80, height: 80 }}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'center',
          pb: 2,
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: 'grey.100',
            color: 'black',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            mr: 2,
            '&:hover': {
              bgcolor: 'grey.200',
            },
          }}
        >
          No, Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: '#1549F7',
            color: '#fff',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            '&:hover': {
              bgcolor: '#003EE6',
            },
          }}
        >
          Yes I’m sure
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelOrderDialog;
