import * as React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import NavBar from "./navbar";
import CreateAccount from "./createaccount";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import Balance from "./balance";
import AllData from "./alldata";
import Login from "./login";

const UserContext = React.createContext(null);

function Spa() {
  const [user,setUser] = React.useState();
  return (
    <HashRouter>
       <NavBar {...user} />
       <div className="container" style={{padding: "20px"}}>
       <UserContext.Provider value={[user,setUser]}>
      <Routes>
     
        <Route path="/" exact element={<Home />} />
        <Route path="/CreateAccount/" element={<CreateAccount/>} />
        <Route path="/Deposit/" element={<Deposit/>} />
        <Route path="/Withdraw/" element={<Withdraw/>} />
        <Route path="/Balance/" element={<Balance/>} />
        <Route path="/AllData/" element={<AllData/>} />
        <Route path="/Login/" element={<Login />} />
       
      </Routes>
      </UserContext.Provider>
      
      </div>
    </HashRouter>
  );
}
export  {Spa,UserContext};
