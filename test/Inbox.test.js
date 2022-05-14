// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const { describe, beforeEach, it } = require("mocha");
const Web3 = require("web3");
const {interface, bytecode} = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
beforeEach(async ()=>{
    //Get a list of all the account created by the ganache provider
    accounts = await web3.eth.getAccounts();
    //Use one of the accounts to deploy the contract
    //interface is returned by the sol program as a json object -> this needs to be parsed in  to a js object
    inbox = await new web3.eth.Contract(JSON.parse(interface)) // teaches web3 about what methods an inbox contract has
        .deploy({data: bytecode, arguments: ["Hi there! "]}) //takes bytecode from compile program and deploys the sol app with initial message "Hi there!" as a constructor argument
        .send({from : accounts[0],gas: "1000000"}) //instructs web3 to send out a transaction that creates this contract with the gas price
    }); //deploy only creates an object , send method deploys the object

describe("Inbox test : ", () => {
    it("deploys a contract", () => {
        assert.ok(inbox.options.address); //check that the contract is actually getting deployed -> deployed contracts will have an address 
    });

    it("has a default message",async ()=>{
        const msg = await inbox.methods.message().call();
        assert.equal(msg, "Hi there! ");
    });


    it("sets a new message", async ()=>{
        await inbox.methods.setMessage("Hello").send({from : accounts[0]}); // the sender orr the one who pays for the transaction must be specified
        const msg = await inbox.methods.message().call();
        assert.equal(msg, "Hello");
    })
});


/*
// A VERY SIMPLE TEST TO STUDY HOW MOCHA WORKS
class Car{
    park(){
        return "stopped";
    }

    drive(){
        return "vroom";
    }
}

let car;
//beforeEach runs the code before every it function
beforeEach(()=>{
    car = new Car(); // create a Car instance for the test
})

//describe is a collections of it functions
describe("Auto",()=>{
    it("can park",()=>{
        assert.equal(car.park(), "stopped"); // car.park() should return "stopped"
    } );

    it("can drive", ()=>{
        assert.equal(car.drive(), "vroom");
    });
});
*/