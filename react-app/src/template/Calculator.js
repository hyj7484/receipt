
/*
  month pay money list calculator
  list's key = money, month
*/
const Calculator = (props) => {
  const list = props.list;
  let money = 0;
  for(let i = 0 ; i < list.length; i++){
    if(list[i].installment === 1){
      money += Number(list[i].payMoney);
      console.log(Number(list[i].payMoney))
    }else{
      money += list[i].payMoney / list[i].installment;
    }
  }
  return money
}

export default Calculator;
