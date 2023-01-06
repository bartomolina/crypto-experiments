// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

//  _                _                        _ _                   _   _     
// | |              | |                      | (_)                 | | | |    
// | |__   __ _ _ __| |_ ___  _ __ ___   ___ | |_ _ __   __ _   ___| |_| |__  
// | '_ \ / _` | '__| __/ _ \| '_ ` _ \ / _ \| | | '_ \ / _` | / _ \ __| '_ \ 
// | |_) | (_| | |  | || (_) | | | | | | (_) | | | | | | (_| ||  __/ |_| | | |
// |_.__/ \__,_|_|   \__\___/|_| |_| |_|\___/|_|_|_| |_|\__,_(_)___|\__|_| |_|

contract TestContract {
    string public message = "Hello world!";
    string public message2 = "gm!";

    event MessageSet(string _message);

    constructor() {
    }

    function setMessage(string calldata _message) external {
        message = _message;
        emit MessageSet(_message);
    }

    function readMessage() public view returns(string memory) {
        return message;
    }

    function readMessage2() public view returns(string memory) {
        return message2;
    }
}
