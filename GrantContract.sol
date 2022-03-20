pragma solidity ^0.4.25;


contract GrantContract {

    uint public base;
    uint public totalGap;
    address public Owner;

    event IsCalled(address _from, uint _time, uint _fine);

    struct Misconduct {
        address emrRequester;
        address emrOwner;
        string emr;
        string response;
        string misconduct;
        uint time;
        uint fine;
    }

    mapping (address => Misconduct[]) public misconductTable;

    constructor(uint _base, uint _totalgap) public {
        base = _base;
        totalGap = _totalgap;
        Owner = msg.sender;
    }

    function misconductCheck(address _emrRequester, address _emrOwner, string _emr, string _response,
    string _misconduct, uint _time)
    public returns (uint fine) {
        uint length = misconductTable[_emrRequester].length + 1;
        uint n = (length/totalGap) ** 2;
        fine = base**n;
        misconductTable[_emrRequester].push(Misconduct
        (_emrRequester, _emrOwner, _emr, _response, _misconduct, _time, fine));
        emit IsCalled(msg.sender, _time, fine);
    }

    function getrecentMisconduct(address _key) public constant returns (address _emrRequester, address _emrOwner,
        string _res, string _response, string _misconduct, uint _time) {
        uint recent = misconductTable[_key].length - 1;
        _emrRequester = misconductTable[_key][recent].emrRequester;
        _emrOwner = misconductTable[_key][recent].emrOwner;
        _res = misconductTable[_key][recent].emr;
        _response = misconductTable[_key][recent].response;
        _misconduct = misconductTable[_key][recent].misconduct;
        _time = misconductTable[_key][recent].time;
    }

    function selfDestruct() public {
        if (msg.sender == Owner) {
            selfdestruct(this);
        }
    }
}
