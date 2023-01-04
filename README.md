# Okay UI Interview

This repo contains a very simple service that consumes Users, Entities and Events.  

## Overview of the Repo

- `server` - The server-side source code
  - `api` - Contains the types for each API
  - `db` - Contains the logic to read/write/update objects in the sqlite
  - `routers` - Contains the routes for each API
  - `utils` - Contains common utility functions
  - `scripts` - Contains helper scripts
- `client` - The UI code (Vue)
  - `components`: Vue components
  - `router`: Vue router
  - `store`: Frontend store for managing server-side objects

## Running the Service

### Install Dependencies

Install `nvm`

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Install yarn:

```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

Install Node

```
nvm install 16.13.1 && nvm use 16.13.1
```

### Run the Tests

`yarn tests`

### Build and Start the Server

`yarn build && yarn serve`

### Seed the Service with Data

`yarn seed`

Be sure to query the API to ensure data has been written!

## Objectives

Create an org editor UI!

The goal is to create a Vue-based or React-based Org Editor using the provided server-side API calls.  
The server-side calls have already been implemented in `server/src/routers/users.ts`.

### React-Specifics

The client-side interfaces to the server API are in `react/org-editor/src/components/OrgEditor.tsx`.

You need to complete the implementation:

- `react/org-editor/src/components/OrgEditor.tsx`: Top-level editor and parent of `react/org-editor/src/components/OrgTable.tsx`.
- `react/org-editor/src/components/OrgTable.tsx`: Component wrapping `DataTable`, which should render the current org.
- `react/org-editor/src/components/UserDialog.tsx`: Dialog used to edit and create new users.

1. Start by implementing an org tree navigator:
   - In one terminal, run `yarn serve-react`
   - In another terminal, run `yarn seed`
   - Open a browser to `http://localhost:8080/orgEditor`
   - `videos/okay-interview-org-ui-demo.mov` is a demo implementation (Note this implementation was done in Vue)

   `OrgEditor` has one optional prop (`managerEmail`) and should open with the Top-of-Org
   (all users are self-managed) if `managerEmail` is not provided.  Begin by implementing
   basic navigation of the org chart.
2. Implement the delete feature (see video for example)
   - Make sure that the org is updated in the UI whenever a user is deleted
3. Implement a user add feature (see video for example)
   - Create a button and click action which opens a dialog (`src/components/UserDialog.vue`) which
     is used to create a new user.
   - The user should be added as a report to `managerEmail`, otherwise the user's manger should be itself.
4. Implement a user edit feature (see video for example)
  - Re-use or update `src/components/UserDialog.vue` to allow editing of existing users.

## Hints

- Be sure to try and get something working, so focus on getting navigation done before moving onto the
  other features.
- Watch the demo video:`videos/okay-interview-org-ui-demo.mov` 
- Use Vuetify components to, such as `v-data-table` to make your life easier.  The project is bootstrapped
  to use Vuetify, so you should be able to use Vuetify out-of-the-box.
- After getting the service running, spend a few minutes using `curl` to understand the structure of the data.
  - `curl http://localhost:8080/api/users`: Returns all users
  - `curl http://localhost:8080/api/users/org/tomas@okayhq.com`: Return entire org under `tomas@okayhq.com`
  - `curl http://localhost:8080/api/users/org/directs/tomas@okayhq.com`: Return direct reports under `tomas@okayhq.com` 
- You can re-run `yarn serve` and `yarn seed` to reset the data (could be helpful when testing delete)

