const express = require("express");

const ctrl = require("../../controllers/auth-controllers");
const { validateBody } = require("../../utils");
const { registerAndLoginSchema } = require("../../models/user");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(registerAndLoginSchema),
  ctrl.register
);

router.post("/users/login", validateBody(registerAndLoginSchema), ctrl.login);

router.post("/users/logout", authenticate, ctrl.logout);

router.get("/users/current", authenticate, ctrl.getCurrent);

module.exports = router;
