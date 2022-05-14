// compile code will go here
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, "contracts","Inbox.sol");
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source,1).contracts[":Inbox"]; // export the value of ":Inbox" of the contracts
// for more detail - console.log(solc.compile(source,1));