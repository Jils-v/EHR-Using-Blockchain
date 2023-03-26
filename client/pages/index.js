import WrongNetworkMessage from "../components/WrongNetworkMessage";
import { conAdd } from "../confing";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import Connect from "../components/Connect";
import CreateAccount from "../components/CreateAccount";
import Patient from "./Patient";
import Hospital from "./Hospital";
import Admin from "./Admin";
import ehr from "../../Backend/build/contracts/ehr.json";
import { Suspense, useEffect } from "react";

export default function Home() {
  const Cont = () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("metamask not found");
    } else {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(conAdd, ehr.abi, signer);
      return Contract;
    }
  };
  const data = useSelector((state) => {
    return state.gen;
  });

  return (
    <div className="overflow-hidden ">
      {!data.isConnected ? (
        <Connect Con={Cont} />
      ) : data.usertype == "patient" ? (
        <Patient Con={Cont} />
      ) : data.usertype == "hospital" ? (
        <Hospital Con={Cont} />
      ) : data.usertype == "admin" ? (
        <Admin Con={Cont} />
      ) : data.usertype == "none" ? (
        <CreateAccount Con={Cont} />
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  );
}
