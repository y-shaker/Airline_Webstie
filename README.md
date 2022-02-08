<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  

<h3 align="center">AS Airlines System</h3>

  <p align="center">
    An Airline Reservation System through which an admin can create, update, or delete flights and users can reserve and pay for round-trip flights
    <br />
    <a href="https://github.com/advanced-computer-lab/Zone-A-squared"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/advanced-computer-lab/Zone-A-squared">View Demo</a>
    ·
    <a href="https://github.com/advanced-computer-lab/Zone-A-squared/issues">Report Bug</a>
    ·
    <a href="https://github.com/advanced-computer-lab/Zone-A-squared/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project



AS Airlines is a web based flight booking system. AS Airlines system is a user friendly system which any user can navigate through the website easily by creating account, reserve any roundtrip flights and search for any flight.
It also have an admin system used by the administrator which he can view the reservations done by users and create/delete system flights.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [MongoDB](https://mongodb.com/)
* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [Material UI](https://mui.com/)
* [Stripe Payment API](https://stripe.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow the steps below to start the application 

### Prerequisites

* Download Node.js from https://nodejs.org/en/download/
* Create a MongoDB Atlas Cluster

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/advanced-computer-lab/Zone-A-squared
   ```
2. Install NPM packages in both the frontend and backend directories
   ```sh
   npm install
   ```
3. Create a file named ".env" in the backend directory
4. Paste the following in the .env file (remove /example/ and place your own data )
   ```sh
   AIRLINE_DB_URI=/Enter the connection string from mongoDB cluster/
   AIRLINE_NS=/Enter mongoDB database name/
   PORT=5000
   EMAIL=/Enter an email that you would like the website notification emails be sent from/
   PASSWORD=/enter the password of the email you entered above/
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

![][landing-ss] 

- This is the landing page where the users can search for flights with the desired criteria such as departure airport, destination airport, both departure and return dates, number of seats for adults and children and the cabin class. 
  


![][depflights-ss] 

- The departure flight page where the available departure flight details appears to match the search criteria.


![][retflights-ss] 

- The return flight page where the available return flights details displayed for the selected departure flight.


![][reviewselection-ss] 

- Review selection page where the selected departure and return flights are viewed with details, price and number of travellers.

![][signup-ss]

- Sign up page where the user can create a new account by adding his first name, last name, password, confirm password, email, username, passport number, address, country code and phone number.

![][login-ss] 

- Login page, the user should login to be able to continue booking.


![][depseats-ss]

- Departure seats page where the user can select the seats location for the departure flight.


![][retseats-ss]

- Return seats page where the user can select the seats location for the return flight.


![][finalbooking1-ss]

![][finalbooking2-ss]

![][finalbooking3-ss]

- Final Summary page where the user can view all the details of departure and return flights before final reservation. The user can click on pay with card button for the payment to be completed.



![][successfulbooking1-ss]

![][successfulbooking2-ss]

- Successful booking is a confirmation page for reservation with booking number and all the details for departure and return flights also the user is able to view all the reservations by clicking on my reservations button.


![][myreservations-ss]

- My reservations page shows for the user all reservations made by the user. The user also can edit seats for both the departure and return flights, change flight, cancel flight and send an email contains the flight details to the user's email address.


![][edituser-ss]

![][edituserpass-ss]


- Edit user page where existing user can change his information as first name, last name, email and passport number. Also the user can click on change password button, new text field for a new password will appear.



- ADMIN SYSTEM
![][adminhome-ss]

- Admin home page where the admin can search, create, delete and edit any flight.


![][admincreateflight-ss]

- Admin create flight page where admin can create a flight by entering flight number, departure time, arrival time, trip duration, date, economy seats, business seats, first class seats, departure airport, destination airport, baggage allowance and price.


![][admineditflight-ss]


- Admin edit flight page where admin can edit any flight by editing flight number, departure time, arrival time, trip duration, date, economy seats, business seats, first class seats, departure airport, destination airport, baggage allowance and price.

![][reservationadmin-ss]

- Admin reservation system where the admin can view all the reservation details done by the user.
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- Admin System
    - Create New Flights
    - Search For Existing Flights using any or all of the flight details as criteria
    - View Existing flights' details
    - Edit Existing flights(Changes are reflected on existing user bookings)
    - Delete Existing Flights(Existing user bookings that contain flight are cancelled and affected users are emailed)
    - View Number of reservations on the system
    - View all current reservations' details
    - Cancel any current reservation(email sent to user)
- User System
    - Sign up/login
    - Edit User Profile
    - Search for available flights using any, or all of the flight details such as departure/destination airports, number of adults/children, desired cabin class, and departure/return dates
    - View available departure flights and all their details
    - Select one of the available departure flights
    - View available return flights that match the previously selected return flight and with a further date
    - Select one of the available return flights
    - Review a summary of the trip selection with both flights and total price
    - User must be logged in to continue booking
    - Select the chosen number of seats in the chosen cabin from a seatmap of the departure flight
    - Select the chosen number of seats in the chosen cabin from a seatmap of the return flight
    - View a final summary of the trip with the both flights, chosen seats, and total price to pay
    - Pay for booking using Stripe API
    - if payment is accepted the booking is created(an email is sent with booking details)
    - View all user's existing bookings
    - Edit the chosen seats on one of the flights
    - Mail the booking to the email registered to the user
    - Change the booking to another round-trip and pay difference only
    - Cancel the booking(an email is sent with refund amount)   

<p align="right">(<a href="#top">back to top</a>)</p>






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[test-screenshot]: images/mkr.png
[landing-ss]:images/landing.png
[depflights-ss]:images/depflights.png
[retflights-ss]:images/retflights.png
[reviewselection-ss]:images/reviewselection.png
[depseats-ss]:images/depseats.png
[retseats-ss]:images/retseats.png
[login-ss]:images/login.png
[myreservations-ss]:images/myreservations.png
[successfulbooking1-ss]:images/successfulbooking1.png
[successfulbooking2-ss]:images/successfulbooking2.png
[finalbooking1-ss]:images/finalbooking1.png
[finalbooking2-ss]:images/finalbooking2.png
[finalbooking3-ss]:images/finalbooking3.png
[myreservations-ss]:images/myreservations.png
[adminhome-ss]:images/adminhome.png
[reservationadmin-ss]:images/reservationadmin.png
[signup-ss]:images/signup.png
[edituser-ss]:images/edituser.png
[edituserpass-ss]:images/edituserpass.png
[admincreateflight-ss]:images/admincreateflight.png
[admineditflight-ss]:images/admineditflight.png
