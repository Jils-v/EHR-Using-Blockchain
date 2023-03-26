// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <=0.9.0;

contract ehr{


    struct patientDetails{
        address publicAddress;
        string name;
        uint64 phone;
        string mail;
        string residentAddress;
        address[] readAccess;
        address[] writeAccess;
        string[] Disease;
        string[] Treatment;
        string[] TreatmentYear;
    }

    struct hospitalDetails{
        address publicAddress;
        string name;
        uint64 phone;
        string mail;
        string hospitalAddress;
        address[] readAccess;
        address[] writeAccess;
    }

    struct hospitalDetails2{
        address publicAddress;
        string name;
        uint64 phone;
        string mail;
        string hospitalAddress;
    }

    address admin = 0x5395ddE0d1E9FE9aa557369bF0DF7370e84c12F2;
    mapping (address => patientDetails) patient;
    mapping (address => hospitalDetails) hospital;
    hospitalDetails2[] hospitals;

    function registerPatient(address _publicAddress, string memory _name, uint64 _phone, string memory _mail, string memory _residentAddress) public{
        address[] memory _readAccess;
        address[] memory _writeAccess;
        string[] memory _Diesease;
        string[] memory _Treatment;
        string[] memory _TreatmentYear;
        patient[_publicAddress] = patientDetails(_publicAddress,_name, _phone, _mail, _residentAddress, _readAccess, _writeAccess, _Diesease, _Treatment, _TreatmentYear);
    }

    function registerhospital(address _publicAddress,  string memory _name, uint64 _phone, string memory _mail, string memory _hospitalAddress) public{
        address[] memory _readAccess;
        address[] memory _writeAccess;
        hospital[_publicAddress] = hospitalDetails(_publicAddress, _name, _phone, _mail, _hospitalAddress, _readAccess, _writeAccess);
        hospitals.push(hospitalDetails2(_publicAddress, _name, _phone, _mail, _hospitalAddress));
    }

    function updatePatient(address _publicAddress, string memory _name, uint64 _phone, string memory _mail, string memory _residentAddress) public {
        patientDetails storage pd = patient[_publicAddress];
        pd.name = _name;
        pd.phone = _phone;
        pd.mail = _mail;
        pd.residentAddress = _residentAddress;
    }

    function addRecord(address _publicAddress, string[] memory _disease, string[] memory _treatment, string[] memory _treatmentYear) public {
            patientDetails storage pd = patient[_publicAddress];
            pd.Disease = _disease;
            pd.Treatment = _treatment;
            pd.TreatmentYear = _treatmentYear;
        }

    function updateRecord(address _publicAddress, string[] memory _disease, string[] memory _treatment, string[] memory _treatmentYear) public {
            patientDetails storage pd = patient[_publicAddress];
            pd.Disease = _disease;
            pd.Treatment = _treatment;
            pd.TreatmentYear = _treatmentYear;
        }

     function updatehospital(address _publicAddress,  string memory _name, uint64 _phone, string memory _mail, string memory _hospitalAddress) public{
        hospitalDetails storage dd = hospital[_publicAddress];
        dd.name = _name;
        dd.phone = _phone;
        dd.mail = _mail;
        dd.hospitalAddress = _hospitalAddress;
    }

    function check(address _publicAddress) public view returns(string memory)
    {
        string memory user = "none";
        if(_publicAddress == admin)
        {
            user = "admin";
        }
        if(!(keccak256(abi.encodePacked((patient[_publicAddress].name))) == keccak256(abi.encodePacked(("")))))
        {
            user = "patient";
        }
        if(!(keccak256(abi.encodePacked((hospital[_publicAddress].name))) == keccak256(abi.encodePacked(("")))))
        {
            user = "hospital";
        }
        return user;
    }

    function getAllHospital() public view returns(hospitalDetails2[] memory)
    {
        return hospitals;
    }

    function getPatientDetail(address _publicAddress) public view returns(patientDetails memory)
    {
        return patient[_publicAddress];
    }

     function getHospitalDetail(address _publicAddress) public view returns(hospitalDetails memory)
    {
        return hospital[_publicAddress];
    }

    function addAccess(address _patientAddress, address _hospitalAddress, bool access) public {
            if(access == true)
            {
                patientDetails storage pd_temp = patient[_patientAddress];
                pd_temp.writeAccess.push(_hospitalAddress);
                hospitalDetails storage pd_temp2 = hospital[_hospitalAddress];
                pd_temp2.writeAccess.push(_patientAddress);
            }
            else if(access == false)
            {
                patientDetails storage pd_temp = patient[_patientAddress];
                pd_temp.readAccess.push(_hospitalAddress);
                hospitalDetails storage pd_temp2 = hospital[_hospitalAddress];
                pd_temp2.readAccess.push(_patientAddress);
            }
    }
    
        function revokeAccess(address _patientAddress, address _hospitalAddress, bool access) public{
            if(access == true)
            {
                address[] storage pd_temp5 = patient[_patientAddress].writeAccess;
                uint index;
                for(uint i=0; i<pd_temp5.length; i++)
                {
                    if(pd_temp5[i] == _hospitalAddress)
                    {
                        index = i;
                        break;
                    }
                }
                delete pd_temp5[index];

                address[] storage pd_temp6 = hospital[_hospitalAddress].writeAccess;
                for(uint i=0; i<pd_temp6.length; i++)
                {
                    if(pd_temp6[i] == _patientAddress)
                    {
                        index = i;
                        break;
                    }
                }
                delete pd_temp6[index];
            }
            else if(access == false)
            {
                address[] storage pd_temp5 = patient[_patientAddress].readAccess;
                uint index;
                for(uint i=0; i<pd_temp5.length; i++)
                {
                    if(pd_temp5[i] == _hospitalAddress)
                    {
                        index = i;
                        break;
                    }
                }
                delete pd_temp5[index];

                address[] storage pd_temp6 = hospital[_hospitalAddress].readAccess;
                for(uint i=0; i<pd_temp6.length; i++)
                {
                    if(pd_temp6[i] == _patientAddress)
                    {
                        index = i;
                        break;
                    }
                }
                delete pd_temp6[index];
            }
        }
}