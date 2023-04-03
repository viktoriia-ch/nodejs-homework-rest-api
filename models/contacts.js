const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  allContacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const contactForRemove = allContacts.find(
    (contact) => contact.id === contactId
  );
  console.log(contactForRemove);

  const newList = allContacts.filter((contact) => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return contactForRemove || null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
