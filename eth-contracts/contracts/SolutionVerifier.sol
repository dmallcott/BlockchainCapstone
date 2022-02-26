// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SquareVerifier.sol";
import "./CapstoneToken.sol";

contract SolutionVerifier is CapstoneToken {
    struct Solution {
        uint256 solutionIndex;
        address solutionAddress;
        bool solutionExists;
        bool minted;
    }

    SquareVerifier private verifierContract;

    uint256 public numberOfSolutions = 0;
    mapping(bytes32 => Solution) public solutions;

    event SolutionAdded(uint256 solutionIndex, address solutionAddress);
    event SolutionMinted(uint256 solutionIndex);

    constructor(address verifierAddress) CapstoneToken() {
        verifierContract = SquareVerifier(verifierAddress);
    }

    function addSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        bytes32 solutionHash = keccak256(abi.encodePacked(input[0], input[1]));
        require(
            solutions[solutionHash].solutionExists == false,
            "Solution exists already"
        );

        bool verified = verifierContract.verifyTx(a, b, c, input);
        require(verified, "Solution could not be verified");

        solutions[solutionHash] = Solution(
            numberOfSolutions,
            msg.sender,
            true,
            false
        );

        emit SolutionAdded(numberOfSolutions, msg.sender);
        numberOfSolutions += 1;
    }

    function mint(
        uint256 input1,
        uint256 input2,
        address to
    ) public {
        bytes32 solutionHash = keccak256(abi.encodePacked(input1, input2));

        require(
            solutions[solutionHash].solutionExists == true,
            "No solution found"
        );
        require(
            solutions[solutionHash].minted == false,
            "Token already minted"
        );
        require(
            solutions[solutionHash].solutionAddress == to,
            "Can't use another address' solution"
        );

        uint256 index = solutions[solutionHash].solutionIndex;
        
        super.mint(to, index);
        solutions[solutionHash].minted = true;

        emit SolutionMinted(index);
    }
}