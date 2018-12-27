var express = require("express");
var router = express.Router();
const contractService = require("./NodeCServices");


router.get("/getItemPrice/:itemName", function(req, res, next) {
  console.log("came to get the bid");
  var itemName = req.params.itemName;
  contractService.getItemPriceByName(itemName, res);
});

router.post("/placeBid/item/:itemName/price/:bidPrice/bidderAddress/:bidderAddress", function(req, res, next) {
  console.log("came to place a bid");
  let itemName = req.params.itemName;
  let bidPrice = parseInt(req.params.bidPrice);
  let bidderAddress = req.params.bidderAddress;
  
  contractService.placeBid(itemName, bidPrice, res);
});
router.get("/getBid/item/:itemName/bidderAddress/:bidderAddress", function(req, res, next) {
  console.log("came to get the bid");
  let itemName = req.params.itemName;
  let bidderAddress = req.params.bidderAddress;
  contractService.getBid(itemName, bidderAddress, res);
});

router.get("/getAllItems", function(req, res, next){
  contractService.getItems(res);
});
module.exports = router;
