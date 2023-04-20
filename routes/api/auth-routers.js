const express = require("express");

const ctrl = require("../../controllers/auth-controllers");
const { validateBody } = require("../../utils");
const { registerAndLoginSchema } = require("../../models/user");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(registerAndLoginSchema), ctrl.register);

router.post("/login", validateBody(registerAndLoginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  ctrl.updateAvatar
);

module.exports = router;
