import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
  
} from "react-router-dom";

import Login from "./pages/Login.js" ;
import Users from "./pages/Users.js" ;
import Catalog from "./pages/Catalog.js" ;
import Orders from "./pages/Orders.js" ;

export default function App() {
  return (
    <>
    <Router>
        <Switch>
          <Route exact path="/">
						<Redirect to="/login" />
					</Route>
          <Route exact path="/login">
						<Login />
					</Route>
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
