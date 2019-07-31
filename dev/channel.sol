pragma solidity ^0.5.1;

contract Channel {
    
    uint c_id;
    string c_name;
    struct Vote {
        uint transaction_id;
        address voter;
        address party;
    }
    uint count = 0;
    address host = msg.sender;
    mapping(uint => Vote) votes;
    
    function addTransaction(uint _transaction_id, address _voter, address _party) public {
        require(host == msg.sender);
        votes[count] = Vote(_transaction_id, _voter, _party);
        count +=1;
    }
    
    function getResults() view public returns(uint) {
        return votes[0].transaction_id;
    }
}
