var SquareVerifier = artifacts.require("SquareVerifier");
var SolutionVerifier = artifacts.require("SolutionVerifier");

module.exports = function (deployer) {
    deployer.deploy(SquareVerifier).then(function () {
        return deployer.deploy(SolutionVerifier, SquareVerifier.address);
    });
};
