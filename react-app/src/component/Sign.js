import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const divStyle = {
  width : "100%",
  height: "40px",
  margin : "0 auto",
  display : "flex",
  padding : "20px 0px",
}
const spanStyle = {
  flex : 1,
  alignSelf : "center"
}
const inputStyle = {
  flex : 4,
  height:"40px",
}
const btnStyle ={
  width : "80px",
  height: "30px",
  margin : "10px 20px",
}

const Sign = (props) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");

  const [user, setUser] = props.userState;
  const dbUrl           = props.dbUrl;

  const history = useHistory();

  const changeId = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z0-9]/ig, '');
    setId(e.target.value);
  }
  const changePw = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z0-9]/ig, '');
    setPw(e.target.value);
  }
  const changeName = (e) => {
    setName(e.target.value);
  }

  const clickSignIn = () => {
    const data = {
      userId : id,
      userPw : pw,
      userName : name
    }
    axios.post(`${dbUrl}/user/sign`, data)
    .then(req => {
      console.log(req.data);
      if(req.data){
        history.push('/');
      }
    })
  }

  return (
    <div style={{width:"300px", margin:"0 auto", textAlign:"center", marginTop:"100px", padding:"50px 50px", backgroundColor:"white"}}>
      <div className="Title"> <h1> Sign In </h1> </div>
      <div className="Content" style={{width:"100%"}}>
        <div style={divStyle}>
          <span style={spanStyle}> ID </span> <input onChange={changeId} style={inputStyle} value={id}/> <br/>
        </div>
        <div style={divStyle}>
          <span style={spanStyle}> PW </span> <input type="password" onChange={changePw} style={inputStyle} value={pw}/> <br/>
        </div>
        <div style={divStyle}>
          <span style={spanStyle}> Name </span> <input onChange={changeName} style={inputStyle} value={name}/> <br/>
        </div>
        <div style={{textAlign: "center"}}>
          <button style={btnStyle} onClick={clickSignIn}> Sign In </button>
          <Link to="/"> <button style={btnStyle} > cancel </button> </Link>
        </div>
      </div>
    </div>
  )
}

export default Sign;
