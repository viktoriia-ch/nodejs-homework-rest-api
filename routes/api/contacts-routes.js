const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contact");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put("/:contactId", authenticate, ctrl.updateContactById);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, ctrl.removeContactById);

module.exports = router;
