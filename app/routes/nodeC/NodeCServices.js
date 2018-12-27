const Web3 = require("web3");
const contract = require("truffle-contract");
const path = require("path");
let NodeC = require(path.join(__dirname, "../../../build/contracts/NodeC.json"));

let provider = new Web3.providers.HttpProvider("http://localhost:22002");
const OtherService = require('../nodeA/NodeA_Owner_Services');

let Contract = contract(NodeC);
Contract.setProvider(provider);

const getItemPriceByName = function(name, res) {
  Contract.deployed()
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

const getBid = function(name, bidderAddress, res) {
  Contract.deployed()
    .then(function(instance) {
      return instance.getBidsForItem.call(name, bidderAddress);
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

const placeBid = function(name, bidPrice, bidderAddress, res) {
  Contract.deployed()
    .then(function(instance) {
      console.log(`Setting value to ${bidPrice}...`);
      return instance.placeABid(name, bidPrice, {
        privateFor: ['BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo='],
        from: bidderAddress
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

const getItems = function(res){

  OtherService.getJsonContent(path.join(__dirname, '../nodeA/itemList.json'))
  .then(jsonData => {
    res.send(jsonData.items);
  })
  .catch(error => {
    console.log(error);    
    res.send(error);
  })
}

module.exports = {
  getItemPriceByName,
  getBid,
  placeBid,
  getItems
};
