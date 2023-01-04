import { Box, Button, Dialog, DialogActions, DialogContent, InputAdornment, TextField } from "@material-ui/core";
import { Portrait } from '@material-ui/icons';
import React, { useEffect, useState } from "react";
import { OrgUser } from "./OrgTable";

interface UserDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (user: OrgUser) => void;
  user?: OrgUser;
}

export default function UserDialog(props: UserDialogProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setEmail(props.user?.email || '');
    setFirstName(props.user?.firstName || '');
    setLastName(props.user?.lastName || '');
  }, []);

  return (
    <Dialog fullWidth open={props.open} onClose={props.handleClose} maxWidth="lg">
      <DialogContent>
        <TextField
          id="first-name"
          InputProps={{
            endAdornment: <InputAdornment position="end"><Portrait/></InputAdornment>,
          }}
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          id="last-name"
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          id="email"
          label="E-mail"
          fullWidth
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </DialogContent>
      <DialogActions style={{justifyContent: "flex-start", paddingLeft: 24}}>
      <Button color="primary" variant="contained" onClick={() => {
          props.handleSave({firstName, lastName, email, id: props.user?.id, managerEmail: props.user?.managerEmail});
          props.handleClose();
          setEmail("");
          setFirstName("");
          setLastName("");
        }}>
        Save
      </Button>
          <Button variant="contained" onClick={props.handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
