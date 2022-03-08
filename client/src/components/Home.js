import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div id="home-container" class="bgimg">
      <div className="home-icons" id="row1">
        <Link to="/events">
          <h5>Events</h5>
          <img src="icons/events.png" />
        </Link>
        <Link to="/lists">
          <h5>Lists</h5>
          <img src="icons/list.png" />
        </Link>

        <Link to="/contacts">
          <h5>Contacts</h5>
          <img src="icons/contact.png" />
        </Link>
      </div>

      <br></br>
      <div className="home-icons" id="row2">
        <Link to="/meals">
          <h5>Meal Planner</h5>
          <img src="icons/meal.png" />
        </Link>
        <Link to="/recipes">
          <h5>Recipes</h5>
          <img src="icons/recipe.png" />
        </Link>
      </div>
    </div>
  );
}

export default Home;
