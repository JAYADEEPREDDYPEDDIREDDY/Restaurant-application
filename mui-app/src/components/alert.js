import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CustomAlert = ({ message, open, onClose,secondButton,onSecondButtonClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Alert</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
         YES
        </Button>
        
        { secondButton&& 
        <Button onClick={onSecondButtonClose} color="primary">
        NO
      </Button>}
        
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlert;
