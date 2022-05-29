import React from "react";
import { Card,Loading } from "./context";
import { UserContext } from "./index";

var server = process.env.REACT_APP_SERVER
  ? process.env.REACT_APP_SERVER
  : "http://localhost:3000";

var API = process.env.API ? process.env.API : "/api";

function Balance() {
  const [user,setUser] = React.useContext(UserContext);
  const [data, setData] = React.useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(async () => {
    if(!user || !user.user.name)window.location.href= "/BadBank/#/login";
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
          if (result[0]) {
            setData(result[0]);
            setIsLoaded(true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  async function deleteUser() {
    await fetch(server + API + "/account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
        "authorization":`${user.user.name} ${user.key.result.accessToken}`
      },
      body: JSON.stringify({
        id: data.id,
      }),
    });
    setUser(null);
    window.location.href= "/BadBank/#/login";
  }
  return (
    <>
      {isLoaded ? (
        <Card
          txtcolor="black"
          header="Balance"
          body={
            <>
              <h5 className="text-info">User :{data.name}</h5>
              <h5 className="text-info">Email: {data.email}</h5>
              <h5>Deposit : {data.deposit}</h5>
              {!data.deposit ? (
                <button className="btn-primary" onClick={deleteUser}>
                  Delete User
                </button>
              ) : (
                ""
              )}
            </>
          }
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Balance;
