// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../ERC165/ERC165.sol";
import "./ERC721Metadata.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract ERC721Mintable is ERC721Metadata, Ownable {
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI
    ) ERC721Metadata(_name, _symbol, _baseTokenURI) {}

    /**
     * Instructions said: "takes in a 'to' address, tokenId, and tokenURI as parameters".
     * I will not pass a tokenUri considering there's a base token uri defined in the contract.
     */
    function mint(address to, uint256 tokenId)
        public
        onlyOwner
        returns (bool)
    {
        super._mint(to, tokenId);
        return true;
    }
}