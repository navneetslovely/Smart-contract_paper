//var Web3 = require('web3');
// var net = require ('net');
// var web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc", net));

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 //address of register contract
var registerContractAddress = "0x6b9c19DDd61fFccf5a3c5B328E0C717678eE27B5";
//here abi of register contract
var registerContractAbi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "activityTable",
		"outputs": [
			{
				"name": "contractName",
				"type": "string"
			},
			{
				"name": "emrRequester",
				"type": "address"
			},
			{
				"name": "emrOwner",
				"type": "address"
			},
			{
				"name": "deployerOfcontrt",
				"type": "address"
			},
			{
				"name": "contractAddress",
				"type": "address"
			},
			{
				"name": "abi",
				"type": "bytes"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_methodName",
				"type": "string"
			},
			{
				"name": "_contractAddress",
				"type": "address"
			}
		],
		"name": "changeContractAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_methodName",
				"type": "string"
			}
		],
		"name": "fetchContractAddress",
		"outputs": [
			{
				"name": "_contractAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_methodName",
				"type": "string"
			},
			{
				"name": "_contractName",
				"type": "string"
			},
			{
				"name": "_emrRequester",
				"type": "address"
			},
			{
				"name": "_emrOwner",
				"type": "address"
			},
			{
				"name": "_deployerOfcontrt",
				"type": "address"
			},
			{
				"name": "_contractAddress",
				"type": "address"
			},
			{
				"name": "_abi",
				"type": "bytes"
			}
		],
		"name": "methodRegister",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_methodName",
				"type": "string"
			},
			{
				"name": "_contractName",
				"type": "string"
			}
		],
		"name": "changeMethodContractName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_lastName",
				"type": "string"
			},
			{
				"name": "_newName",
				"type": "string"
			}
		],
		"name": "changeMethodName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_methodName",
				"type": "string"
			}
		],
		"name": "fetchContractAbi",
		"outputs": [
			{
				"name": "_abi",
				"type": "bytes"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_origin",
				"type": "string"
			}
		],
		"name": "stringToBytes32",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_methodName",
				"type": "string"
			},
			{
				"name": "_abi",
				"type": "bytes"
			}
		],
		"name": "changeMethodAbi",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "removeMethod",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
var methodName = "Method1";
var registerContract = new web3.eth.Contract(registerContractAbi, registerContractAddress);
var AccessProviderAddress = registerContract.methods.fetchContractAddress(methodName);
var AccessProviderAbiBytes = registerContract.methods.fetchContractAbi(methodName);
var AccessProviderAbi = JSON.parse(web3.toAscii(AccessProviderAbiBytes));
var myAccessProvider = web3.eth.contract(AccessProviderAbi).at(AccessProviderAddress);

var setEvent = myAccessProvider.Grantaccess({fromBlock: 0 , toBlock: "latest"});

setEvent.watch(function (error, result) {
   if (!error) {
      console.log(result);
      console.log("Contract: "+ result.address);
      console.log("Block Number: "+ result.blockNumber);
      console.log("TX hash: "+result.transactionHash);
      console.log("Block Hash: "+result.blockHash);
      console.log("ERM Requester: "+ result.args._from);
      console.log("time: "+result.args._time.toNumber());
      console.log("Message: "+result.args._errormsg);
      console.log("Result: "+result.args._result);
      if (result.args._fine > 0) {
         console.log("Requests are bloced for "+ result.args._fine+ "minutes!");

      }
      console.log("\n");


   }
});
