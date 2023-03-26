import React, { useState } from "react";
import Editingmodal from "../components/Editingmodal";

import HospitalList from "../components/HospitalList";
import CreateHospital from "../components/CreateHospital";
import { useSelector } from "react-redux";

function Admin({ Con }) {
  return (
    <div>
      <div className={`flex flex-col min-h-screen w-screen space-y-10  py-10 bg-gray-900  `}>
        <div>
          <CreateHospital Con={Con} />
        </div>
        <div>
          <HospitalList Con={Con} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
