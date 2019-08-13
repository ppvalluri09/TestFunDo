var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
	it ("Initialises with two candidates", function() {
		return Election.deployed().then(function(instance) {
			return instance.candidates_length();
		}).then(function(count) {
			assert.equal(count, 2, "Candidates count is valid");
		});
	});

	it("Candidates are initialised with the correct values", function() {
		return Election.deployed().then(function(instance) {
			app = instance;
			return app.candidates(1);
		}).then(function(candidate) {
			assert.equal(candidate[0], 1, "Candidate1 has the correct ID");
			assert.equal(candidate[1], "Candidate 1", "Candidate1 has the correct name");
			assert.equal(candidate[2], 0, "Candidare1 has the correct number of votes");
			return app.candidates(2);
		}).then(function(candidate) {
			assert.equal(candidate[0], 2, "Candidate2 has the correct ID");
			assert.equal(candidate[1], "Candidate 2", "Candidate2 has the correct name");
			assert.equal(candidate[2], 0, "Candidare2 has the correct number of votes");
		});
	});
	
	it("Correctness of the Voting procedure", function() {
		return Election.deployed().then(function(instance) {
			app_instance = instance;
			candidate_id = 1;
			return app_instance.vote(candidate_id, {from: accounts[0]});
		}).then(function(receipt) {
			return app_instance.voted(accounts[0]);
		}).then(function(voted) {
			assert(voted, "The voter has voted");
			return app_instance.candidates(candidate_id);
		}).then(function(candidate) {
			var vote_count = candidate[2];
			assert.equal(vote_count, 1, "Increment in the vote count is correct");
		})
	});
});
