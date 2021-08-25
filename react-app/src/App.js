import {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home, Login, Sign} from './component/index';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const dbUrl = 'http://127.0.0.1:3100';

  return (
    <Router>
      <div className="BackGround"></div>
      <Switch>
        {user ?
        <Route exact path='/'>
          <Home userState={[user, setUser]} dbUrl={dbUrl}/>
        </Route>
        :
        <Route exact path='/'>
          <Login userState={[user, setUser]} dbUrl={dbUrl}/>
        </Route>
        }
        <Route exact path='/sign'>
          <Sign dbUrl={dbUrl}/>
        </Route>
        <Route path='*'>
          NO PAGE
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
