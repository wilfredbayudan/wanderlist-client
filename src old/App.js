import React, { useState } from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Header from './components/Header';
import BottomBar from './components/BottomBar';
import Map from './components/Map';
import MainContent from './components/MainContent';
import Bucketlists from './routes/Bucketlists.js';
import Destinations from './routes/Destinations.js';
import LoaderOverlay from './components/LoaderOverlay';
import Bucketlist from './routes/Bucketlist';
import BucketlistNew from './routes/BucketlistNew';

const App = () => {

  const [viewport, setViewport] = useState({
    latitude: 11.1784,
    longitude: 90.8129,
    zoom: 1
  });
  const [displayContent, setDisplayContent] = useState(false);
  const [bucketlists, setBucketlists] = useState(null);
  const [bucketlist, setBucketlist] = useState(null)
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [currentList, setCurrentList] = useState(null);

  return (
    <BrowserRouter>
      <LoaderOverlay loaderStatus={loaderStatus} />
      <Header />
      <MainContent displayContent={displayContent} setDisplayContent={setDisplayContent}>
        <Routes>
          <Route exact path="/" element={<Bucketlists setBucketlist={setBucketlist} bucketlists={bucketlists} setBucketlists={setBucketlists} setDisplayContent={setDisplayContent} setMarkers={setMarkers} setCurrentList={setCurrentList} setLoaderStatus={setLoaderStatus} viewport={viewport} setViewport={setViewport} />} />
          <Route exact path="/bucketlists/new" element={<BucketlistNew />} />
          <Route exact path="/bucketlists/:id" element={<Bucketlist viewport={viewport} setViewport={setViewport} setMarkers={setMarkers} setCurrentList={setCurrentList} bucketlist={bucketlist} setBucketlist={setBucketlist} setLoaderStatus={setLoaderStatus} setDisplayContent={setDisplayContent}/>} />
          <Route exact path="/destinations" element={<Destinations />} />
        </Routes> 
      </MainContent>
      <BottomBar 
        viewport={viewport}
        setViewport={setViewport}
        setLoaderStatus={setLoaderStatus}
        setCurrentLocation={setCurrentLocation}
      />
      <Map 
        viewport={viewport}
        setViewport={setViewport}
        markers={markers}
        currentLocation={currentLocation}
        currentList={currentList}
      />
    </BrowserRouter>
  )
}

export default App;