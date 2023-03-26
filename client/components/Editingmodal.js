import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { sethospitaldata, setopen } from "../store/slices/AdminStore";

function Editingmodal({ Con }) {
  const dispatch = useDispatch();
  const [detail, setdetail] = useState({
    publicAddress: "",
    name: "",
    phone: 0,
    mail: "",
    hospitalAddress: "",
  });

  const onchange = (e) => {
    setdetail({ ...detail, [e.target.name]: e.target.value });
  };
  const create = async (e) => {
    e.preventDefault();

    try {
      const Contract = Con();
      const usertype = await Contract.check(detail.publicAddress);
      if (usertype === "none") {
        Contract.registerhospital(
          detail.publicAddress,
          detail.name,
          detail.phone,
          detail.mail,
          detail.hospitalAddress
        )
          .then((res) => {
            dispatch(sethospitaldata(detail));
            dispatch(setopen(false));
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("publicAddress  exist");
      }
    } catch (error) {
      alert("Enter valid publicAddress");
      console.log(error);
    }
  };
  return (
    <div>
      <div className=" shadow-2xl  ">
        <div className="mx-auto container max-w-2xl  shadow-md">
          <div className="bg-gray-900 text-white rounded-2xl space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Account</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <label className="text-sm">Email</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                    <svg
                      fill="none"
                      className="w-6  mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="mail"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="XYZ@email.com"
                    onChange={onchange}
                  />
                </div>
                <label className="text-sm ">Public Address</label>
                <div className="h-10 flex overflow-scroll">
                  {detail.publicAddress}
                  <div />
                </div>
              </div>
            </div>

            <hr />
            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-white items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <label className="text-sm ">Full name</label>
                  <div className="w-full inline-flex border">
                    <div className="w-1/12 pt-2 bg-gray-400">
                      <svg
                        fill="none"
                        className="w-6  mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      placeholder="John Wick"
                      onChange={onchange}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm ">Phone number</label>
                  <div className="w-full inline-flex border">
                    <div className="pt-2 w-1/12 bg-gray-400">
                      <svg
                        fill="none"
                        className="w-6  mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      name="phone"
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      placeholder="12341234"
                      onChange={onchange}
                      maxLength="10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-white items-center">
              <h2 className="md:w-4/12 max-w-sm mx-auto">Address</h2>

              <div className="md:w-7/12 w-full md:pl-9 max-w-sm  space-y-5 md:inline-flex pl-2">
                <div className="w-full inline-flex border-slate-700 border-b">
                  <textarea
                    rows={2}
                    cols={150}
                    type="textarea"
                    name="residentAddress"
                    className=" focus:outline-none focus:text-gray-600 p-2 ml-4"
                    placeholder="Address"
                    onChange={onchange}
                  />
                </div>
              </div>

              <div className="md:w-3/12 text-center md:pl-6"></div>
            </div>
          </div>
          <div className=" flex w-full -mt-4  place-content-center text-right text-gray-500">
            <button
              type="submit"
              onClick={() => dispatch(setopen(false))}
              className="text-white  w-full text-center rounded-b-2xl bg-gray-400 hover:bg-gray-600 p-3 items-center "
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={create}
              className="text-white  w-full text-center rounded-b-2xl hover:bg-orange-600  bg-orange-400 p-3 items-center "
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editingmodal;
