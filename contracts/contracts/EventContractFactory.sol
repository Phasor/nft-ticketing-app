//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "./Event.sol";

contract EventContractFactory {
    address public admin;

    mapping(address => bool) public events;
    address[] public eventAddresses;

    uint256 public fee;

    event EventCreation(
        address indexed owner,
        address indexed contractAddress,
        string name
    );

    constructor(uint256 _fee) {
        fee = _fee;
        admin = msg.sender;
    }

    function createEvent(
        string memory _eventName,
        string memory _location,
        uint256 _dateOfEvent,
        uint256 _maxNumOfTickets,
        uint256 _ticketPrice,
        string memory _eventImageURL
    ) public payable {
        require(msg.value >= fee, "incorrect amount paid");

        address eventAddress = address(
            new Event(
                _eventName,
                _dateOfEvent,
                _location,
                _maxNumOfTickets,
                _ticketPrice,
                address(msg.sender),
                _eventImageURL
            )
        );

        events[eventAddress] = true;
        eventAddresses.push(eventAddress);

        emit EventCreation(msg.sender, eventAddress, _eventName);
    }

    function withdraw() public onlyAdmin {
        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "failed to withdraw");
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "must be admin");
        _;
    }
}
