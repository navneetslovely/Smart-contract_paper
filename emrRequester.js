var Web3 = require('web3');
var net = require ('net');
var readline = require('readline');
var web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc", net));

// address of emr requester
var emrRequester = "0x08196cec21c74c3972bb69175b23e6d388c728d3"";
 //address of register contract
 var registerContractAddress = "0x6b9c19DDd61fFccf5a3c5B328E0C717678eE27B5";
 //here paste your register contract Abi
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
];

 var methodName = "method1";
 var registerContract = web3.eth.contract(registerContractAbi).at(registerContractAddress);
 var AccessProviderAddress =  registerContract.fetchContractAddress(methodName);
 var AccessProviderAbiBytes = registerContract.fetchContractAbi(methodName);
 var AccessProviderAbi = JSON.parse(web3.toAscii(AccessProviderAbiBytes));
 var myAccessProvider = web3.eth.contract(AccessProviderAbi).at(AccessProviderAddress);

 var setEvent = myAccessProvider.Grantaccess({_from: emrRequester},{from: 'latest'});
 var previousTxhash = 0;
 var currentTXhash = 0;

 var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
  });

 rl.setPrompt('Send request for EMR?(yes/no)');
 rl.prompt();

 rl.on('line', function(answer)  {
	 if ('yes' == answer) {
        var currentTime = new Date().getTime()/1000;
        currentTXhash = myAccessProvider.getAccess.sendTransaction("EMR of Navneet Singh","write", currentTime, {
          from:web3.eth.accounts[0], gas:3000000 });

          setEvent.watch(function(error, result){
            if (!error){
              if (previousTxhash != result.transactionHash && currentTXhash == result.transactionHash){
                console.log("Contract: "+result.address);
                console.log("Block Number: " + result.blockNumber);
                console.log("Tx Hash: "+result.transactionHash);
                console.log("Time :"+ result.args._time.toNumber());
                console.log("Block Hash: "+result.blockHash);
                console.log("Message: "+ result.args._errormsg);
                console.log("Result :"+result.args._errormsg);
                        if(result.args._fine > 0){
                        console.log("Requests are blocked for "+ result.args._result + "minutes!");
                        }
                        console.log('\n');
                        previousTxhash = result.transactionHash;
                        rl.prompt();

              }
            }
          });
   } else {
       console.log("we are on blockchain of akanksha");
       rl.prompt();
   }
 });

 rl.on('close', function() {
             console.log('Have a great day!');
          process.exit(0);
      });
