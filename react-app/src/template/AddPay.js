import {useState, useRef} from 'react';

const divStyle = {
  width : "70%",
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

const AddPay = () => {
  const [money, setMoney] = useState(0);
  const inputNumber = useRef(null);

  const changeNumber = (e) => {
    const value = Number(e.target.value.replaceAll(',', ''));
    if(!isNaN(value)){
      const text = value.toLocaleString("ko-KR");
      console.log(text);
      setMoney(text);
    }
  }

  return (
    <div style={{width:"50%", border : "1px solid black", margin : "40px auto", minWidth:"500px"}}>
      <div style={divStyle}>
        <span style={spanStyle}> pay Content </span>
        <input type="text" style={inputStyle}/>
      </div>
      <div style={divStyle}>
        <span style={spanStyle}> pay Money </span>
        <input ref={inputNumber} onChange={changeNumber} value={money} type="text" style={inputStyle}/>
      </div>
      <div style={divStyle}>
        <span style={spanStyle}> pay Money </span>
        <input type="date" style={inputStyle}/>
      </div>
    </div>
  )
}


export default AddPay;
