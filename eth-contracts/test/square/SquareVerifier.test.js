var SquareVerifier = artifacts.require("SquareVerifier");
const proof = require('../../../square/proof.json')

contract('SquareVerifier Tests', async (accounts) => {

    var contract;

    before('setup contract', async () => {
        contract = await SquareVerifier.new();
    });

    it(`Contract can be verified with proof`, async function () {
        let result = await contract.verifyTx(proof.proof, proof.inputs);

        assert.equal(true, result)
    });


    it(`Contract can't be verified with incorrect proof`, async function () {
        let incorrectInputs = [
            "0x000000000000000000000000000000000000000000000000000000012341bba1",
            "0x0000000000000000000000000000000000000000000000000000000000001234"
          ]
        let result = await contract.verifyTx(proof.proof, incorrectInputs);

        assert.equal(false, result)
    });
});