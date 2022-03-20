pragma solidity ^0.4.25;


contract Register {

    struct Method {
        string contractName;
        address emrRequester;
        address emrOwner;
        address deployerOfcontrt;
        address contractAddress;
        bytes abi;
    }

    mapping (bytes32 => Method) public activityTable;

    function stringToBytes32(string _origin) public pure returns (bytes32) {
        bytes memory interimBytes = bytes(_origin);
      //https://ethereum.stackexchange.com/questions/9142/how-to-convert-a-string-to-bytes32
      //for more help
        bytes32 convertedBytes;
        if (0 == interimBytes.length) {
            return 0x0;
        }
        assembly {
        convertedBytes := mload(add(_origin, 32))
    }
        return convertedBytes;
    }

    function methodRegister(string _methodName, string _contractName,
    address _emrRequester, address _emrOwner, address _deployerOfcontrt, address _contractAddress, bytes _abi) public {
        bytes32 latestActivity = stringToBytes32(_methodName);
        activityTable[latestActivity].contractName = _contractName;
        activityTable[latestActivity].emrRequester = _emrRequester;
        activityTable[latestActivity].emrOwner = _emrOwner;
        activityTable[latestActivity].deployerOfcontrt = _deployerOfcontrt;
        activityTable[latestActivity].contractAddress = _contractAddress;
        activityTable[latestActivity].abi = _abi;
    }

    function changeMethodContractName(string _methodName, string _contractName) public {
        bytes32 activity = stringToBytes32(_methodName);
        activityTable[activity].contractName = _contractName;
    }

    function changeContractAddress(string _methodName, address _contractAddress) public {
        bytes32 activity = stringToBytes32(_methodName);
        activityTable[activity].contractAddress = _contractAddress;
    }

    function changeMethodAbi(string _methodName, bytes _abi) public {
        bytes32 activity = stringToBytes32(_methodName);
        activityTable[activity].abi = _abi;
    }

    function changeMethodName(string _lastName, string _newName) public {
        bytes32 lastActivity = stringToBytes32(_lastName);
        bytes32 latestActivity = stringToBytes32(_newName);
        activityTable[latestActivity].contractName = activityTable[lastActivity].contractName;
        activityTable[latestActivity].emrRequester = activityTable[lastActivity].emrRequester;
        activityTable[latestActivity].emrOwner = activityTable[lastActivity].emrOwner;
        activityTable[latestActivity].deployerOfcontrt = activityTable[lastActivity].deployerOfcontrt;
        activityTable[latestActivity].contractAddress = activityTable[lastActivity].contractAddress;
        activityTable[latestActivity].abi = activityTable[lastActivity].abi;
        delete activityTable[lastActivity];
    }

    function removeMethod(string _name) public {
        delete activityTable[stringToBytes32(_name)];
    }

    function fetchContractAddress(string _methodName) public view returns (address _contractAddress) {
        bytes32 activity = stringToBytes32(_methodName);
        _contractAddress = activityTable[activity].contractAddress;
    }

    function fetchContractAbi(string _methodName) public view returns (bytes _abi) {
        bytes32 activity = stringToBytes32(_methodName);
        _abi = activityTable[activity].abi;
    }
}
