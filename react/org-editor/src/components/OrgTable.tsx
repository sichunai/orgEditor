import DataTable from "react-data-table-component";
import { IconButton } from '@material-ui/core';
import { ArrowDownward, Edit, Delete } from '@material-ui/icons';
import { useState } from "react";
import UserDialog from "./UserDialog";

export interface OrgUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  managerEmail?: string;
}

// orgUsers: Users for the current org
// changeManager: Callback function to change the current manager
// deleteUser: Callback to change the current manager
// editUser: Callback to edit a user
interface OrgTableProps {
  orgUsers: OrgUser[];
  changeManager: (managerEmail?: string) => void;
  deleteUser: (user: OrgUser) => void;
  editUser: (user: OrgUser) => void;
}

export default function OrgTable(props: OrgTableProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [dialogUser, setDialogUser] = useState(
    undefined as OrgUser | undefined
  );
  const orgTableColumns = [
    {
      name: "First Name",
      selector: (user: OrgUser) => user.firstName,
    },
    {
      name: "Last Name",
      selector: (user: OrgUser) => user.lastName,
    },
    {
      name: "Email",
      selector: (user: OrgUser) => user.email,
    },
    // Hint: Implement by having `cell` return TSX for the actions
    {
      key: "actions",
      name: "Actions",
      sortable: false,
      align: "left",
      cell: (user: OrgUser) => {
        return <div>
          <IconButton onClick={() => props.changeManager(user.email)}>
            <ArrowDownward/>
          </IconButton>
          <IconButton onClick={() => {
              setDialogUser(user);
              setOpenEditDialog(true);
              props.editUser(user);
            }}>
            <Edit/>
          </IconButton>
          <IconButton onClick={() => props.deleteUser(user)}>
            <Delete/>
          </IconButton>
        </div>;
      },
    },
  ];

  return (
    <div className="OrgEditor">
      <DataTable columns={orgTableColumns} data={props.orgUsers} />
      {openEditDialog &&
        <UserDialog 
          open={openEditDialog} 
          handleClose={() => setOpenEditDialog(false)} 
          handleSave={props.editUser}
          user={dialogUser}
        />
      }
    </div>
  );
}
