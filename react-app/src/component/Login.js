import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
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

const Login = (props) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [user, setUser] = props.userState;
  const dbUrl           = props.dbUrl;

  const changeId = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z0-9]/ig, '');
    setId(e.target.value);
  }
  const changePw = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z0-9]/ig, '');
    setPw(e.target.value);
  }

  const keyPressEnter = (e) => {
    if(e.key = 'Enter'){
      clickLogin()
    }
  }

  const clickLogin = () => {
    if(id == "" || pw == ""){
      return;
    }
    const data = {
      userId : id,
      userPw : pw
    }
    axios.post(`${dbUrl}/user/login`, data)
    .then(req => {
      console.log(req);
      if(req.data){
        setUser(req.data)
      }
    })
  }


  return (
    <div style={{width:"300px", margin:"0 auto", textAlign:"center", marginTop:"100px", padding:"50px 50px", backgroundColor:"white"}}>
      <div className="Title"> <h1> Login </h1> </div>
      <div className="Content" style={{width:"100%"}}>
        <div style={divStyle}>
          <span style={spanStyle}> ID </span> <input onChange={changeId} onKeyPress={keyPressEnter} style={inputStyle} value={id}/> <br/>
        </div>
        <div style={divStyle}>
          <span style={spanStyle}> PW </span> <input type="password" onKeyPress={keyPressEnter} onChange={changePw} style={inputStyle} value={pw}/> <br/>
        </div>
        <div style={{textAlign: "center"}}>
          <button style={btnStyle} onClick={clickLogin}> Login </button>
          <Link to="/sign"> <button style={btnStyle}> Sign </button> </Link>
        </div>
      </div>
    </div>
  )
}
export default Login;
