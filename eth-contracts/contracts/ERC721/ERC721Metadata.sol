// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Enumerable.sol";
import "../StringUtils.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ERC721Metadata is ERC721Enumerable {

    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;

    string name;
    string symbol;
    string baseTokenURI;
    
    mapping(uint256 => string) private _tokenURIs;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI
    ) {
        name = _name;
        symbol = _symbol;
        baseTokenURI = _baseTokenURI;

        _registerInterface(_INTERFACE_ID_ERC721_METADATA);
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId));
        return _tokenURIs[tokenId];
    }

    function _setTokenURI(uint256 tokenId) internal {
        require(_exists(tokenId));
        string memory id = Strings.toString(tokenId);
        string memory url = StringUtils.concat(baseTokenURI, id);
        
        _tokenURIs[tokenId] = url;
    }

    function _mint(address to, uint256 tokenId) override internal {
        super._mint(to, tokenId);

        _setTokenURI(tokenId);
    }
}
