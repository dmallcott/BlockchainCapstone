// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../contracts/ERC721/ERC721.sol";

contract ExposedERC721 is ERC721 {

    function exposed_mint(address to, uint256 tokenId) public {
        return _mint(to, tokenId);
    }

    function exposed_transferFrom(address from, address to, uint256 tokenId) public {
        return _transferFrom(from, to, tokenId);
    }
}