import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

import Users from "./pages/Users.js" ;
import Catalog from "./pages/Catalog.js" ;
import Orders from "./pages/Orders.js" ;

export default function App() {
  return (
    <>
    <Router>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/catalog">
            <Catalog />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
        </Switch>
    </Router>
    </>
  );
}
