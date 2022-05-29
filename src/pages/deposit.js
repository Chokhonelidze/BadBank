import React from "react";
import { Card, BankForm, Loading } from "./context";
import { UserContext } from "./index";

var server = process.env.REACT_APP_SERVER
  ? process.env.REACT_APP_SERVER
  : "http://localhost:3000";

var API = process.env.API ? process.env.API : "/api";

function Deposit() {
  const [user,setUser] = React.useContext(UserContext);
  const [deposit, setDeposit] = React.useState(0);
  const [newDeposit, setNewDeposit] = React.useState(0);
  const [errors, setError] = React.useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [success,setSuccess] = React.useState();

  React.useEffect(async () => {
    if(!user || !user.user.name)window.location.href= "/BadBank/#/login"
    let params = user?user.user:null;
    await fetch(
      server + API + "/account?" + new URLSearchParams(params).toString(),
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
          "authorization":`${user.user.name} ${user.key.result.accessToken}`
        },
      }
    )
      .then((response) => response.json())
      .then(
        (result) => {
          if (result[0].deposit) {
            setDeposit(result[0].deposit);
            setIsLoaded(true);
          }
          else{
            setDeposit(0);
            setIsLoaded(true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  function handleDeposit() {
    let value = newDeposit;
    setSuccess(`success! you have deposited ${value}$`);
    setNewDeposit(0);
    setDeposit(Number(deposit) + Number(value));
    save(Number(deposit) + Number(value));
  }
  async function save(value) {
    await fetch(server + API + "/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
        "authorization":`${user.user.name} ${user.key.result.accessToken}`
      },
      body: JSON.stringify({
        name: user.user.name,
        password: user.user.password,
        deposit: value,
      }),
    }).catch((error) => {
      console.log(error);
    });
  }
  function isDisabled() {
    if (newDeposit.length) return false;
    else return true;
  }
  return (
    <>
      {isLoaded ? (
        <>
          <h1>Deposit</h1>
          <Card
            txtcolor="black"
            body={
              <BankForm
                balance={deposit}
                lable="DEPOSIT AMOUNT"
                value={newDeposit}
                edit={(event) => {
                  setError(null);
                  if (isNaN(event.target.value)) {
                    setError("Deposit must be a number");
                  }
                  if (Number(event.target.value) >= 0) {
                    setNewDeposit(event.target.value);
                  } else if (event.target.value === "") {
                    setError("Please input deposit amount");
                  } else if (event.target.value < 0) {
                    setError("Deposit must be a postive number");
                  }
                  event.preventDefault();
                }}
                error={errors}
                success = {success}
                buttonLable = "Deposit"
                submit = {handleDeposit}
                disabled = {isDisabled()}
              />
            }
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Deposit;
