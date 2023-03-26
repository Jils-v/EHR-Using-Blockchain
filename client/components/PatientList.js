import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { editpatientdata, setpatients } from "../store/slices/HospitalStore";
import AddRecord from "./AddRecord";
import List from "./List";

function PatientList({ Con }) {
  useEffect(() => {
    getlist();
  }, []);

  const [recordmodal, setrecordmodal] = useState(false);
  const [recordinfo, setrecordinfo] = useState({});

  const dispatch = useDispatch();
  const Contract = Con();
  const getlist = async () => {
    try {
      await data.hospitalDetail.ReadAccess.map(async (item) => {
        console.log("read", item);
        if (item != "0x0000000000000000000000000000000000000000") {
          const detail = await Contract.getPatientDetail(item);
          const data = {
            publicAddress: detail.publicAddress,
            name: detail.name,
            mail: detail.mail,
            residentAddress: detail.residentAddress,
            phone: Number(detail.phone),
            disease: detail.Disease,
            treatment: detail.Treatment,
            treatmentYear: detail.TreatmentYear,
            Access: false,
          };

          dispatch(setpatients(data));
        }
      });
      await data.hospitalDetail.WriteAccess.map(async (item) => {
        console.log("write", item);
        if (item != "0x0000000000000000000000000000000000000000") {
          const detail = await Contract.getPatientDetail(item);
          const data = {
            publicAddress: detail.publicAddress,
            name: detail.name,
            mail: detail.mail,
            residentAddress: detail.residentAddress,
            phone: Number(detail.phone),
            disease: detail.Disease,
            treatment: detail.Treatment,
            treatmentYear: detail.TreatmentYear,
            Access: true,
          };
          console.log(data);

          dispatch(setpatients(data));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const data = useSelector((state) => {
    return state.hospital;
  });
  console.log(data);

  return (
    <div className=" flex min-w-screen justify-center   ">
      {recordmodal ? (
        <div className="fixed top-48 ">
          <AddRecord
            Con={Con}
            setrecordmodal={setrecordmodal}
            recordinfo={recordinfo}
            setrecordinfo={setrecordinfo}
          />
        </div>
      ) : (
        ""
      )}
      <div className=" overflow-x-scroll    rounded-lg border border-gray-200 shadow-lg  ">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                phone
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                email
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Address
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Diseas
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Treatment
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Treatment Year
              </th>
            </tr>
          </thead>
          {data &&
            data.Patients.map((item) => (
              <List
                item={item}
                key={item.publicAddress}
                icon={true}
                setrecordmodal={setrecordmodal}
                setrecordinfo={setrecordinfo}
                recordinfo={recordinfo}
              />
            ))}
        </table>
      </div>
    </div>
  );
}

export default PatientList;
