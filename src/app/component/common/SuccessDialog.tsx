import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
type DialogCompProps = {
  dialogOpen: boolean;
  dialogTitle: string;
  handleClose: () => void;
};

const SuccessDialog = ({
  dialogOpen,
  dialogTitle,
  handleClose,
}: DialogCompProps) => {
  useEffect(() => {
    let timer: any;
    if (dialogOpen) {
      timer = setTimeout(() => {
        handleClose();
      }, 5000); // Close after 5 seconds
    }

    return () => {
      clearTimeout(timer);
    };
  }, [dialogOpen, handleClose]);
  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>
        <CheckCircleIcon color="success" /> Success
      </DialogTitle>
      <DialogContent>{dialogTitle}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
