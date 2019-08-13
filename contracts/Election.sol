pragma solidity ^0.5.1;

contract Election {
	// Modelling a candidate 
	struct Candidate {
		uint id;
		string name;
		uint votes;
	}


	// List of candidates
	mapping(uint => Candidate) public candidates;

	// Storing the length of the candidate's list
	uint public candidates_length;

	// Address of the voter
	address voter;

	constructor() public {
		candidates_length = 0;
		voter = msg.sender;
		addCandidate("Candidate 1");
		addCandidate("Candidate 2");
	}

	function addCandidate(string memory _name) private {
		candidates_length ++;
		candidates[candidates_length] = Candidate(candidates_length, _name, 0);
	}
	
	function vote(uint _candidate_id) public {

		// Run-time Error handling
		require(!voted[msg.sender], "Address has not voted");
		require(_candidate_id >= 1 && _candidate_id <= candidates_length, "Valid ID of candidate");

		voted[msg.sender] = true;

		candidates[_candidate_id].votes ++;
	}
}
