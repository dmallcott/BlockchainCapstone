// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721/ERC721Mintable.sol";

contract CapstoneToken is ERC721Mintable {
        
    string constant tokenName = "Udacity Capstone";
    string constant tokenSymbol = "UDC";
    string constant tokenUri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    constructor() ERC721Mintable(tokenName, tokenSymbol, tokenUri) {}
}
