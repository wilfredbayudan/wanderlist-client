import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';
import LoaderOverlay from './components/LoaderOverlay';
import MainContent from './components/MainContent';
import BucketlistsPage from './views/bucketlists/BucketlistsPage';
import BucketlistPage from './views/bucketlists/details/BucketlistPage';
import NewBucketlistPage from './views/bucketlists/new/NewBucketlistPage';
import DestinationsPage from './views/destinations/DestinationsPage';
import HomePage from './views/home/HomePage';
import DialogOverlay from './components/DialogOverlay';
import './App.css';

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
  const [destinations, setDestinations] = useState(null);
  const [dialog, setDialog] = useState(false);

  const appState = {
    viewport, setViewport,
    displayContent, setDisplayContent,
    loaderStatus, setLoaderStatus,
    markers, setMarkers,
    currentLocation, setCurrentLocation,
    bucketlists, setBucketlists,
    bucketlist, setBucketlist,
    currentList, setCurrentList,
    destinations, setDestinations,
    dialog, setDialog
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists`)
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        setBucketlists(json);
      })
      .catch(err => console.log(err))      
  }, [setBucketlists, setDisplayContent]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/destinations`)
      .then(res => res.json())
      .then(json => {
        setDestinations(json);
      })
      .catch(err => console.log(err))
  }, [setDestinations, setLoaderStatus, setDisplayContent])

  return (
    <BrowserRouter>
      <LoaderOverlay loaderStatus={loaderStatus} />
      <DialogOverlay appState={appState} />
      <Header />
      <MainContent displayContent={displayContent} setDisplayContent={setDisplayContent}>
        <Routes>
          <Route exact path="/" element={<HomePage appState={appState} />} />
          <Route exact path="/bucketlists" element={<BucketlistsPage appState={appState} />} />
          <Route exact path="/bucketlists/new" element={<NewBucketlistPage appState={appState} />} />
          <Route path="/bucketlists/:id" element={<BucketlistPage appState={appState} />} />
          <Route path="/destinations" element={<DestinationsPage appState={appState} />} />
        </Routes>
      </MainContent>
      <Footer appState={appState} />
      <Map appState={appState} />
    </BrowserRouter>
  )
}

export default App;