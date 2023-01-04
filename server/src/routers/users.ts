import express from "express";
import {
  createDbUser,
  deleteDbUser,
  getDbUser,
  getDbUserByEmail,
  getOrg,
  getOrgTree,
  getReportsByManagerEmail,
  listDbUsers,
  updateDbUser,
} from "../db/users";
import { userPatchBody, userPostBody } from "../api/users";

const router = express.Router();
router.get("/:id", async (req, res) => {
  const userId = Number(req.params.id);
  if (userId) {
    const user = await getDbUser(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send();
  }
});

router.get("/email/:email", async (req, res) => {
  const userEmail = req.params.email;
  if (userEmail) {
    const user = await getDbUserByEmail(userEmail);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send();
  }
});

router.delete("/:id", async (req, res) => {
  const userId = Number(req.params.id);
  if (userId) {
    const user = await getDbUser(userId);
    if (user) {
      await deleteDbUser(user);
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send();
  }
});

router.get("/", async (req, res) => {
  const users = await listDbUsers();
  res.json(users);
});

router.get("/org/:email", async (req, res) => {
  const email = req.params.email;
  if (email) {
    const users = await getOrg(email);
    res.json(users);
  } else {
    res.status(400).send();
  }
});

router.get("/org/directs/:email", async (req, res) => {
  const email = req.params.email;
  if (email) {
    const users = await getReportsByManagerEmail(req.params.email);
    res.json(users);
  } else {
    res.status(400).send();
  }
});

router.get("/orgTree/:email", async (req, res) => {
  const email = req.params.email;
  if (email) {
    const orgTree = await getOrgTree(email);
    res.send(orgTree);
  } else {
    res.status(400).send();
  }
});

router.post("/", async (req, res) => {
  const userRequest = req.body;
  if (userPostBody(userRequest)) {
    const result = await createDbUser(userRequest);
    res.json({ id: result });
  } else {
    res.status(400).send();
  }
});

router.patch("/", async (req, res) => {
  const userRequest = req.body;
  if (userPatchBody(userRequest)) {
    const result = await updateDbUser(userRequest);
    res.json({ id: result });
  } else {
    res.status(400).send();
  }
});

export default router;
