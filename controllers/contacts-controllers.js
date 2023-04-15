const { Contact } = require("../models/contact");

const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }).populate("owner", "email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId).populate("owner", "email");
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const contactForUpdate = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    }
  );
  if (!contactForUpdate) {
    throw HttpError(404);
  }
  res.json(contactForUpdate);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactForRemove = await Contact.findByIdAndDelete(contactId);
  if (!contactForRemove) {
    throw HttpError(404);
  }
  res.json({
    message: "contact deleted!",
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const contactForUpdate = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!contactForUpdate) {
    throw HttpError(404);
  }
  res.json(contactForUpdate);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  removeContactById: ctrlWrapper(removeContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
