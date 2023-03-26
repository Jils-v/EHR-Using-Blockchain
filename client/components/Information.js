import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdOutlineAddCircle } from "react-icons/md";
import AddAccess from "./AddAccess";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { removeReadAccess, removeWriteAccess } from "../store/slices/PatientStore";
import InfoModal from "./InfoModal";

export default function Information({ Con }) {
  const dispatch = useDispatch();
  const Contract = Con();
  const [modal, setmodal] = useState(false);
  const [infomodal, setinfomodal] = useState(false);
  const [info, setinfo] = useState({});
  const give = () => {
    setmodal(true);
  };
  const data = useSelector((state) => {
    return state.patient;
  });

  return (
    <div className=" flex bg-gray-900 pt-20 md:py-20  justify-center  min-h-screen min-w-screen">
      {modal ? (
        <div className=" fixed top-48 ">
          <AddAccess
            Con={Con}
            account={data.userPersonalDetail.publicAddress}
            setmodal={setmodal}
          />
        </div>
      ) : (
        []
      )}
      {infomodal ? (
        <div className=" fixed top-48 ">
          <InfoModal setinfomodal={setinfomodal} info={info} />
        </div>
      ) : (
        []
      )}
      <div className="  container max-w-2xl md:w-3/4    bg-white  shadow-2xl rounded-2xl">
        <div className="bg-white rounded-2xl px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="text-2xl font-semibold leading-6 text-gray-900">Public Address</div>
          <div className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
            {data.userPersonalDetail.publicAddress}
          </div>
        </div>
        <div className="border-t bg-transparent border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data.userPersonalDetail.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data.userPersonalDetail.phone}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data.userPersonalDetail.mail}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                {data.userPersonalDetail.residentAddress}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Disease</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data.userPersonalDetail.disease}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Treatment</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data.userPersonalDetail.treatment}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Treatment Year</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data.userPersonalDetail.treatmentYear}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Access</dt>

              <dd className="mt-1  text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <dt className="text-sm flex items-center justify-between  font-medium overflow-hidden text-gray-500 ">
                  <h3 className="text-lg text-black">Add</h3>
                  <MdOutlineAddCircle onClick={give} className="text-2xl hover:cursor-pointer " />
                </dt>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 rounded-md border border-gray-200"
                >
                  {data.userPersonalDetail &&
                    data.userPersonalDetail.ReadAccess.map((item) =>
                      item != "0x0000000000000000000000000000000000000000" ? (
                        <li
                          key={item}
                          className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                        >
                          <div className="flex w-0 flex-1 items-center">
                            <AiOutlineEye
                              onClick={async () => {
                                try {
                                  const inf = await Contract.getHospitalDetail(item);
                                  console.log(inf);
                                  setinfo(inf);
                                  setinfomodal(true);
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                              className="text-2xl text-gray-500"
                            />
                            <span className="ml-2 w-0 flex-1 scrollbar-hide overflow-x-scroll">
                              {item}
                            </span>
                          </div>
                          <MdDelete
                            className="text-2xl text-gray-700 hover:cursor-pointer hover:text-red-500"
                            onClick={async () => {
                              try {
                                await Contract.revokeAccess(
                                  data.userPersonalDetail.publicAddress,
                                  item,
                                  false
                                );
                                dispatch(removeReadAccess(item));
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          />
                        </li>
                      ) : (
                        []
                      )
                    )}
                  {data.userPersonalDetail &&
                    data.userPersonalDetail.WriteAccess.map((item) =>
                      item != "0x0000000000000000000000000000000000000000" ? (
                        <li
                          key={item}
                          className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                        >
                          <div className="flex w-0 flex-1 items-center">
                            <BiPencil
                              onClick={async () => {
                                try {
                                  const inf = await Contract.getHospitalDetail(item);
                                  setinfo(inf);
                                  setinfomodal(true);
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                              className="text-2xl text-gray-500"
                            />

                            <span className="ml-2 w-0 flex-1 scrollbar-hide overflow-x-scroll">
                              {item}
                            </span>
                          </div>
                          <MdDelete
                            onClick={async () => {
                              try {
                                await Contract.revokeAccess(cu.currentAccount, item, true);
                                dispatch(removeWriteAccess(item));
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                            className="text-2xl text-gray-700 hover:cursor-pointer hover:text-red-500"
                          />
                        </li>
                      ) : (
                        []
                      )
                    )}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
