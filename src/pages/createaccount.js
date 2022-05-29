import React from "react";
import { validator,Card } from "./context";
import {UserContext} from "./index";
var server = process.env.REACT_APP_SERVER
  ? process.env.REACT_APP_SERVER
  : "http://localhost:3000";

  var loginServer = process.env.REACT_APP_LOGINSERVER
  ?process.env.REACT_APP_LOGINSERVER
  :"http://localhost:3001";
  
var API = process.env.API ? process.env.API : "/api";

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [error, setError] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user,setUser] = React.useContext(UserContext);

  function Message({clearForm,error}){
      let out ="";
      if(error){
        out =<>
        <h5 className="text-danger">{error}</h5>
        <button type="submit" className="btn btn-danger" onClick={clearForm} isDisabled>Add another account</button>
        </>
      }
      else {
          out = 
          <>
          <h5 className="text-success">Success</h5>
          <button type="submit" className="btn btn-primary" onClick={clearForm}  >Add another account</button>
          </>
      }
      return (
       out
      )
  }

  function handleChange(event) {
    setError("");
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
    }
    event.preventDefault();
  }
  function clearForm() {
      setEmail('');
      setName('');
      setPassword('');
      setShow(true);
  }
  async function handleCreate() {
    try {
      validator(name, "name");
      validator(email, "email");
      validator(password, "password");
      
      await fetch(server + API + "/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          'deposit':0
        }),
      })
      .then((response) => response.json())
      .then( 
        (result) => {
            if(result.error){   
                setError(result.error);
            }
            else{
              if(!user)
              fetch(loginServer+"/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
                },
                body: JSON.stringify({
                  name,
                  password
                }),
              })
              .then((response) => response.json())
              .then(
                (result) => {
                  if (result) {
                    setUser({user:{name,password},key:{result}});
                  }
                  else{
                      setError('Wrong User Or Password!');
                  }
                },
                (error) => {
                  console.log(error);
                }
              );
            }
        },
        (error) => {
            setError(error);
        }
      );
      
      setShow(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
    
  }
  function isDisabled(){
      if(!name.length || !email.length || !password.length )return true;
      else return false;
  }

  return ( 
    <>
    <h1>Create Account</h1>
    <Card 
    txtcolor  = 'secondary'

    body={ show ? (
    <>
      Name:
      <br />
      <input
        className="form-control"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <h3 className='text-danger'>{error['name']}</h3>
      Email:
      <br />
      <input
        className="form-control"
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <h3 className='text-danger'>{error['email']}</h3>
      Password:
      <br />
      <input
        className="form-control"
        name="password"
        type="password"
        value={password}
        onChange={handleChange}
      />
      <br />
      <h3 className='text-danger'>{error['password']}</h3>
      <br/>
      <button type="submit" className="btn btn-primary" onClick={handleCreate} disabled={isDisabled()}>
        Create Account
      </button>
    </>
    ):(
         <Message clearForm={clearForm} error={error} />  
       
    )}
    />
    </>
  );
}
export default CreateAccount;
