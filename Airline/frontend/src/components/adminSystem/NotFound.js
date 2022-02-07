import { Link } from "react-router-dom";

const NotFound = (props) => {


    return(
        <div >
<main>
  <div class="container">
    <div class="row">
      <div class="col-md-6 align-self-center">
        <h1>404</h1>
        <h2>UH OH! You're lost.</h2>
        <p>The page you are looking for does not exist.
          How you got here is a mystery. But you can click the button below
          to go back to the homepage.
        </p>
        <Link to={{ pathname: "/"}}  className="btn btn-success">
            Home
          </Link>
      </div>
    </div>
  </div>
</main>
</div>


    );
};
export default NotFound;