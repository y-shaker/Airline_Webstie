import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserDataService from "./services/user.js";
import DepFlight from './components/userSystem/edit-dep-flight'
import RetFlight from './components/userSystem/edit-return-flight'
import AddFlight from "./components/adminSystem/add-flight";
import EditFlight from "./components/adminSystem/edit-flight";
import Flight from "./components/adminSystem/flights";
import FlightsList from "./components/adminSystem/flights-list";
import ReservationsList from "./components/adminSystem/res-list";
import Landing from "./components/userSystem/landing";
import FlightDep from "./components/userSystem/departure-flight";
import FlightReturn from "./components/userSystem/return-flights";
import Login from "./components/userSystem/login";
import ReviewSelection from "./components/userSystem/review-selection";
import UpdateUser from "./components/userSystem/edit-user";
import DepSeats from "./components/userSystem/departure-seats";
import RetSeats from "./components/userSystem/return-seats";
import Booking from "./components/userSystem/final-booking";
import MyBooking from "./components/userSystem/successful-booking";
import UserReservations from "./components/userSystem/user-reservations"
import SignUp from "./components/userSystem/sign-up"
import EditDepSeats from './components/userSystem/edit-dep-seats'
import EditRetSeats from './components/userSystem/edit-ret-seats'
import CabinSearch from "./components/userSystem/CabinSearch.js";
import AccessDenied from "./components/adminSystem/AccessDenied.js";
import NotFound from "./components/adminSystem/NotFound.js";
import './App.css';

function App() {

  const [user, setUser] = React.useState(null);

  async function login(user=null) {
    //const user1 = UserDataService.get(user._id);
    console.log(user.firstname);
    setUser(user);
  }

  async function logi(user=null) {
   // const user2 = UserDataService.get(user.id);
    //console.log(user2);
    setUser(user);
  }

  async function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }


  return (
    <div  style={{backgroundColor:"#f0f6f7ff"},{margin:"0 0 0 0"}}>
      
    <nav style={{margin:"0 0 0 0"}} className="navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand">
        AS Airlines
      </a>
      <div  style={{margin:"0 0 0 0"}} className="navbar-nav ms-auto">
        {user? (
          <li className="nav-item" >
            {user.email === "admin@asairline.com" ?(
          <Link to={"/admin/flights"} className="nav-link" >
            Flights
          </Link>
          ):(
            <Link to={"/"} className="nav-link" >
            Home
          </Link>
          )}
        </li>
        ):(
        <li className="nav-item" >
          <Link to={"/"} className="nav-link" >
            Home
          </Link>
        </li>
        )}

{ user && (user.email === "admin@asairline.com")? (
              <li className="nav-item" >
              <Link to={"/admin/reservations"} className="nav-link">
              Reservations
            </Link>
            </li>
            ) :(null)}


        { user && !(user.email === "admin@asairline.com")? (
              <li className="nav-item" >
              <Link to={"/UpdateUser"} className="nav-link">
              Edit Profile 
            </Link>
            </li>
            ) :(null)}

        { user && !(user.email === "admin@asairline.com")? (
              <li className="nav-item" >
              <Link to={"/ViewReservations"} className="nav-link">
              My Reservations 
            </Link>
            </li>
            ) :(null)}  
        
        <li className="nav-item" >
            { user ? (
              <Link to={"/"} onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.username}
              </Link>
            ) : (            
            <Link to={{ pathname: "/login", state: {reserving: false}}} className="nav-link">
              Login
            </Link>
            
            ) 

            }
        

        </li>
        <li className="nav-item">
        { user==null ? (
        <Link to={{ pathname: "/signup", state: {reserving: false}}} className="nav-link">
             Sign up
           </Link>
        ):(null) }
        </li>

        
           

        
      </div>
    </nav>

   





   
    <div >
      <Switch>
      <Route  exact path={["/admin", "/admin/flights"]} component={FlightsList} />
      <Route  exact path={["/admin/reservations"]} component={ReservationsList} />
      <Route  path="/admin/flights/create" component={AddFlight} />
      <Route  path="/admin/flights/:id/edit" component={EditFlight} />
      <Route  path="/admin/flights/:id" component={Flight} />
      <Route  path="/CabinSearch" component={CabinSearch} />

      <Route  exact path={["/", "/flights"]} component={Landing} />
      <Route  path="/flights/SelectDeparture" component={FlightDep} />
      <Route  path="/AccessDenied" component={AccessDenied} />
      <Route  path="/signup" component={SignUp} />
      <Route  path="/flights/SelectReturn" component={FlightReturn} />
      <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
      <Route  path="/flights/ReviewSelection" render={(props) => <ReviewSelection {...props} User={user} />} />
      <Route 
            path="/UpdateUser"
            render={(props) => (
              <UpdateUser {...props} user={user} log={logi} />
            )}
          />
      <Route 
            path="/ViewReservations"
            render={(props) => (
              <UserReservations {...props} user={user}  />
            )}
          />


      <Route  path="/flights/ChooseDepSeats" render={(props) => <DepSeats {...props} User={user} />} />
      <Route  path="/flights/ChooseRetSeats" render={(props) => <RetSeats {...props} User={user} />} />
      <Route  path="/flights/Booking" render={(props) => <Booking {...props} User={user} />} />
      <Route  path="/flights/MyBooking" render={(props) => <MyBooking {...props} User={user} />} />
      <Route  path="/flights/EditDepSeats" render={(props) => <EditDepSeats {...props} User={user} />} />
      <Route  path="/flights/EditRetSeats" render={(props) => <EditRetSeats {...props} User={user} />} />
      <Route  path="/flights/RetFlight" render={(props) => <RetFlight {...props} User={user} />} />
      <Route  path="/flights/DepFlight" render={(props) => <DepFlight {...props} User={user} />} />
      <Route  path="*" component={NotFound} /> 

        
      </Switch>
      
    </div>
  </div>
    
  );
}

export default App;
