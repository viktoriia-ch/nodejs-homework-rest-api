const contacts = require("../models/contacts");

const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");

const getAllContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await contacts.addContact(name, email, phone);
  res.status(201).json(newContact);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const updatedContact = await contacts.updateContact(contactId, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found!");
  }
  res.json(updatedContact);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactForRemove = await contacts.removeContact(contactId);
  if (!contactForRemove) {
    throw HttpError(404, "Not found!");
  }
  res.json({
    message: "contact deleted!",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  removeContactById: ctrlWrapper(removeContactById),
};
