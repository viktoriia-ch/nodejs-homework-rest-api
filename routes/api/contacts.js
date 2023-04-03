const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone`,
  }),
});

router.get("/", async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);

    if (!contact) {
      throw HttpError(404);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { name, email, phone } = req.body;
    const newContact = await contacts.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);

    if (!updatedContact) {
      throw HttpError(404, "Not found!");
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactForRemove = await contacts.removeContact(contactId);

    if (!contactForRemove) {
      throw HttpError(404, "Not found!");
    }

    res.json({
      message: "Success removed!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
