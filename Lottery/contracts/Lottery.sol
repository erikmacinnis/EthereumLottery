pragma solidity ^0.8.9; 

contract Lottery {

    uint private slotId = 0;
    address private manager;
    mapping(uint => address) private slots;

    constructor() {
        manager = msg.sender;
    }

    function getSlotId() external view returns(uint){
        return slotId;
    }

    function getMap(uint slot) external view returns(address) {
        return slots[slot];
    }

    function makeBid() external payable {
        require( msg.value >= 300000000000000000, "Your bid is not high enough" );
        slotId++;
        slots[slotId] = msg.sender;
        // uint numberOfBids = msg.value / bidSize;
        // for (uint i = 0; i < numberOfBids; i++){
        //     slotId++;
        //     slots[slotId] = msg.sender;
        // }
    }

    function owner(address addy) private view {
        require(addy == manager);
    }

    function chooseWinner() external {
        owner(msg.sender);
        address payable winner = payable(slots[(random() % slotId) + 1]);
        winner.transfer(address(this).balance);
    }

    function refresh() external {
        require(address(this).balance < 1000);
        owner(msg.sender);
        slotId = 0;
    }

    function random() private view returns(uint) {
        return uint (keccak256(abi.encodePacked(block.difficulty, block.timestamp, slotId)));
    }
}