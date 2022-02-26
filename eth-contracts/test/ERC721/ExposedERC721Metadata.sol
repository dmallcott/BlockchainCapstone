// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../contracts/ERC721/ERC721Metadata.sol";

contract ExposedERC721Metadata is ERC721Metadata {
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI
    ) ERC721Metadata(_name, _symbol, _baseTokenURI) {}

    function exposed_mint(address to, uint256 tokenId) public {
        return _mint(to, tokenId);
    }
}
