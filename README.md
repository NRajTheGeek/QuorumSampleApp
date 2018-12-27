# QuorumSample_DApp

### Index
1. Introduction
2. Network Architecture
3. The Flow and Idea
4. Smart Contract
5. How Quorum Is Maintaining the Privacy
6. Steps t start the Quorum Blockchain
7. Steps to Deploy the Smart Contracts for he Bidder Dapp
8. Steps to start the server
9. Swagger for interaction with the server
10. Conclusion and what next?


## 1. Introduction:- 
Its a simple dapp demo over `Quorum Blockchain`, which utilizes a `dockerized` environment to host the Quorum Blockchain and have its smart contracts written in `Solidity 0.4.17` and handles deployments with `truffle smart contract deployment/development framework` and it has a `NodeJS server` to serve the APIs for feature interactions with the smart contract and it has a `Swagger UI` to provide UI interface / Documentation.

## 2. Network Architecture:-
There is a dockerized environment cloned from quorum's official repo for maintaining the dockerized environment for the quorum dapp network.

Basically there are 7 Nodes, and their respective tx managers, for further details yu can study the docker-compose file attached in this sample project.

## 3. The Flow and Idea

## 4. Smart Contract

#### For NodeB

```
pragma solidity ^0.4.17;

contract NodeB {

    struct Bids {
        string itemName;
        uint bid;
        address bidder;
    }
    address private owner;
    
    constructor() public {
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
    
    function placeABid(string memory name, uint bid, address bidderAddress) public 
    nullStringCheck(name) 
    uintNonZero(bid)
    {
        require(bid > Items[name], "the bid should exceed the price.");
        
        Bids memory bids = Bids(name, bid, bidderAddress);
        itemAddressBids[name][bidderAddress] = bids;
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
```

#### For NodeC

```
pragma solidity ^0.4.17;

contract NodeB {

    struct Bids {
        string itemName;
        uint bid;
        address bidder;
    }
    address private owner;
    
    constructor() public {
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
    
    function placeABid(string memory name, uint bid, address bidderAddress) public 
    nullStringCheck(name) 
    uintNonZero(bid)
    {
        require(bid > Items[name], "the bid should exceed the price.");
        
        Bids memory bids = Bids(name, bid, bidderAddress);
        itemAddressBids[name][bidderAddress] = bids;
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
```
## 5. How Quorum Is Maintaining the Privacy



Image below is from the official quorum repo:-

![from the official quorum repo](https://raw.githubusercontent.com/jpmorganchase/quorum-docs/master/images/QuorumTransactionProcessing.JPG)

## 6. Steps to start the Quorum Blockchain



* Make sure that you have following installed 
  * Docker version 18.09.0+
  * docker-compose version 1.23.2+ 

Now, that you have the proper docker and docker-compose installed, we can start now:

First clone this repo into your machine
```
git clone https://github.com/NRajTheGeek/QuorumSampleApp.git
```
and 
```
cd quorum-examples
```
now to start the dockerized environment and the quorum blockchain 7 node and 7 tx mnager network up and running: 
```
docker-compose up -d
```

now  wait 5 or 10 min for the node to start mining properly


## 7. Steps to Deploy the Smart Contracts for he Bidder Dapp



## 8. Steps to start the server



## 9. Swagger for interaction with the server



## 10. Conclusion and what next?
