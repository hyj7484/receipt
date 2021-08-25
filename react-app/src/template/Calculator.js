
/*
  month pay money list calculator
  list's key = money, month
*/
const Calculator = (props) => {
  const list = props.list;
  let money = 0;

  for(let i = 0 ; i < list.length; i++){
    if(list[i].month === 1){
      money += list[i].money
    }else{
      money += list[i].money / list[i].month;
    }
  }
  return money
}

export default Calculator;
