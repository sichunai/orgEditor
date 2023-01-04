import { OrgUser } from "./OrgTable";
import { useEffect, useState } from "react";
import { Button, IconButton } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import OrgTable  from "./OrgTable";
import UserDialog from "./UserDialog";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./styles.css";

export default function OrgEditor() {
  // Currently unused, but can be used to update URL+params and navigate the browser
  const navigate = useNavigate();
  // Get search params and current manager email from the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const managerEmail = searchParams.get("managerEmail") || undefined;

  const [currentManager, setCurrentManager] = useState(
    undefined as OrgUser | undefined
  );
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [orgUsers, setOrgUsers] = useState(undefined as OrgUser[] | undefined);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to load user state with direct reports of a manager
  async function fetchDirects(managerEmail: string) {
    fetch(`/api/users/org/directs/${managerEmail}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setOrgUsers(result as OrgUser[]);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }

  // Helper to load manager state
  async function fetchManager(managerEmail: string) {
    fetch(`/api/users/email/${managerEmail}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setCurrentManager(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }

  // Helper to load users with all users
  async function fetchAllUsers() {
    fetch(`/api/users`)
      .then((res) => res.json())
      .then(
        (result) => {
          setOrgUsers(result as OrgUser[]);
          setCurrentManager(undefined);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }

  async function deleteUser(user: OrgUser) {
    await fetch(`/api/users/${user.id}`, {
      method: "DELETE",
    });
    // once a user is deleted, refresh the page by fetching it's directs, or if it's top of org, fetch all users
    currentManager?.email ? fetchDirects(currentManager?.email || '') : fetchAllUsers();
  }
  async function editUser(user: OrgUser) {
    await fetch("/api/users", {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // once a user is edited, refresh the page by fetching for directs, or if it's top of org, fetch all users
    currentManager?.email ? fetchDirects(currentManager?.email || '') : fetchAllUsers();
  }

  async function createUser(user: OrgUser) {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        ...user,
        managerEmail: managerEmail || user.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // once a user is created, refresh the page by fetching for directs, or if it's top of org, fetch all users
    currentManager?.email ? fetchDirects(currentManager?.email || '') : fetchAllUsers();
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // changeManager: Change the current manager
  async function changeManager(managerEmail?: string) {
    if(currentManager?.email === managerEmail) {
      // go back to top of org
      setSearchParams({});
      fetchAllUsers();
    } else {
      // fetch the directs
      setSearchParams({ managerEmail: `${managerEmail}`});
      fetchManager(managerEmail || '');
      fetchDirects(managerEmail || '');
    }
  }

  if(!isLoaded) return <>loading</>;
  if(error) return <>{error}</>;

  return <> 
    <div className="org-header">
      <div className="org-title"> {currentManager
      ? <span>{currentManager.firstName} {currentManager.lastName}'s Team
          <IconButton onClick={() => changeManager(currentManager.managerEmail)}>
            <ArrowUpward/>
          </IconButton>
        </span>
      : 'Top of Org'} </div>
      <Button variant="contained" onClick={() => setOpenCreateDialog(true)}>add team member</Button>
    </div>
    <UserDialog 
      open={openCreateDialog} 
      handleClose={() => setOpenCreateDialog(false)} 
      handleSave={createUser} 
    />
    <OrgTable 
      orgUsers={(currentManager ? orgUsers : orgUsers?.filter(user => user.email === user.managerEmail)) || []} 
      changeManager={changeManager}
      deleteUser={deleteUser}
      editUser={editUser}
    />
  </>
}
