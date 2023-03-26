import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchhospitaldata, setopen } from "../store/slices/AdminStore";
import List from "./List";

function HospitalList({ Con }) {
  useEffect(() => {
    getlist();
  }, []);
  const dispatch = useDispatch();

  const onclick = (e) => {
    dispatch(setopen(true));
  };

  const getlist = async () => {
    try {
      const Contract = Con();
      const detail = await Contract.getAllHospital();
      detail = await detail.map((item) => {
        const data = {
          publicAddress: item.publicAddress,
          name: item.name,
          mail: item.mail,
          hospitalAddress: item.hospitalAddress,
          phone: Number(item.phone),
        };
        return data;
      });
      dispatch(fetchhospitaldata(detail));
    } catch (error) {
      console.log(error);
    }
  };

  const data = useSelector((state) => {
    return state.adm;
  });

  return (
    <div className="   min-h-screen   ">
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
              <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          {data &&
            data.Hospitals.map((item) => (
              <List item={item} key={item.publicAddress} icon={false} />
            ))}
        </table>
      </div>
    </div>
  );
}

export default HospitalList;
