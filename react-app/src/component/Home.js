import {useState, useEffect} from 'react';
import {Calender, Calculator, AddPay, UpdateCard} from '../template/index';
import axios from 'axios';

const header_Btn_Style = {
  padding : "0px 10px",
  borderBottom : "1px solid #bbb",
  margin : "0px 20px",
  cursor : "pointer"
}

const btnStyle = {
  padding : "10px 20px",
  margin : "0px 20px",
  borderRadius: "10px",
  border : "0px",
  marginTop : "30px",
}

const ViewCardList = ({cardList}) => {
  // console.log(cardList)
  return cardList.map((item, index) => {
      return <option key={index} value={item.cardName}> {item.cardName} </option>
  })
}

const ViewMonthPay = (props) => {
  const [year, setYear]   = props.yearState;
  const [month, setMonth] = props.monthState;
  const date              = props.date;
  const payList           = props.payList;

  const backMonth = () => {
    if(month > 1){
      setMonth(month-1);
    }else {
      if(year <= date.getFullYear()-2){
        return;
      }
      setYear(year-1);
      setMonth(12);
    }
  }
  const nextMonth = () => {
    if(date.getMonth()+1 === month && date.getFullYear() === year){
      return;
    }
    if(month < 12){
      setMonth(month+1);
    }else {
      setYear(year+1);
      setMonth(1);
    }
  }

  return (
    <div style={{width:"30%", height:"300px", border:"1px solid black", margin:"50px auto", minWidth:"500px"}}>
      <div className="PayMonth_Header" style={{width:"100%", textAlign:"center", margin:"30px auto"}}>
        <h1> {month} / {year} </h1>
      </div>
      <div className="PayMonth_Content" style={{textAlign:"center"}}>
        <h2> <Calculator list={payList}/> </h2>
      </div>
      <div style={{textAlign:"center"}}>
        <button style={btnStyle} onClick={backMonth}> backMonth </button>
        <button style={btnStyle} onClick={nextMonth}> nextMonth </button>
      </div>
    </div>
  )
}

const Home = (props) => {
  const [page, setPage] = useState(null);             // view Page
  const [cardList, setCardList] = useState([]);       // card List get
  const [card, setCard] = useState(null);             // select Card
  const [payMonth, setPayMonth] = useState(null);     // month Pay

  const [month, setMonth] = useState(null);           // Month
  const [year, setYear] = useState(null);             // year
  const [payList, setPayList] = useState([]);         // pay List
  const date = new Date();

  const [user, setUser]   = props.userState;
  const dbUrl             = props.dbUrl;

  useEffect(()=>{
    /*
      get Card List  code ...
    */

    getCardList(user.userNumber);

    setPayList([
      {money : 1000, month : 1},
      {money : 5000, month : 1},
      {money : 7000, month : 1},
      {money : 4000, month : 1},
      {money : 10000, month : 1},
      {money : 20000, month : 1},
      {money : 150000, month : 3},
    ])
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear())
  }, []);

  useEffect(()=>{

  }, [month]);

  const getCardList = async (userNumber) => {
    const data = {
      userNumber : userNumber
    }
    const reqData = await axios.post(`${dbUrl}/card/getCardList`, data)
    console.log(reqData.data)
    /*
        reqData's key
        cardId, cardName
    */
    setCardList(reqData.data)
  }


  const changeCard = (e) => {
    /*
      change card play funciton
    */
    setCard(e.target.value)
  }

  const clickHome = () => {
    /*
      Home View prt
    */
    setPage(null);
  }
  const clickCalender = () => {
    /*
      Calender View prt
    */
    setPage(<Calender year={year} month={month} payList={payList}/>)
  }

  const clickAddPay = () => {
    /*
      AddPay View prt
    */
    setPage(<AddPay />)
  }

  const clickAddCard = () => {
    setPage(<UpdateCard dbUrl={dbUrl} user={user} getCardList={getCardList} />);
  }

  return (
    <>
      <header style={{width:"60%", margin:"0 auto"}}>
        <div style={{display:"block", textAlign : "center"}}>
          <a style={header_Btn_Style} onClick={clickHome}> Home </a>
          <a style={header_Btn_Style} onClick={clickCalender}> Calender </a>
          <a style={header_Btn_Style} onClick={clickAddPay}> AddPay </a>
          <a style={header_Btn_Style} onClick={clickAddCard} > UpdateCard </a>
          { cardList.length > 0 &&
          <select onChange={changeCard} style={{}}>
            <ViewCardList cardList={cardList}/>
          </select>
          }
        </div>
      </header>
      <div style={{width:"60%", margin:"50px auto"}}>
        {page === null ? <ViewMonthPay yearState={[year, setYear]} monthState={[month, setMonth]} date={date} payList={payList}/> : page}
      </div>
    </>
  )
}


export default Home;
