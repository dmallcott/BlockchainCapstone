var ERC721Mintable = artifacts.require("ERC721Mintable");
const truffleAssert = require('truffle-assertions');

contract('ERC721Mintable Tests', async (accounts) => {

    const contractOwner = accounts[0];
    const notOwner = accounts[1];
    const tokenName = "Test token";
    const tokenSymbol = "TEST";
    const tokenBaseUri = "https://test.com/"
    const tokenId = 1;

    var contract;

    before('setup contract', async () => {
        contract = await ERC721Mintable.new(tokenName, tokenSymbol, tokenBaseUri);
    });

    it(`Can't mint if I'm not the contract owner`, async function () {
        await truffleAssert.reverts(contract.mint(notOwner, tokenId, { from: notOwner }));
    });

    it(`Can mint token when I'm the contract owner`, async function () {
        truffleAssert.eventEmitted(await contract.mint(contractOwner, tokenId), 'Transfer', (ev) => {
            return ev.to == contractOwner && ev.tokenId == tokenId;
        });
    });
});