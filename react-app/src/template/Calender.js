import {useState, useEffect} from 'react';

const ViewCalender = ({year, month, date}) => {
  const list = new Array(date);
  for(let i = 0; i < list.length; i++){
    list[i] = {};
  }
  return (
    <>
    <div style={{width:"100%", border:"1px solid black", borderRadius:"20px", backgroundColor:"white"}}>
      <div className="header" style={{display:"flex"}}>
        <div style={{flex:2, textAlign:"center", alignSelf:"center"}}> Date </div>
        <div style={{flex:20, textAlign:"center", borderLeft :"1px solid black", padding:"10px 20px"}}> Content </div>
      </div>
      <div className="content" style={{width:"100%"}}>
        {list.map((value, index) => {
          return (
            <div key={index} style={{display:"flex", borderTop : "1px solid black"}}>
              <div style={{flex:2, textAlign:"center", alignSelf:"center",}}> {index+1} </div>
              <div style={{flex:20, paddingLeft:"30px", borderLeft:"1px solid black", padding:"10px 20px"}}> {value.content ? "As" : "bd"} <br/> asd </div>
            </div>
          )
        })}
      </div>
    </div>
    {/*
    <table style={{width:"90%", margin:"0 auto", borderCollapse:"collapse", border:"5px solid blue", borderRadius:"2px"}}>
      <thead>
        <tr style={{width:"100%"}}>
          <td style={{width:"5%", textAlign:"center"}}> Date </td>
          <td style={{textAlign:"center"}}> Content </td>
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
    */}
    </>
  )
}

const Calender = (props) => {
  const year = props.year;
  const month = props.month;
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
    setLastDate(new Date(year, month, 0).getDate());
  },[]);

  return(
    <div className="Calender" style={{ width:"100%", margin:"50px auto", minWidth:"500px", margin:"0 auto", paddingBottom:"30px"}}>
      <div style={{width:"100%", textAlign:"center"}}>
        <h1> {month} / {year} </h1>
      </div>
      <ViewCalender year={year} month={month} date={lastDate}/>
    </div>
  )
}

export default Calender;
