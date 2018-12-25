pragma solidity ^0.4.17;

contract Bidder2 {
    uint public bidPrice;

    modifier checkNonZeroNonNegative(uint val) {
        require(val > 0, "value to be set should be non-negative uint.");
        require(val != 0, "value to be set should be non-zero uint.");
        _;
    }

    modifier checkNonNegative(uint val) {
        require(val >= 0, "value to be set in constructor should be non-negative uint.");
        _;
    }

    constructor(uint initialBid) 
    public 
    checkNonNegative(initialBid) 
    {
        bidPrice = initialBid;
    }

    function set(uint bid) 
    public 
    checkNonZeroNonNegative(bid) 
    {
        bidPrice = bid;
    }

    function get() public view returns (uint retBid) {
        return bidPrice;
    }
}