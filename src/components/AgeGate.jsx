import { useState } from 'react';
import { Button, Dialog, DialogContent, Typography } from '@mui/material';

function AgeGate() {
  const [isVerified, setIsVerified] = useState(
    localStorage.getItem('ageVerified') === 'true'
  );
  const [open, setOpen] = useState(!isVerified);

  const verifyAge = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVerified(true);
    setOpen(false);
  };

  const exitSite = () => {
    window.location.href = 'https://www.google.com';
  };

  if (isVerified) return null;

  return (
    <Dialog open={open} fullScreen>
      <DialogContent className="age-gate">
        <div className="age-gate-content">
          <Typography variant="h4" gutterBottom>
            Welcome to Pot Express
          </Typography>
          <Typography variant="h6" gutterBottom>
            Are you 21 years of age or older?
          </Typography>
          <Typography variant="body1" paragraph>
            This website contains cannabis products and is only suitable for those 21 years or older.
          </Typography>
          <div className="age-gate-buttons">
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={verifyAge}
            >
              Yes, I'm 21+
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              size="large"
              onClick={exitSite}
            >
              No, I'm Under 21
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AgeGate;