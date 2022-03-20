var _base = 2 ;
var _totalgap = 3 ;
var grantcontractContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"totalGap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"misconductTable","outputs":[{"name":"emrRequester","type":"address"},{"name":"emrOwner","type":"address"},{"name":"emr","type":"string"},{"name":"response","type":"string"},{"name":"misconduct","type":"string"},{"name":"time","type":"uint256"},{"name":"fine","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"base","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"address"}],"name":"getrecentMisconduct","outputs":[{"name":"_emrRequester","type":"address"},{"name":"_emrOwner","type":"address"},{"name":"_res","type":"string"},{"name":"_response","type":"string"},{"name":"_misconduct","type":"string"},{"name":"_time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"selfDestruct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_emrRequester","type":"address"},{"name":"_emrOwner","type":"address"},{"name":"_emr","type":"string"},{"name":"_response","type":"string"},{"name":"_misconduct","type":"string"},{"name":"_time","type":"uint256"}],"name":"misconductCheck","outputs":[{"name":"fine","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"Owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_base","type":"uint256"},{"name":"_totalgap","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_time","type":"uint256"},{"indexed":false,"name":"_fine","type":"uint256"}],"name":"IsCalled","type":"event"}]);
var grantcontract = grantcontractContract.new(
   _base,
   _totalgap,
   {
     from: web3.eth.accounts[0], 
     data: '0x608060405234801561001057600080fd5b5060405160408061127a8339810180604052810190808051906020019092919080519060200190929190505050816000819055508060018190555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506111dd8061009d6000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806338914216146100885780634fec2f97146100b35780635001f3b5146102c557806353feca53146102f05780639cb8a26a146104f15780639e2fddbd14610508578063b4a99a4e1461065b575b600080fd5b34801561009457600080fd5b5061009d6106b2565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100fe600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106b8565b604051808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018060200180602001868152602001858152602001848103845289818151815260200191508051906020019080838360005b838110156101b657808201518184015260208101905061019b565b50505050905090810190601f1680156101e35780820380516001836020036101000a031916815260200191505b50848103835288818151815260200191508051906020019080838360005b8381101561021c578082015181840152602081019050610201565b50505050905090810190601f1680156102495780820380516001836020036101000a031916815260200191505b50848103825287818151815260200191508051906020019080838360005b83811015610282578082015181840152602081019050610267565b50505050905090810190601f1680156102af5780820380516001836020036101000a031916815260200191505b509a505050505050505050505060405180910390f35b3480156102d157600080fd5b506102da61091e565b6040518082815260200191505060405180910390f35b3480156102fc57600080fd5b50610331600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610924565b604051808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018060200180602001858152602001848103845288818151815260200191508051906020019080838360005b838110156103e35780820151818401526020810190506103c8565b50505050905090810190601f1680156104105780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b8381101561044957808201518184015260208101905061042e565b50505050905090810190601f1680156104765780820380516001836020036101000a031916815260200191505b50848103825286818151815260200191508051906020019080838360005b838110156104af578082015181840152602081019050610494565b50505050905090810190601f1680156104dc5780820380516001836020036101000a031916815260200191505b50995050505050505050505060405180910390f35b3480156104fd57600080fd5b50610506610dc9565b005b34801561051457600080fd5b50610645600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929080359060200190929190505050610e3a565b6040518082815260200191505060405180910390f35b34801561066757600080fd5b506106706110e6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60015481565b6003602052816000526040600020818154811015156106d357fe5b9060005260206000209060070201600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107cc5780601f106107a1576101008083540402835291602001916107cc565b820191906000526020600020905b8154815290600101906020018083116107af57829003601f168201915b505050505090806003018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561086a5780601f1061083f5761010080835404028352916020019161086a565b820191906000526020600020905b81548152906001019060200180831161084d57829003601f168201915b505050505090806004018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109085780601f106108dd57610100808354040283529160200191610908565b820191906000526020600020905b8154815290600101906020018083116108eb57829003601f168201915b5050505050908060050154908060060154905087565b60005481565b60008060608060606000806001600360008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050039050600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020818154811015156109c357fe5b906000526020600020906007020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169650600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081815481101515610a4357fe5b906000526020600020906007020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169550600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081815481101515610ac357fe5b90600052602060002090600702016002018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b685780601f10610b3d57610100808354040283529160200191610b68565b820191906000526020600020905b815481529060010190602001808311610b4b57829003601f168201915b50505050509450600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081815481101515610bbb57fe5b90600052602060002090600702016003018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c605780601f10610c3557610100808354040283529160200191610c60565b820191906000526020600020905b815481529060010190602001808311610c4357829003601f168201915b50505050509350600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081815481101515610cb357fe5b90600052602060002090600702016004018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d585780601f10610d2d57610100808354040283529160200191610d58565b820191906000526020600020905b815481529060010190602001808311610d3b57829003601f168201915b50505050509250600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081815481101515610dab57fe5b90600052602060002090600702016005015491505091939550919395565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610e38573073ffffffffffffffffffffffffffffffffffffffff16ff5b565b60008060006001600360008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050019150600260015483811515610e9657fe5b040a9050806000540a9250600360008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060e0604051908101604052808b73ffffffffffffffffffffffffffffffffffffffff1681526020018a73ffffffffffffffffffffffffffffffffffffffff168152602001898152602001888152602001878152602001868152602001858152509080600181540180825580915050906001820390600052602060002090600702016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604082015181600201908051906020019061101592919061110c565b50606082015181600301908051906020019061103292919061110c565b50608082015181600401908051906020019061104f92919061110c565b5060a0820151816005015560c082015181600601555050507f06d5d61237d9b79a4d3511726862c64aa363e0a3e0057d37f98898efb1b021b5338585604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a150509695505050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061114d57805160ff191683800117855561117b565b8280016001018555821561117b579182015b8281111561117a57825182559160200191906001019061115f565b5b509050611188919061118c565b5090565b6111ae91905b808211156111aa576000816000905550600101611192565b5090565b905600a165627a7a7230582091884f85784f53615543808dcba239433909e486d53ea0a04a47f1561d0213e00029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 });