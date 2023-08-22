// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DocumentManagement {
  
  struct File {
     string hash; 
     string fileType;
     string fileName;
     uint256 timestamp;
  }
  
  struct Access {
     address user; 
     bool access; // true or false
  }
  
  mapping(address => File[]) files;
  mapping(address => mapping(address => bool)) ownership;
  mapping(address => Access[]) accessList;
  mapping(address => mapping(address => bool)) previousData;

  function addFile(string memory hash, string memory fileType, string memory fileName) external {
      files[msg.sender].push(File(hash, fileType, fileName, block.timestamp));
  }

  function allow(address user) external {
      ownership[msg.sender][user] = true; 
      if (previousData[msg.sender][user]) {
         for (uint i = 0; i < accessList[msg.sender].length; i++) {
             if (accessList[msg.sender][i].user == user) {
                  accessList[msg.sender][i].access = true; 
             }
         }
      } else {
          accessList[msg.sender].push(Access(user, true));  
          previousData[msg.sender][user] = true;  
      }
  }
  
  function disallow(address user) public {
      ownership[msg.sender][user] = false;
      for (uint i = 0; i < accessList[msg.sender].length; i++) {
          if (accessList[msg.sender][i].user == user) { 
              accessList[msg.sender][i].access = false;  
          }
      }
  }

  function getFileList(address user) external view returns (File[] memory) {
      require(user == msg.sender || ownership[user][msg.sender], "You don't have access");
      return files[user];
  }

  function shareAccess() public view returns (Access[] memory) {
      return accessList[msg.sender];
  }
}
