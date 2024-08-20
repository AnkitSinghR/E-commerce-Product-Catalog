// import * as React from "react";
// import Alert from "@mui/material/Alert";
// import Stack from "@mui/material/Stack";

// export default function SuccessAlerts({ message }: { message: string }) {
//   return (
//     <Stack sx={{ width: "100%" }} spacing={2}>
//       <Alert severity="success">{message}</Alert>
//     </Stack>
//   );
// }
import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const SuccessSnackbar = () => {
  const [open, setOpen] = useState(true);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        Operation completed successfully!
      </Alert>
    </Snackbar>
  );
};
export default SuccessSnackbar;
