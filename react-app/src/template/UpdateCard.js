import {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateCard = (props) => {
  const [option, setOption] = useState('add');
  const [view, setView] = useState(null);
  const [card, setCard] = useState("");

  const dbUrl = props.dbUrl;
  const user  = props.user;
  const getCardList = props.getCardList;

  const changeOption = (e) => {
    setOption(e.target.value);
  }

  useEffect(()=>{
     console.log(option)
  }, [option]);

  const changeCard = (e) => {
    setCard(e.target.value);
  }

  const clickAppendCard = () => {
    if(card === ""){
      return;
    }
    const data = {
      userNumber : user.userNumber,
      cardName : card
    }
    axios.post(`${dbUrl}/card/add`, data)
    .then(req => {
      if(req.data){
        getCardList(user.userNumber);
        setCard("");
      }
    })
  }
  const keyPressEnter_AppendCard = (e) => {
    if(e.key === 'Enter'){
      clickAppendCard();
    }
  }

  return (
    <div style={{width:"50%", minWidth:"450px", margin:"0 auto", textAlign:"center", border:"1px solid black", padding : "30px 0px"}}>
      <div style={{textAlign:"center", padding:"20px 0px"}}>
        <label> <input type="radio" name="slect" onChange={changeOption} value="add" checked={option === 'add'}/> add </label>
        <label> <input type="radio" name="slect" onChange={changeOption} value="update" checked={option === 'update'}/> update </label>
      </div>
      <div style={{padding : "20px 0px"}}>
      {option === "add" ?
        <> <span> cardName </span><input onChange={changeCard} onKeyPress={keyPressEnter_AppendCard} value={card} placeholder="추가할 카드명을 입력해 주세요."/> <button onClick={clickAppendCard}> append </button> </>
        :
        <>
          <button> update </button>
          <button> delete </button>
        </>
      }
      </div>
    </div>
  )
}

export default UpdateCard;
