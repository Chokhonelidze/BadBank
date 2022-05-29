import React from "react";
import { Loading, Table } from "./context";
import { UserContext } from "./index";

var server = process.env.REACT_APP_SERVER
  ? process.env.REACT_APP_SERVER
  : "http://localhost:3000";

var API = process.env.API ? process.env.API : "/api";

function AllData() {
  const [data, setData] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [user,setUser] = React.useContext(UserContext);

  React.useEffect(() => {
    fetch(server + API + "/account", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    })
      .then((response) => response.json())
      .then(
        (result) => {
          setData(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          console.log(error);
        }
      );
  }, []);

  return(
  <>
    {isLoaded ? (
      <Table
        thead={["ID", "Name", "Email", "Deposit"]}
        tbody={data}
        keys={["id", "name", "email", "deposit"]}
      />
    ) : (
      <Loading />
    )}
  </>);
}
  
export default AllData;
