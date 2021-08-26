import {useState, useEffect} from 'react';
import axios from 'axios';

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

const AddPay = (props) => {
  const [money, setMoney]     = useState(0);
  const [content, setContent] = useState("");
  const [installment, setInstallment] = useState(1);
  const [date, setDate]       = useState("2021-01-01T20:03");
  const card = props.card;
  const dbUrl = props.dbUrl;
  const getPayList = props.getPayList;

  useEffect(()=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1 ;
    const day  = date.getDate();

    setDate(`${year}-${month < 10 ? "0"+month : month}-${day}T01:00`);
    console.log(getPayList)
  }, [])

  useEffect(()=>{
    console.log(date);
  }, [date])

  const changeContent = (e) => {
    setContent(e.target.value);
  }
  const changeNumber = (e) => {
    const value = Number(e.target.value.replaceAll(',', ''));
    if(!isNaN(value)){
      const text = value.toLocaleString("ko-KR");
      setMoney(text);
    }
  }
  const changeInstallment = (e) => {
    if(e.target.value > 0){
      setInstallment(e.target.value);
    }
  }
  const changeDate = (e) => {
    setDate(e.target.value);
  }
  const appendPayMoney = () => {
    /*
      send key, value

      cardId => card.id
      payMoney => money
      content  => content
      date    => date
    */
    const data = {
      cardId : card.cardId,
      payMoney : Number(money.replaceAll(',', '')),
      content : content,
      date : date
    }

    axios.post(`${dbUrl}/paymoney/add`, data)
    .then(req => {
      if(req.data){
        getPayList(card);
      }
    });

  }





  return (
    <div style={{width:"50%", border : "1px solid black", margin : "40px auto", minWidth:"500px"}}>
      <div style={divStyle}>
        <span style={spanStyle}> pay Content </span>
        <input type="text" style={inputStyle} onChange={changeContent} value={content}/>
      </div>
      <div style={divStyle}>
        <span style={spanStyle}> pay Money </span>
        <input onChange={changeNumber} value={money} type="text" style={inputStyle}/>
      </div>
      <div style={divStyle}>
        <span style={spanStyle}> Installment </span>
        <input type="number" style={inputStyle} onChange={changeInstallment} value={installment}/>
      </div>
      <div style={divStyle}>
        <span style={spanStyle}> pay Money </span>
        <input type="datetime-local" style={inputStyle} onChange={changeDate} value={date}/>
      </div>
      <div style={divStyle}>
        <button onClick={appendPayMoney}> Append </button>
      </div>
    </div>
  )
}


export default AddPay;
