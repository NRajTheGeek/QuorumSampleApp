var NodeB = artifacts.require("./NodeB.sol");
var NodeC = artifacts.require("./NodeC.sol");

module.exports = function(deployer) {
  deployer.deploy(NodeB, {
    privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="]
  });

  deployer.deploy(NodeC, {
    privateFor: ["1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg="]
  });
};
