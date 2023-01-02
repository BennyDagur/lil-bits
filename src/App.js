import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dish from './pages/Dish';
import Home from './pages/Home';
import Drinks from './pages/Drinks'
import Order from './pages/Order'
import Receipt from './pages/Receipt'

function App() {
  return ( 
    <Router>
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route path='/dish'>
        <Dish/>
      </Route>
      <Route path='/drinks'>
        <Drinks/>
      </Route>
      <Route path='/order'>
        <Order/>
      </Route>
      <Route path='/receipt'>
        <Receipt/>
      </Route>
    </Switch>
    </Router>
  );
}

export default App;