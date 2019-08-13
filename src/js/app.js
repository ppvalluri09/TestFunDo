App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    
    if (typeof web3 == 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    
    $.getJSON("Election.json", function(election) {
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);
      return App.render();
    });

    // return App.render();
  },

  render: function() {
    var election_instance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").empty();
        $("#accountAddress").html("Your Account:- " +  account);
      }
    });

    // Load contract Data
    App.contracts.Election.deployed().then(function(instance) {
      election_instance = instance;
      return election_instance.candidates_length();
    }).then(function(count) {
      var candidates_result = $("#candidateResults");
      candidates_result.empty();

      for (var i = 1; i <= count; i++) {
        election_instance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var votes = candidate[2];

          var template = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + votes + "</td></tr>";
          candidates_result.append(template);
        });
      }
    loader.hide();
    content.show();
    }).catch(function(err) {
      console.warn(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
