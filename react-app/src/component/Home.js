import {useState} from 'react';
import {Calender} from '../template/index';

const Home = (props) => {
  const [page, setPage] = useState(null);

  const asdf = () => {
    console.log("ASDasd")
  }
  return (
    <>
      <header></header>
      <div className="Content">
         <Calender />
      </div>
    </>
  )
}


export default Home;
