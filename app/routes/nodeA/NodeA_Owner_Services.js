const Web3 = require("web3");
const contract = require("truffle-contract");
const path = require("path");
const fs = require("fs");
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
};

let NodeBContract = contract(NodeB_Bidder);
let NodeCContract = contract(NodeC_Bidder);

let bidderEnum = {
  nodeB: NodeBContract,
  nodeC: NodeCContract
};

NodeBContract.setProvider(provider);
NodeCContract.setProvider(provider);

const getItemPriceByName = function(name, whichNode, res) {
  let contract = bidderEnum[whichNode];
  contract
    .deployed()
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
  console.log(name, " ", price);
  console.log(typeof price);
  let contract = bidderEnum[whichNode];
  let privateForArray = [];
  privateForArray.push(bidderPubEnum[whichNode]);

  contract
    .deployed()
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
      return _updateItemOnList(name, price);
    })
    .then(res => {
      console.log('item added')
    })
    .catch(function(error) {
      console.log(error);
      res.setHeader("Content-Type", "application/json");
      res.send(error);
    });
};

const _addItemToItemArray = function(itemName, itemPrice, ItemArrayFromJSON){
  let obj = {
    itemName: itemName,
    itemPrice: itemPrice
  };

  ItemArrayFromJSON.push(obj);
}

const getJsonContent = function(filePath) {
  return new Promise((resolve, reject) => {
    let fileData = "";

    try {
      const stream = fs.createReadStream(filePath, { encoding: "utf-8" });
      stream.on("data", data => {
        fileData += data.toString();
      });
      stream.on("end", () => {
        resolve(JSON.parse(fileData));
      });
    } catch (err) {
      reject(err);
    }
  });
};

(async function get(){
 let data =  await getJsonContent(path.join(__dirname, "itemList.json"));
 console.log(data);
 
})();


const _pushContentToJSON = function(filePath, dataJSON) {

  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      let fileData = "";
      try {
        const stream = fs.createWriteStream(filePath, { encoding: "utf-8" });
        stream.write(JSON.stringify(dataJSON, null, 4));
        stream.end();
        resolve("List config updated successfully");
        console.log("List config updated successfully");
        
      } catch (err) {
        reject(err);
      }
    } else {
      throw new Error("itemlist file not found");
    }
  });
};

var _updateItemOnList = function(itemName, itemPrice){

  const filePath = path.join(__dirname, "itemList.json");

  return new Promise((reject, resolve)=>{
    getJsonContent(filePath)
    .then(async jsonData => {
      if(!jsonData.itemNames.includes(itemName)){
        // jo add it to the list
        jsonData.itemNames.push(itemName);
        // updating the items jsonData.items array
        _addItemToItemArray(itemName, itemPrice, jsonData.items);

        await _pushContentToJSON(filePath, jsonData);
      } else {
        throw new Error('Item already on list clear the list');
      }
    })
    .catch(error=> {
      throw new Error(error);
    })
  });
}

const getBid = function(name, bidderAddress, whichNode, res) {
  let contract = bidderEnum[whichNode];
  contract
    .deployed()
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

const getItems = function(res){

  getJsonContent(path.join(__dirname, '../nodeA/itemList.json'))
  .then(jsonData => {
    console.log(jsonData.items);
    
    res.send(jsonData.items);
  })
  .catch(error => {
    console.log(error);
    
    res.send(error);
  })
}


module.exports = {
  getItemPriceByName,
  createItem,
  getBid,
  getItems,
  getJsonContent
};
