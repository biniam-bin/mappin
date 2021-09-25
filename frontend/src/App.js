import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from "@material-ui/icons"
import axios from "axios"
import {format} from "timeago.js"

function App() {
  const currentUser = "Biniam2"
  const [Pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 46,
    longitude: 17,
    zoom: 5
  });

  useEffect(() => {
    const getPins = async() => {
      try{
          const res = await axios.get("http://localhost:8000/api/pins");
          setPins(res.data)

      } catch (err){
      console.log(err)
      }
  }
  getPins()
  }, [])
  const handleMarker = id => {
    setCurrentPlaceId(id)
  }
  const handleAddClick = (e) => {
    console.log(e)
  }
  return (
    <div className="App">
          {console.log(Pins)}
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={'pk.eyJ1IjoiYmluaWFtMDAxIiwiYSI6ImNrdHp3Yng1YzNocGQybm1wcGozMXZlYzYifQ.h_VQYeyeksx-lXVu_KNcqg'}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/biniam001/cktzzbjtc0lxj17odid0nqwl9"
      onDblClick={handleAddClick}
      >
      {Pins.map((p) => (

      <span key={p._id}>
      <Marker
        latitude={48.858093}
        longitude={2.294694}
        offsetLeft={-20}
        offsetLeft={-10}

      >
      
      <Room style={{fontSize: viewport.zoom * 15, color: p.username === currentUser ? "tomato" : "slateblue", cursor: "pointer"}} onClick={() => handleMarker(p._id)}/>
      </Marker>
      {p._id === currentPlaceId && (
      <Popup
          latitude={48.858093}
          longitude={2.294694}
          closeButton={true}
          closeOnClick={false}
          // onClose={() => togglePopup(false)}
          onClose={() => setCurrentPlaceId(null)}
          anchor="left" >
          <div className="card">
            <label>Place</label>
            <h4>{p.title}</h4>
            <label>Review</label>
            <p className="desc">{p.desc}</p>
            <label>Rating</label>
            <div className="starts"> 
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
            </div>
            <label>Information</label>
            <span className="username">Created by: <b>{p.username}</b></span>
            <span className="date">{format(p.createdAt)}</span>
          </div>
        </Popup>)}
        </span>))}

         {/* <Popup
          latitude={48.858093}
          longitude={2.294694}
          closeButton={true}
          closeOnClick={false}
          // onClose={() => togglePopup(false)}
          onClose={() => setCurrentPlaceId(null)}>
        </Popup> */}
    </ReactMapGL>
    </div>
  );

}

export default App;
