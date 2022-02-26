var SquareVerifier = artifacts.require("SquareVerifier");
var SolutionVerifier = artifacts.require("SolutionVerifier");
const proof = require('../../square/proof.json')
const truffleAssert = require('truffle-assertions');


contract('SolutionVerifier Tests', async (accounts) => {

    const mainAddress = accounts[0];
    const anotherAddress = accounts[1];

    var contract;

    before('setup contract', async () => {
        let square = await SquareVerifier.new();
        contract = await SolutionVerifier.new(square.address);
    });

    it(`Can add solution with correct inputs`, async function () {
        truffleAssert.eventEmitted(await contract.addSolution(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs), 'SolutionAdded', (ev) => {
            return ev.solutionIndex == 0 && ev.solutionAddress == mainAddress;
        });
    });

    it(`Can't add same solution twice`, async function () {
        await truffleAssert.reverts(contract.addSolution(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs));
    });

    it(`Can't mint someone else's solution`, async function () {
        await truffleAssert.reverts(
            contract.mint(proof.inputs[0], proof.inputs[1], anotherAddress)
        );
    });

    it(`Can mint your solution`, async function () {
        truffleAssert.eventEmitted(await contract.mint(proof.inputs[0], proof.inputs[1], mainAddress), 'SolutionMinted', (ev) => {
            return ev.solutionIndex == 0;
        });
    });

    it(`Can't mint same solution twice`, async function () {
        await truffleAssert.reverts(
            contract.mint(proof.inputs[0], proof.inputs[1], mainAddress)
        );
    });

});