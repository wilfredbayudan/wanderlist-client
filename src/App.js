import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';
import LoaderOverlay from './components/LoaderOverlay';
import MainContent from './components/MainContent';
import BucketlistsPage from './views/bucketlists/BucketlistsPage';
import BucketlistPage from './views/bucketlists/details/BucketlistPage';
import './App.css';
import NewBucketlistPage from './views/bucketlists/new/NewBucketlistPage';

const App = () => {

  const [viewport, setViewport] = useState({
    // Default Map View
    latitude: 11.1784,
    longitude: 90.8129,
    zoom: 1
  });
  const [displayContent, setDisplayContent] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [bucketlists, setBucketlists] = useState(null);
  const [bucketlist, setBucketlist] = useState(null)
  const [currentList, setCurrentList] = useState(null);

  const appState = {
    viewport, setViewport,
    displayContent, setDisplayContent,
    loaderStatus, setLoaderStatus,
    markers, setMarkers,
    currentLocation, setCurrentLocation,
    bucketlists, setBucketlists,
    bucketlist, setBucketlist,
    currentList, setCurrentList
  }

  return (
    <BrowserRouter>
      <LoaderOverlay loaderStatus={loaderStatus} />
      <Header />
      <MainContent displayContent={displayContent} setDisplayContent={setDisplayContent}>
        <Routes>
          <Route exact path="/bucketlists" element={<BucketlistsPage appState={appState} />} />
          <Route exact path="/bucketlists/new" element={<NewBucketlistPage appState={appState} />} />
          <Route path="/bucketlists/:id" element={<BucketlistPage appState={appState} />} />
          <Route path="/destinations" element={<>Destinations Path</>}></Route> 
        </Routes>
      </MainContent>
      <Footer appState={appState} />
      <Map appState={appState} />
    </BrowserRouter>
  )
}

export default App;