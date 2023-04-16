import Reacr, { useState } from "react";

let SCREENS = [
    {
        id: 1,
        time: "10.30 AM",
        seats: [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0]
    },
    {
        id: 2,
        time: "12.30 PM",
        seats: [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0]
    },
    {
        id: 3,
        time: "06.30 PM",
        seats: [1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1]
    }
];

const MOVIES = [
    {
        id: 1,
        title: "Thunivu",
        image: "https://upload.wikimedia.org/wikipedia/en/6/65/Thunivu_poster.jpg"
    },
    {
        id: 2,
        title: "Pathu Thala",
        image: "https://timesofindia.indiatimes.com/photo/80346200.cms"
    },
    {
        id: 1,
        title: "Varisu",
        image: "https://igimages.gumlet.io/tamil/home/vijay-varisu-3rdlook-22062022m3.jpg?w=376&dpr=2.6"
    }

];


function MovieCard() {

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedScreen, setSelectedScreen] = useState(null);
    const [selectedSeats, setSelectedSeats] =useState([]);
    const [show, setShow]=useState(false);
    
    const handleSeatSelect = (index, screen)=>{
        if(screen?.id !== selectedScreen?.id){
            setSelectedSeats([index]);
            setSelectedScreen(screen)
            return 
        }  
        setSelectedScreen(screen);
        if(selectedSeats.includes(index)){
            setSelectedSeats(selectedSeats.filter( (i) => i !== index ))
        }
        else{
            setSelectedSeats( (seats) => [...seats, index] )
        }
    }

    function handleBooking(){
        alert(`Seats ${selectedSeats.map((index) => index+1 ).join(", ")} booked for ${selectedScreen.movie?.title} at ${selectedScreen.time}`)
        SCREENS = SCREENS.map( (screen) =>{
            if(screen.id === selectedScreen?.id){
                let seats=screen.seats;
                selectedSeats.map((seat)=>{seats[seat]=0});
                return  {
                    ...screen , 
                    seats
                }
            }
            return screen
        })
        setSelectedMovie(null);
        setSelectedScreen(null)
        setSelectedSeats([])
    }

    return (
        <div className="movies-selction">
            <div className="movie-selection">
                {
                    MOVIES.map((movie) => (
                        <div className="movie" key={movie.id} onClick={() => setSelectedMovie(movie)} >
                            <img className="movie-poster" src={movie.image} alt={movie.title} />
                            <div className="movie-title"> {movie.title}</div>
                        </div>
                    ))
                }
            </div>  
            <button className="btn-show" onClick={()=>{
                setShow(!show)
            }}>Select Movie and Click Me</button>
            
            {
                show?
                <>
                <h2>Choose your Screen</h2>
                <div className="screen-selection" id="show" >
                    {
                        SCREENS.map ((screen) => {
                            return(
                                <div key={screen?.id} className={`screen ${
                                    screen?.id === selectedScreen?.id ? 'selected'  : ''} 
                                    ${screen.seats.includes(1)? 'available': ''}`}>
                                        <div className="screen-number"> Screen {screen.id}</div>
                                        <div className="screen-time">Screen Time: {screen.time} </div>
                                        <div className="movie-title">{selectedMovie?.title}</div>
                                        <div className="screen-seats">
                                            {
                                                screen.seats.map(( seat, index )=>{
                                                    return(
                                                        <div key={index} className={`seat ${seat ? "available" : "unavailable" } 
                                                        ${selectedSeats.includes(index) && selectedScreen?.id === screen.id ? "selected" : '' }
                                                        ${selectedSeats.includes(index) ? "booked": ''}
                                                        `}
                                                        onClick={ ()=>{
                                                            if(seat){
                                                                handleSeatSelect(index, {
                                                                   ...screen,
                                                                   movie: selectedMovie 
                                                                })
                                                            }
                                                        }}
                                                        >
                                                            <div className="seat-number">{index+1}</div>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                </div>
                            )
                            
                        })
                    }
                </div>

            </> 
                :null
            }
            <div className="booking-summary">
                <div className="selected-screen">
                    {
                        selectedScreen && (
                            <div>
                                <h3>Selected Screen: {selectedScreen.id}</h3>
                                <p>Time: {selectedScreen.time}</p>
                                <p>Movie: {selectedScreen?.movie?.title}</p>
                            </div>
                        )
                    }
                </div>
                <div className="selected-seat">
                    {
                        selectedScreen && selectedSeats?.length>0 && (
                            <div>
                                <h3>Selected Seats: <> {selectedSeats.map(index => index+1).join(",")}</></h3>
                                <h3>Number of Tickets: {selectedSeats?.length}</h3>
                            </div>
                        )
                    }
                </div>
            </div>
            <button className="payment-button" onClick={handleBooking} disabled = {!selectedScreen || selectedSeats?.length === 0}>Book Now</button>
        </div>
    )
}

export default MovieCard;