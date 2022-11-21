const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const get = await getContactById(id);
      console.table(get);
      break;

    case "add":
      await addContact(name, email, phone);
      break;

    case "remove":
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
const start = async (argv) => {
  try {
    await invokeAction(argv);
  } catch (error) {
    console.log(error);
  }
};
start(argv);
