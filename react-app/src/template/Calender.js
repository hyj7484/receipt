import {useState, useEffect} from 'react';

const ViewCalender = ({year, month, date}) => {
  const list = new Array(date);
  for(let i = 0; i < list.length; i++){
    list[i] = {};
  }
  return (
    <table style={{width:"90%", margin:"0 auto", borderCollapse:"collapse"}}>
      <thead>
        <tr style={{width:"100%", border:"1px solid black"}}>
          <td style={{width:"5%", textAlign:"center", borderRight:"1px solid black"}}> 요일 </td>
          <td style={{textAlign:"center"}}> 내용 </td>
        </tr>
      </thead>
      <tbody>
        { list.map((value, index)=>{
          return (
            <tr key={index} style={{width:"100%", border:"1px solid black"}}>
              <td style={{textAlign:"center", borderRight:"1px solid black"}}> {index+1} </td>
              <td style={{paddingLeft:"2%"}}> asdf </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}

const Calender = (props) => {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  useEffect(()=>{
    /*
    getFullYear = year
    getMonth    = month
    getDate     = date
    getDay      = week

     get NowYear   = date.getFullYear
     get NowMonth  = date.getMonth() + 1
     get startWeek = new Date(year-month-1).getDay()
    */

    const date = new Date();
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth()+1;
    console.log(typeof nowMonth)
    setYear(nowYear);
    setMonth(nowMonth);
    setLastDate(new Date(nowYear, nowMonth, 0).getDate());
  },[]);

  useEffect(()=>{
    setLastDate(new Date(year, month, 0).getDate());
  }, [month])

  const backMonth = () => {
    if(month !== 1){
      setMonth(month-1)
    }else{
      setMonth(12)
      setYear(year-1)
    }
  }
  const nextMonth = () => {
    if(month !== 12) {
      setMonth(month+1)
    }else{
      setMonth(1)
      setYear(year+1)
    }
  }
  return(
    <div className="Calender">
      <div style={{width:"80%", margin:"0 auto"}}>
        <div style={{float:"left", width:"10%", hetight:"30px", border:"1px solid black", textAlign:"center"}} onClick={backMonth}> {`<`} </div>
        <div style={{float:"center", width:"80%", hetight:"30px", border:"1px solid black", float:"left",  textAlign:"center"}}> {year}년 {month}월 </div>
        <div style={{float:"right", width:"10%", hetight:"30px", border:"1px solid black", textAlign:"center"}} onClick={nextMonth}> {`>`} </div>
      </div>
      <ViewCalender year={year} month={month} date={lastDate}/>
    </div>
  )
}

export default Calender;
