import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Select,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const states = ['New York', 'California', 'Texas', 'Florida', 'Ohio'];

const NewAddressModal=({ open, onClose })=> {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    pin: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    type: 'HOME',
    default: false,
  });

  const [pinError, setPinError] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (field === 'pin' && e.target.value === '000000') {
      setPinError(true);
    } else if (field === 'pin') {
      setPinError(false);
    }
  };

  const requiredStyle = {
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Box p={3} pt={1} position="relative">
        <DialogTitle sx={{ fontSize: 24, fontWeight: 700 }}>
          <u>New address</u>
        </DialogTitle>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={<><span>Full Name</span><span style={{ color: 'red' }}> *</span></>}
                fullWidth
                value={form.name}
                onChange={handleChange('name')}
                sx={requiredStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={<><span>Mobile Number</span><span style={{ color: 'red' }}> *</span></>}
                fullWidth
                value={form.mobile}
                onChange={handleChange('mobile')}
                helperText="May be used to assist delivery"
                sx={requiredStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                value={form.email}
                onChange={handleChange('email')}
                sx={requiredStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={<><span>Pin code</span><span style={{ color: 'red' }}> *</span></>}
                fullWidth
                value={form.pin}
                onChange={handleChange('pin')}
                error={pinError}
                helperText={pinError ? (
                  <Typography variant="caption" color="error">
                    Delivery is not available for this pin code!
                  </Typography>
                ) : ''}
                sx={requiredStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={<><span>Flat, House No, Building, Company, Apartment</span><span style={{ color: 'red' }}> *</span></>}
                fullWidth
                value={form.flat}
                onChange={handleChange('flat')}
                sx={requiredStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={<><span>Area, Street, Sector, Village</span><span style={{ color: 'red' }}> *</span></>}
                fullWidth
                value={form.area}
                onChange={handleChange('area')}
                sx={requiredStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={<><span>Landmark</span><span style={{ color: 'red' }}> *</span></>}
                fullWidth
                value={form.landmark}
                onChange={handleChange('landmark')}
                sx={requiredStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={<><span>Town / City</span><span style={{ color: 'red' }}> *</span></>}
                fullWidth
                value={form.city}
                onChange={handleChange('city')}
                sx={requiredStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={requiredStyle}>
                <InputLabel>State</InputLabel>
                <Select
                  value={form.state}
                  onChange={handleChange('state')}
                  label="State"
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={requiredStyle}>
                <InputLabel>Address Type</InputLabel>
                <Select
                  value={form.type}
                  onChange={handleChange('type')}
                  label="Address Type"
                >
                  <MenuItem value="HOME">HOME</MenuItem>
                  <MenuItem value="WORK">WORK</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.default}
                    onChange={(e) =>
                      setForm({ ...form, default: e.target.checked })
                    }
                  />
                }
                label="Make this my default address"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ pt: 2 }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              backgroundColor: '#F4F4F4',
              px: 4,
              py: 1,
              borderRadius: 2,
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              px: 4,
              py: 1,
              backgroundColor: '#113DFF',
              color: 'white',
              borderRadius: 2,
            }}
            onClick={() => {
              console.log(form);
              onClose();
            }}
          >
            Use This Address
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default NewAddressModal;