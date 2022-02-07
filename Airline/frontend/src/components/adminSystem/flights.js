import React, { useState, useEffect } from "react";
import FlightDataService from "../../services/flight";
import { Link } from "react-router-dom";

const Flight = props => {
  const initialFlightState = {
    id: null,
    FlightNumber: "",
    DepartureTime: "", 
    ArrivalTime: "", 
    Date: "", 
    EconomySeats: "", 
    BusinessSeats: "", 
    FirstSeats: "", 
    DepartureAirport: "", 
    DestinationAirport: ""
  };
  const [flight, setFlight] = useState(initialFlightState);

  const getFlight = id => {
    FlightDataService.get(id)
      .then(response => {
        setFlight(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFlight(props.match.params.id);
  }, [props.match.params.id]);



  return (
    <div>
      
      {flight ? (
        <div>
          <h5>{flight.DepartureAirport} TO {flight.DestinationAirport}</h5>
          <p>
            <strong>Flight Number: </strong>{flight.FlightNumber}<br/>
            <strong>Departure Time: </strong>{flight.DepartureTime} &nbsp; <strong>Arrival Time: </strong>{flight.ArrivalTime}<br/>
            <strong>Date: </strong>{flight.Date}<br/>
            <strong>First Class Seats: </strong>{flight.FirstSeats} <br/>
            <strong>Business Class Seats: </strong>{flight.BusinessSeats} <br/>
            <strong>Economy Class Seats: </strong>{flight.EconomySeats} 
          </p>
          <Link to={{ pathname: "/admin/flights/" + props.match.params.id + "/edit", state: flight }} className="btn btn-primary">
            Edit Flight
          </Link> &nbsp;

          <a className="btn btn-danger" onClick={() => {if(window.confirm('Are you sure you want to delete this flight?')){FlightDataService.deleteFlight(props.match.params.id);window.location.href="/admin/flights"};}}>Delete Flight</a> &nbsp;

          
          

        </div>
      ) : (
        <div>
          <br />
          <p>No flight selected.</p>
        </div>
      )}
    </div>
  );
};

export default Flight;