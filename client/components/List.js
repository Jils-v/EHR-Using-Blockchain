import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";

function List({ item, icon, setrecordmodal, setrecordinfo }) {
  const arr = [
    <td className="px-6 py-4">{item.residentAddress}</td>,
    <td className="">{item.disease && item.disease.map((item) => <tr>{item}</tr>)}</td>,
    <td className="px-6 py-4">
      {item.treatment && item.treatment.map((item) => <tr>{item}</tr>)}
    </td>,
    <td className="px-6 py-4">
      {item.treatmentYear && item.treatmentYear.map((item) => <tr>{item}</tr>)}
    </td>,
  ];
  return (
    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
      <tr className="hover:bg-gray-50 ">
        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div className="text-sm">
            <div className="font-medium text-gray-700">{item.name}</div>
            <div className="text-gray-400">{item.publicAddress} </div>
          </div>
        </th>

        <td className="px-6 py-4">{item.phone}</td>
        <td className="px-6 py-4">{item.mail}</td>
        {icon ? (
          arr.map((element) => element)
        ) : (
          <td className="px-6 py-4">{item.hospitalAddress}</td>
        )}

        <td className="px-6 py-4">
          {icon ? (
            <div className="flex justify-end gap-4">
              {item.Access ? (
                <BiPencil
                  className="text-2xl hover:cursor-pointer text-gray-600"
                  onClick={() => {
                    setrecordinfo(item);
                    setrecordmodal(true);
                  }}
                />
              ) : (
                <AiOutlineEye className="text-2xl text-gray-500" />
              )}
            </div>
          ) : (
            []
          )}
        </td>
      </tr>
    </tbody>
  );
}

export default List;
