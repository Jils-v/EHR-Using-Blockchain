import React from "react";
import Hospitalinfo from "../components/Hospitalinfo";
import PatientList from "../components/PatientList";
function Hospital({ Con }) {
  return (
    <div>
      <div>
        <Hospitalinfo />
        <PatientList Con={Con} />
      </div>
    </div>
  );
}

export default Hospital;
