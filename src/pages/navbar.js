import React from "react";
import Tooltip from '@mui/material/Tooltip';
import { UserContext } from "./index";

function NavBar(...props) {
  let user = props[0].user;
  var [data,setData] = React.useState([
    { href: "#/deposit/", name: "Deposit", active: false ,info:"Deposit Money"},
    { href: "#/withdraw/", name: "Withdraw", active: false,info:"Get Money"},
    { href: "#/balance/", name: "Balance", active: false,info:"Check your Balance"},
    { href: "#/alldata/", name: "AllData", active: false, info:"See All Information"},
    { href: "#/CreateAccount/", name: "Create Account", active: false,info:"Create new Accounts" },
  ]);
  var [rightMenu,setRightMenu] = React.useState([
    { href: '#/login/', name: user&&user.name?"Logout":"Login", active: false, info:"Login with users"},
  ]);

  function activate(e){

    let value = e.target.innerHTML;
    let newData = data.map((items)=>{
      if(items.name !== value){
        items.active = false;
      }
      else{
        items.active =true;
      }
      return items;
    });
    setData(newData);
    let newData2 = rightMenu.map((items)=>{
      if(items.name !== value){
        items.active = false;
      }
      else{
        items.active =true;
      }
      return items;
    });
    setRightMenu(newData2);
  }
  function BuildMenu() {
    let menu = data.map((item,index) => {
      function classes(active){
        let act = '';
        if(active){
          act ='active';
        }
        return "nav-link "+act;
      }
      return (
        <li className="nav-item" key={index}>
           <Tooltip title={item.info}>
          <a className={classes(item.active)} href={item.href} onClick={activate} >
            {item.name}
          </a>
          </Tooltip>
        </li>
      );
    });
    let rmenu = rightMenu.map((item,index) => {
      function classes(active){
        let act = '';
        if(active){
          act ='active';
        }
        return "nav-link "+act;
      }
      return (
        <li className="nav-item" key={index}>
           <Tooltip title={item.info}>
          <a className={classes(item.active)} href={item.href} onClick={activate} >
            {item.name}
          </a>
          </Tooltip>
        </li>
      );
    });
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            BadBank
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
              onClick={() => {
                let menu = document.getElementById("navbarNav");
                if (menu.style.display === "none") {
                  menu.style.display = "block";
                } 
                else if(!menu.style.display)
                {
                  menu.style.display = "block";
                }
                else {
                  menu.style.display = "none";
                }
              }}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {menu}
            </ul>
            
            {user?<h4 className="loggedUser">{user.name}</h4>:""}
            <ul className="navbar-nav login ">
              {rmenu}
            </ul>
          </div>
        </nav>
      </>
    );
  }
  return (
    <>
    <BuildMenu/>
    </>
  );
}
export default NavBar;
