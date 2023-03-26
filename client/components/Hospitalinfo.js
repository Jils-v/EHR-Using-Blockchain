import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdOutlineAddCircle } from "react-icons/md";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";

export default function Hospitalinfo() {
  const data = useSelector((state) => {
    return state.hospital;
  });
  return (
    <div className=" flex bg-gray-900 py-10  justify-center ">
      <div className="  container max-w-2xl md:w-3/4    bg-white  shadow-2xl rounded-2xl">
        <div className="bg-white rounded-2xl px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="text-2xl font-semibold leading-6 text-gray-900">
            {data.hospitalDetail.name}
          </div>
          <div className="mt-1 text-sm  text-gray-900 sm:col-span-3 sm:mt-0">
            {data.hospitalDetail.publicAddress}
          </div>
        </div>
        <div className="border-t bg-transparent border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data.hospitalDetail.phone}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data.hospitalDetail.mail}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Hospital Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                {data.hospitalDetail.hospitalAddress}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
