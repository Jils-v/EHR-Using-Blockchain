import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAccess, setReadAccess, setWriteAccess } from "../store/slices/PatientStore";
import Router, { useRouter } from "next/router";

function AddRecord({ setrecordmodal, Con, recordinfo, setrecordinfo }) {
  const [Records, setRecords] = useState({
    disease: "",
    treatment: "",
    treatmentYear: 0,
  });

  const dispatch = useDispatch();
  const Contract = Con();
  const router = useRouter();
  const onchange = (e) => {
    setRecords({ ...Records, [e.target.name]: e.target.value });
  };

  const enterRecord = async (e) => {
    e.preventDefault();
    const D = [...recordinfo.disease, Records.disease];
    const T = [...recordinfo.treatment, Records.treatment];
    const TY = [...recordinfo.treatmentYear, Records.treatmentYear];

    try {
      Contract.addRecord(recordinfo.publicAddress, D, T, TY)
        .then((res) => {
          setrecordmodal(false);
          router.reload();
        })
        .catch((err) => {
          console.log(err);
        });
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
            onClick={() => setrecordmodal(false)}
            className="py-3 px-4  gap-2 rounded-full border border-transparent font-semibold bg-gray-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          >
            X
          </button>
        </div>
        <div className="mt-7  rounded-xl shadow-lg bg-gray-800 border-gray-700">
          <div className="p-7 ">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Edit</h1>
            </div>

            <div className="mt-5">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="Disease"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Disease
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="disease"
                        name="disease"
                        onChange={onchange}
                        className="py-3  px-4 block w-80 border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="Treatment"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Treatment
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="treatment"
                        name="treatment"
                        onChange={onchange}
                        className="py-3  px-4 block w-80 border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="Treatment Year"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Treatment Year
                    </label>
                    <div className="relative">
                      <input
                        type="Number"
                        id="treatmentYear"
                        name="treatmentYear"
                        onChange={onchange}
                        className="py-3  px-4 block w-80 border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={enterRecord}
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

export default AddRecord;
