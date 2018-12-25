const Web3 = require("web3");
const contract = require("truffle-contract");
const path = require("path");
let NodeB_Bidder = require(path.join(
  __dirname,
  "../../../build/contracts/NodeB.json"
));

let NodeC_Bidder = require(path.join(
  __dirname,
  "../../../build/contracts/NodeC.json"
));

let provider = new Web3.providers.HttpProvider("http://localhost:22000");



let bidderPubEnum = {
  nodeB: "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
  nodeC: "1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg="
}

let NodeBContract = contract(NodeB_Bidder);
let NodeCContract = contract(NodeC_Bidder);

let bidderEnum = {
  nodeB: NodeBContract,
  nodeC: NodeCContract
}

NodeBContract.setProvider(provider);
NodeCContract.setProvider(provider);


const getItemPriceByName = function(name, whichNode, res) {
  let contract = bidderEnum[whichNode];
  contract.deployed()
    .then(function(instance) {
      return instance.getItemPrice.call(name);
    })
    .then(
      function(result) {
        console.log(result);
        res.setHeader("Content-Type", "application/json");
        res.send(result);
      },
      function(error) {
        console.log(error);
        res.setHeader("Content-Type", "application/json");
        res.send(error);
      }
    );
};

const createItem = function(name, price, whichNode, res) {
  console.log(name, ' ', price)
  console.log(typeof price)
  let contract = bidderEnum[whichNode];
  let privateForArray = [];
  privateForArray.push(bidderPubEnum[whichNode]);

  contract.deployed()
    .then(function(instance) {
      console.log(`Setting value to ${price}...`);
      return instance.createItem(name, price, {
        from: "0xed9d02e382b34818e88b88a309c7fe71e65f419d",
        privateFor: privateForArray
      });
    })
    .then(function(result) {
      console.log("Transaction:", result.tx);
      console.log("Finished!");
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.setHeader("Content-Type", "application/json");
      res.send(error);
    });
};

const getBid = function(name, whichNode, res) {
  let contract = bidderEnum[whichNode];
  contract.deployed()
    .then(function(instance) {
      return instance.getBidsForItem.call(name);
    })
    .then(
      function(result) {
        console.log(result);
        res.setHeader("Content-Type", "application/json");
        res.send(result);
      },
      function(error) {
        console.log(error);
        res.setHeader("Content-Type", "application/json");
        res.send(error);
      }
    );
};


module.exports = {
  getItemPriceByName,
  createItem,
  getBid
};
