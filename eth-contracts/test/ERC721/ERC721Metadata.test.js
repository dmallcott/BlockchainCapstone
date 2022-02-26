var ERC721Metadata = artifacts.require("ExposedERC721Metadata");

const truffleAssert = require('truffle-assertions');

contract('ERC721Metadata Tests', async (accounts) => {

    const contractOwner = accounts[0];
    const tokenName = "Test token";
    const tokenSymbol = "TEST";
    const tokenBaseUri = "https://test.com/"
    const tokenId = 1;

    var contract;

    before('setup contract', async () => {
        contract = await ERC721Metadata.new(tokenName, tokenSymbol, tokenBaseUri);
    });

    it(`Can't get URI for non-existant token`, async function () {
        await truffleAssert.reverts(contract.tokenURI(tokenId));
    });

    it(`Can mint token`, async function () {
        truffleAssert.eventEmitted(await contract.exposed_mint(contractOwner, tokenId), 'Transfer', (ev) => {
            return ev.to == contractOwner && ev.tokenId == tokenId;
        });
    });

    it(`Can get URI for minted tokens`, async function () {
        let result = await contract.tokenURI(tokenId);
        assert.equal(tokenBaseUri + tokenId, result)
    });
});