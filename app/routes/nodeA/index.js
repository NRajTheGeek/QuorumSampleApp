var express = require("express");
var router = express.Router();
const contractService = require("./NodeA_Owner_Services");

/* GET users listing. */
router.get("/createItem/itemName/:name/itemPrice/:price/node/:whichNode", function(req, res, next) {
  let price = parseInt(req.params.price);
  let name = req.params.name;
  let whichNode = req.params.whichNode;

  console.log(name, ' ', price, ' ', whichNode);
  contractService.createItem(name, price, whichNode, res);
});

router.get("/getItemPrice/:itemName/node/:whichNode", function(req, res, next) {
  console.log("came to get the bid");
  var itemName = req.params.itemName;
  let whichNode = req.params.whichNode;
  contractService.getItemPriceByName(itemName, whichNode, res); 
});

router.get("/getBid/item/:itemName/bidderAddress/:bidderAddress/node/:whichNode", function(req, res, next) {
  console.log("came to get the bid");
  let itemName = req.params.itemName;
  let whichNode = req.params.whichNode;
  let bidderAddress = req.params.bidderAddress;
  contractService.getBid(itemName, bidderAddress, whichNode, res);
});

module.exports = router;
