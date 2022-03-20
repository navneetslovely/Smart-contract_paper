pragma solidity ^0.4.25;


contract AccessProvider {


    address public Owner;
    address public emrRequester;// address of the requster of EMR.
    address public emrOwner;
    GrantContract public grnt;

    event Grantaccess(address indexed _from, string _errormsg, bool _result, uint _time, uint _fine);

    struct misConduct {
        string emr;
        string response;
        string misconduct;
        uint time;
        uint fine;
    }

    struct conductElement {
        uint timeofUnblock;
        misConduct[] miscon;
    }

    struct guidelineElement {
        string permission;
        uint minGap;
        uint toLR;
        uint noFR;
        uint limitOfmisconduct;
        uint32 error;
        bool result;
        bool duplicateCheck;
    }

    mapping(bytes32=> mapping( bytes32=> guidelineElement)) public guidelines;
    mapping (bytes32=> conductElement) public conducts;

    constructor(address _emrRequester) public {
        Owner = msg.sender;
        emrOwner = msg.sender;
        emrRequester = _emrRequester;
    }

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

    function setGrnt(address _grnt) public {
        if (Owner == msg.sender) {
            grnt = GrantContract(_grnt);
        }else
            revert();
    }

    function setGuidelines(string _emrfile, string _response,
    string _permission, uint _gap, uint _limitOfmisconduct) public {
        bytes32 emrfile = stringToBytes32(_emrfile);
        bytes32 response = stringToBytes32(_response);
        if (msg.sender == Owner) {
            if (guidelines[emrfile][response].duplicateCheck) revert();
        else {
            guidelines[emrfile][response].permission = _permission;
            guidelines[emrfile][response].minGap = _gap;
            guidelines[emrfile][response].limitOfmisconduct = _limitOfmisconduct;
            guidelines[emrfile][response].toLR = 0;
            guidelines[emrfile][response].noFR = 0;
            guidelines[emrfile][response].result = false;
            conducts[emrfile].timeofUnblock = 0;
        }
        }else
            revert();
    }

    function getGuidelines( string _emrfile, string _response) public view returns (string _permission,
    uint _gap, uint _limitOfmisconduct, uint _toLR, uint _noFR, bool _rslt, uint32 _errorcode) {
        bytes32 emrfile = stringToBytes32(_emrfile);
        bytes32 response = stringToBytes32(_response);
        if (guidelines[emrfile][response].duplicateCheck) {
            _permission = guidelines[emrfile][response].permission;
            _gap = guidelines[emrfile][response].minGap;
            _limitOfmisconduct = guidelines[emrfile][response].limitOfmisconduct;
            _toLR = guidelines[emrfile][response].toLR;
            _noFR = guidelines[emrfile][response].noFR;
            _rslt = guidelines[emrfile][response].result;
            _errorcode = guidelines[emrfile][response].error;
        }else
            revert();
    }

    function updateGuidelines(string _emrfile, string _response, string _newPermission) public {
        bytes32 emrfile = stringToBytes32(_emrfile);
        bytes32 response = stringToBytes32(_response);
        if (guidelines[emrfile][response].duplicateCheck) {
            guidelines[emrfile][response].permission = _newPermission;
        }else
            revert();
    }

    function changeGap(string _emrfile, string _response, uint _newminGap) public {
        bytes32 emrfile = stringToBytes32(_emrfile);
        bytes32 response = stringToBytes32(_response);
        if (guidelines[emrfile][response].duplicateCheck) {
            guidelines[emrfile][response].minGap = _newminGap;
        }else
            revert();
    }

    function  changeLimitOfmisconduct(string _emrfile, string _response, uint _newlimitOfmisconduct ) public {
        bytes32 emrfile = stringToBytes32(_emrfile);
        bytes32 response = stringToBytes32(_response);
        if (guidelines[emrfile][response].duplicateCheck) {
            guidelines[emrfile][response].limitOfmisconduct = _newlimitOfmisconduct;
        } else
            revert();
    }

    function deteleGuidelines(string _emrfile, string _response) public {
        bytes32 emrfile = stringToBytes32(_emrfile);
        bytes32 response = stringToBytes32(_response);
        if (msg.sender == Owner) {
            if (guidelines[emrfile][response].duplicateCheck) {
                delete guidelines[emrfile][response];
            }else
                revert();
        } else
            revert();
    }

    function getAccess(string _emrfile, string _response,
    uint _time) public {
        bool checkguidelines = false;
        bool checkconduct = true;
        uint32 errorcode = 0;
        uint fine = 0;
        bytes32 cypto = stringToBytes32("allow");
        if (msg.sender == emrRequester) {
            bytes32 emrfile = stringToBytes32(_emrfile);
            bytes32 response = stringToBytes32(_response);
            if (conducts[emrfile].timeofUnblock >= _time) {
                errorcode = 1001;
            }else {
                if (conducts[emrfile].timeofUnblock > 0) {
                    conducts[emrfile].timeofUnblock = 0;
                    guidelines[emrfile][response].noFR = 0;
                    guidelines[emrfile][response].toLR = 0;
                }
                if (cypto == keccak256(abi.encodePacked(guidelines[emrfile][response].permission))) {
                    checkguidelines = true;
                }else {
                    checkguidelines = false;
                }
                if (_time - guidelines[emrfile][response].toLR <= guidelines[emrfile][response].minGap) {
                    guidelines[emrfile][response].noFR++;
                    if (guidelines[emrfile][response].noFR >= guidelines[emrfile][response].limitOfmisconduct) {
                        fine = grnt.misconductCheck(emrRequester, emrOwner, _emrfile, _response,
                        "too frequent access!", _time);
                        checkconduct = false;
                        conducts[emrfile].timeofUnblock = _time + fine * 2 minutes ** 2;
                        conducts[emrfile].miscon.push(misConduct(_emrfile, _response,
                        "too frequent access!", _time, fine));
                    }
                }  else {
                    guidelines[emrfile][response].noFR = 0;
                }
                if (!checkguidelines && checkconduct) errorcode = 1002;
                if (checkguidelines && !checkconduct) errorcode = 1003;
                if (!checkguidelines && !checkconduct) errorcode = 1004;
            }
            guidelines[emrfile][response].toLR = _time;
        }            else {
            errorcode = 1005;
        }
        guidelines[emrfile][response].result = checkguidelines && checkconduct;
        guidelines[emrfile][response].error = errorcode;
        if (errorcode == 1000) emit Grantaccess(msg.sender, "grant access", true, _time, fine);
        if (errorcode == 1001) emit Grantaccess(msg.sender, "reject", false, _time, fine);
        if (errorcode == 1002) emit Grantaccess(msg.sender, "static check error", false, _time, fine);
        if (errorcode == 1003) emit Grantaccess(msg.sender, "misconduct detected!", false, _time, fine);
        if (errorcode == 1004) emit Grantaccess(msg.sender, "Static scheck failed! and Misbehavior detected", false,
        _time, fine);
        if (errorcode == 1005) emit Grantaccess(msg.sender, "wrong object or subject",
        false, _time, fine);
    }

    function getTimeofUnblock(string _ermfile) public constant returns (uint _fine, uint _timeofUnblock) {
        bytes32 emrfile = stringToBytes32(_ermfile);
        _timeofUnblock = conducts[emrfile].timeofUnblock;
        uint li = conducts[emrfile].miscon.length;
        _fine = conducts[emrfile].miscon[li - 1].fine;
    }

    function deleteGetAccess() public {
      // executed for selfdestruct operation on contract to remove the code and strode of acc from blockchain.
        if (msg.sender == Owner) {
            selfdestruct(this);
        }
    }
}


contract GrantContract {


    function misconductCheck(address _emrRequester,
    address _emrOwner, string _emr, string _action, string misconduct, uint _time) public returns (uint);
}
