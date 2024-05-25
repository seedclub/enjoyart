// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Enjoy1155 is ERC1155, Ownable, ERC1155Supply {

    string public name = "Enjoy Only";
    string public symbol = "$Enjoy";
    // user can only mint once
    mapping(address => bool) public minted;

    constructor(address initialOwner) ERC1155("https://amber-late-bug-27.mypinata.cloud/ipfs/QmVzJR36LK6Ma7TY3AVEf94VDHk3mX7V7dWKnAZuSWssWP/{id}.json") Ownable(initialOwner) {
        _mint(msg.sender, 1, 1, "");
        _mint(msg.sender, 2, 1, "");
        _mint(msg.sender, 3, 1, "");
        _mint(msg.sender, 4, 1, "");
        _mint(msg.sender, 5, 1, "");
        _mint(msg.sender, 6, 1, "");
        _mint(msg.sender, 7, 1, "");
        _mint(msg.sender, 8, 1, "");
        _mint(msg.sender, 9, 1, "");
        _mint(msg.sender, 10, 1, "");
        _mint(msg.sender, 11, 1, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        require(!minted[account], "Already minted!");
        minted[account] = true;
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}