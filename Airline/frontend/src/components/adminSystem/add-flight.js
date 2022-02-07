import React, { useState } from "react";
import{Formik, useFormik} from "formik";
import * as Yup from "yup";
import FlightDataService from "../../services/flight";

export default function Createflight(){
    
     const formik=useFormik({
         initialValues: {
             
             FlightNumber:"",
             DepartureTime:"",
             ArrivalTime:"",
             Date:"",
             EconomySeats:"",
             BusinessSeats:"",
             FirstSeats:"",
             DepartureAirport:"",
             DestinationAirport:"",
             TripDuration: "",
             BaggageAllowed: "",
             Price:"",



         },

         validationSchema: Yup.object({
             FlightNumber: Yup.string().required("Required"),
             DepartureTime: Yup.string().required("Required"),
             ArrivalTime : Yup.string().required("Required"),
             Date: Yup.date().required("Required"),
             EconomySeats: Yup.number().required("Required"),
             BusinessSeats: Yup.number().required("Required"),
             FirstSeats: Yup.number().required("Required"),
             DepartureAirport: Yup.string().required("Required").matches(/^[A-Z]+$/),
             DestinationAirport: Yup.string().required("Required").matches(/^[A-Z]+$/),
             TripDuration:Yup.string().required("Required"),
             BaggageAllowed:Yup.string().required("Required"),
             Price:Yup.number().required("Required"),
             

             

         }),


         onSubmit:async (values)=>{
             const FlightData = {
                 fnumber: formik.values.FlightNumber,
                 deptime: formik.values.DepartureTime,
                 arrtime: formik.values.ArrivalTime,
                 date: formik.values.Date,
                 ecseats: formik.values.EconomySeats,
                 bseats: formik.values.BusinessSeats,
                 fseats: formik.values.FirstSeats,
                 depairport: formik.values.DepartureAirport,
                 destairport: formik.values.DestinationAirport,
                 tripdur: formik.values.TripDuration,
                 bagallwd: formik.values.BaggageAllowed,
                 price: formik.values.Price,

             };

             FlightDataService.createFlight(FlightData);
             window.location.href="/admin/flights";


         },
     });
    return(
<div  style={{margin:"15px"}}>
<h1 className="card-title">Create New Flight</h1>
<form onSubmit={formik.handleSubmit}>
    <div className="row">
            <div className="row-auto">
            Flight Number :
               <input
               className="form-control"
                 id="FlightNumber"
                 name="FlightNumber"
                 type="text"
                 placeholder="Flight Number"
                 onChange={formik.handleChange}
                value={formik.values.FlightNumber}
                 />  

           </div>
           <div className="row-auto">     
           
           Departure Time : 
               <input
               className="form-control"
                 id="DepartureTime"
                 name="DepartureTime"
                 type="time"
                 placeholder="Departure Time"
                 onChange={formik.handleChange}
                value={formik.values.DepartureTime}
                 />  

           </div>
           <div className="row-auto"> 
               
           Arrival Time :  
               <input
               className="form-control"
                 id="ArrivalTime"
                 name="ArrivalTime"
                 type="time"
                 placeholder="Arrival Time"
                 onChange={formik.handleChange}
                value={formik.values.ArrivalTime}
                 />  

          </div>
           <div className="row-auto">   
              
           Trip Duration :
               <input
               className="form-control"
                 id="TripDuration"
                 name="TripDuration"
                 type="text"
                 placeholder="Trip Duration"
                 onChange={formik.handleChange}
                value={formik.values.TripDuration}
                 />  

          </div>
           <div className="row-auto">  
             
           Date :
               <input
               className="form-control"
                 id="Date"
                 name="Date"
                 type="date"
                 placeholder="Date"
                 onChange={formik.handleChange}
                value={formik.values.Date}
                 />  

            </div>
           <div className="row-auto">  
              
           Economy Seats :
               <input
               className="form-control"
                 id="EconomySeats"
                 name="EconomySeats"
                 type="number"
                 placeholder="Economy Seats"
                 onChange={formik.handleChange}
                value={formik.values.EconomySeats}
                 />  

            </div>
           <div className="row-auto">  
              
           Business Seats :
               <input
               className="form-control"
                 id="BusinessSeats"
                 name="BusinessSeats"
                 type="number"
                 placeholder="Business Seats"
                 onChange={formik.handleChange}
                value={formik.values.BusinessSeats}
                 />  

            </div>
           <div className="row-auto">    
            
           First Seats :
               <input
               className="form-control"
                 id="FirstSeats"
                 name="FirstSeats"
                 type="number"
                 placeholder="First Seats"
                 onChange={formik.handleChange}
                value={formik.values.FirstSeats}
                 />  

            </div>
           <div className="row-auto">    
           
           Departure Airport :
               <input
               className="form-control"
                 id="DepartureAirport"
                 name="DepartureAirport"
                 type="text"
                 placeholder="Departure Airport"
                 onChange={formik.handleChange}
                value={formik.values.DepartureAirport}
                 />  

          </div>
           <div className="row-auto">      
            
           Destination Airport :
               <input
               className="form-control"
                 id="DestinationAirport"
                 name="DestinationAirport"
                 type="text"
                 placeholder="Destination Airport"
                 onChange={formik.handleChange}
                value={formik.values.DestinationAirport}
                 />  

          </div>
           <div className="row-auto">  
             
           Baggage Allowed :
               <input
               className="form-control"
                 id="BaggageAllowed"
                 name="BaggageAllowed"
                 type="text"
                 placeholder="Baggage Allowed"
                 onChange={formik.handleChange}
                value={formik.values.BaggageAllowed}
                 />  

          </div>
           <div className="row-auto">  
              
           Price :
               <input
               className="form-control"
                 id="Price"
                 name="Price"
                 type="number"
                 placeholder="Price"
                 onChange={formik.handleChange}
                value={formik.values.Price}
                 />  

<br/></div>

           
           <div style={{display: 'flex',  justifyContent:'right', alignItems:'center', height: '5vh'}}>
           <button type= "submit" class="btn btn-primary">Create</button>
           </div>
      </div>
</form>
</div>

    )
}