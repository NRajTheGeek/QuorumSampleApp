pragma solidity ^0.4.17;

contract NodeC {

    struct Bids {
        string itemName;
        uint bid;
        address bidder;
    }
    address private owner;
    
    constructor() public {
        Items["crazy_monkey"] = 1200;
        owner = msg.sender;
    }
    
    modifier onlyOwner(address _owner) {
        require(_owner == owner, "cannot perform action.");
        _;
    }

    mapping (string => uint) Items;
    mapping (string => mapping (address => Bids)) itemAddressBids;

    modifier addressNotBlank(address add){
        require(add != 0x0, "null address");
        _;
    }

    modifier nullStringCheck(string memory val){
        require(bytes(val).length > 0, "empty string");
        _;
    }

    modifier uintNonZero (uint val) {
        require(val > 0, "cannot be zero");
        _;
    }
    
    function createItem(string memory name, uint price) public 
    onlyOwner(msg.sender)
    nullStringCheck(name)
    uintNonZero(price) 
    {
        Items[name] = price;
    }
    
    function placeABid(string memory name, uint bid) public 
    nullStringCheck(name) 
    uintNonZero(bid)
    {
        require(bid > Items[name], "the bid should exceed the price.");
        
        Bids memory bids = Bids(name, bid, msg.sender);
        itemAddressBids[name][msg.sender] = bids;
    }
    
    function getItemPrice(string memory name) public view returns (uint itemPrice){
        return Items[name];
    }
    
    function getBidsForItem(string memory name, address bidderAddress) 
    public 
    addressNotBlank(bidderAddress)
    view 
    returns (string memory itemName, uint latestUserBid)
    {
        return (itemAddressBids[name][bidderAddress].itemName, itemAddressBids[name][bidderAddress].bid);
    }
}