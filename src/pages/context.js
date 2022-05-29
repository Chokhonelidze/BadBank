function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "20rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
function BankForm(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col ">Balance</div>
        <div className="col float-right ">{props.balance}</div>
      </div>
      <div className="row mt-3">
        <div className="col">{props.lable}</div>
      </div>
      <div className="row">
        <div className="col">
          <input
            style={{ width: "100px" }}
            type="number"
            value={props.value}
            placeholder="0.00"
            onChange={props.edit}
          />
          {props.error && <h4 className="text-warning">{props.error}</h4>}
        </div>
      </div>
      <div className="p-3" style={{ marginLeft: "-18px" }}>
        {props.error ? (
          <button
            onClick={props.submit}
            className="btn btn-warning"
            disabled={props.disabled}
          >
            {props.buttonLable}
          </button>
        ) : (
          <>
          <h5 className="text-success">{props.success}</h5>
          <button
            onClick={props.submit}
            className="btn btn-primary"
            disabled={props.disabled}
          >
            {props.buttonLable}
          </button>
          </>
        )}
      </div>
    </div>
  );
}

function validator(field, type) {
  switch (type) {
    case "name":
      if (field.length <= 2 || field.length > 20) {
        let message = {
          name: "Bad Name",
        };
        throw message;
      }
      return true;
    case "email":
      if (field.length < 2 || field.length > 200) {
        let message = {
          email: "Short Email",
        };
        throw message;
      }
      if (
        !String(field)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        let message = {
          email: "Wrong email",
        };
        throw message;
      }
      return true;
    case "password":
      if (field.length < 8) {
        let message = {
          password: "Too short password",
        };
        throw message;
      }
      return true;
    default:
      return true;
  }
}
function Table(props){
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-black";
    return "table table-striped " + bg + txt;
  }
  function buildTH(data){
    return data.map((item)=>{
      return(
        <th scope="col">{item}</th>
      )
    })
  }
  function buldTD(data){
    let keys = props.keys;
    return keys.map((key)=>{
      return(
        <td scope="col">{data[key]}</td>
      )
    })
  }
  function buildBody(data){
    if(data)
    return data.map((item)=>{
      return (
        <tr>
          {buldTD(item)}
        </tr>
      )
    } );

  }
  return(
    <table className={classes()}>
      {props.thead ? 
      (<thead>
        <tr>
        {buildTH(props.thead)}
        </tr>
      </thead>):""}
      {props.tbody ? 
      (<tbody>
        {buildBody(props.tbody)}
      </tbody>):""}
    </table>

  );
}
function Loading(){
  return (
    <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
  );
}
export { Card, validator, BankForm, Table,Loading };
