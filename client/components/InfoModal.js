import React from "react";

function InfoModal({ setinfomodal, info }) {
  return (
    <div>
      <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
        <div className=" absolute right-1">
          <button
            onClick={() => setinfomodal(false)}
            className="py-3 px-4  gap-2 rounded-full border border-transparent font-semibold bg-gray-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          >
            X
          </button>
        </div>
        <div className="mt-7  rounded-xl shadow-lg bg-gray-800 border-gray-700">
          <div className="p-7 ">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                {info.name} hospital
              </h1>
            </div>

            <div className="mt-5">
              <div className="grid gap-y-4 text-white">
                <p>
                  <label className="font-semibold mr-2">Mail:</label> {info.mail}
                </p>
                <p>
                  <label className="font-semibold mr-2">Phone:</label> {Number(info.phone)}
                </p>
                <p>
                  <label className="font-semibold mr-2">Hospital Address:</label>
                  {info.hospitalAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InfoModal;
