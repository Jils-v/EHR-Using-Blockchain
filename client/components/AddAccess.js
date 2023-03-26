import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAccess, setReadAccess, setWriteAccess } from "../store/slices/PatientStore";
import { useRouter } from "next/router";

function AddAccess({ setmodal, Con, account }) {
  const [addHos, setaddHos] = useState("");
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const clicked = (e) => {
    console.log(e.target.checked);
    if (e.target.checked == false) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const enterAccess = async (e) => {
    e.preventDefault();
    try {
      const Contract = Con();
      const isthere = await Contract.check(addHos);
      if (isthere == "hospital") {
        Contract.addAccess(account, addHos, toggle)
          .then((res) => {
            if (toggle) {
              dispatch(setWriteAccess(account));
              router.reload();
            } else {
              dispatch(setReadAccess(account));
              router.reload();
            }
            setmodal(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Hospital Not Found");
      }
    } catch (error) {
      alert("Enter valid publicAddress");
      console.log(error);
    }
  };
  return (
    <div>
      <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
        <div className=" absolute right-1">
          <button
            onClick={() => setmodal(false)}
            className="py-3 px-4  gap-2 rounded-full border border-transparent font-semibold bg-gray-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          >
            X
          </button>
        </div>
        <div className="mt-7  rounded-xl shadow-lg bg-gray-800 border-gray-700">
          <div className="p-7 ">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Access</h1>
            </div>

            <div className="mt-5">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Public address of hospital
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="publicAddress"
                        name="publicAddress"
                        onChange={(e) => {
                          setaddHos(e.target.value);
                        }}
                        className="py-3  px-4 block w-80 border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  <label
                    onChange={clicked}
                    className="relative w-fit inline-flex items-center mr-5 cursor-pointer"
                  >
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Write Access
                    </span>
                  </label>
                  <button
                    type="submit"
                    onClick={enterAccess}
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddAccess;
