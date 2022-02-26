var ERC721 = artifacts.require("ExposedERC721");
const truffleAssert = require('truffle-assertions');

contract('ERC721 Tests', async (accounts) => {

    const contractOwner = accounts[0];
    const approvedAddress = accounts[1];
    const nextTokenOwner = accounts[2];
    const tokenId = 1;
    const zeroAddress = "0x0000000000000000000000000000000000000000";

    var contract;

    before('setup contract', async () => {
        contract = await ERC721.new();
    });

    it(`Can't mint zero address`, async function () {
        await truffleAssert.reverts(contract.exposed_mint(zeroAddress, tokenId));
    });

    it(`Can mint`, async function () {
        truffleAssert.eventEmitted(await contract.exposed_mint(contractOwner, tokenId), 'Transfer', (ev) => {
            return ev.to == contractOwner && ev.tokenId == tokenId;
        });
    });

    it(`Can't mint same token twice`, async function () {
        await truffleAssert.reverts(contract.exposed_mint(contractOwner, tokenId));
    });

    it(`Can assert token balance`, async function () {
        assert.equal(await contract.balanceOf(contractOwner), 1)
    });

    it(`Can assert token owner`, async function () {
        assert.equal(await contract.ownerOf(tokenId), contractOwner)
    });

    it(`Can't approve myself`, async function () {
        await truffleAssert.reverts(contract.approve(contractOwner, tokenId));
    });

    it(`Can approve`, async function () {
        truffleAssert.eventEmitted(await contract.approve(approvedAddress, tokenId), 'Approval', (ev) => {
            return ev.owner == contractOwner && ev.approved == approvedAddress && ev.tokenId == tokenId;
        });
    });

    it(`Can assert token approval`, async function () {
        assert.equal(await contract.getApproved(tokenId), approvedAddress)
    });

    it(`Can't transfer token I don't own`, async function () {
        let anyone = accounts[3];

        await truffleAssert.reverts(contract.exposed_transferFrom(nextTokenOwner, anyone, tokenId));
    });

    it(`Can't transfer to zero address`, async function () {
        await truffleAssert.reverts(contract.exposed_transferFrom(contractOwner, zeroAddress, tokenId));
    });

    it(`Can transfer token`, async function () {
        truffleAssert.eventEmitted(await contract.exposed_transferFrom(contractOwner, nextTokenOwner, tokenId), 'Transfer', (ev) => {
            return ev.from == contractOwner && ev.to == nextTokenOwner && ev.tokenId == tokenId;
        });
    });
});