const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const result = await JSON.parse(contacts);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(id) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === id.toString());
    return result;
  } catch (error) {
    console.error(error);
  }
  return contact;
}

async function removeContact(id) {
  const prewContacts = await listContacts();
  let newContacts = await prewContacts.filter(
    (contact) => contact.id !== id.toString()
  );
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact with id: ${id} was successfully deleted!`);
    const updatedContacts = await listContacts();
    return updatedContacts;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  try {
    const newContact = { id: shortid.generate(), name, email, phone };
    const updateContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
    console.table(
      `New contact: ${name}, email: ${email}, phone: ${phone} = was created!`
    );
    const updatedContacts = await listContacts();
    return updatedContacts;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
