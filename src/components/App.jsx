import React from "react";
import ReactDOM from "react-dom";
import MovieCard from "./MovieCard";
function App(){
  return (
  <div>
    <nav className="fnav">
      <div className="left">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-UOhj-3-a_k1iMmL3wf83Y2_49QcgxrlYOg&usqp=CAU"/>
        <input type="text" placeholder="Search For Movies, Events, Plays and more!"/>
      </div>
      <div className="right">
        <p>Location</p>
        <button>Sign In</button>
      </div>
    </nav>

    <nav className="sec-nav">
      <div className="s-left">
        <p>Movies</p>
        <p>Streams</p>
        <p>Events</p>
        <p>Plays</p>
        <p>Sports</p>
      </div>
      <div className="s-right">
        <p>ListYourShow</p>
        <p>Corporates</p>
        <p>Offers</p>
        <p>Gift Cards</p>
      </div>
    </nav>

    <div className="container">
      <h2>Recommended Movies</h2>
      <MovieCard />
    </div>

  </div>
  )
}

export default App;