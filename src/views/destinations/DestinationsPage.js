import React, { useEffect, useState } from 'react';
import DestinationsList from './DestinationsList';
import LoaderOverlay from '../../components/LoaderOverlay';
import SearchSortBar from '../../components/SearchSortBar';

const DestinationsPage = ({ appState }) => {

  const { destinations, setDisplayContent, setMarkers, setCurrentList, setPopup } = appState;

  useEffect(() => {
    if (destinations) {
      setDisplayContent(true);
      setMarkers([]);
      setPopup(false);
      setCurrentList(null);
    }
  }, [destinations, setDisplayContent, setMarkers, setCurrentList, setPopup])

  const sortOptions = [
    { label: "Newest", value: "addedDesc" },
    { label: "Oldest", value: "addedAsc" },
    { label: "Alphabetically (A-Z)", value: "alphaAsc" },
    { label: "Alphabetically (Z-A)", value: "alphaDesc" },
    { label: "Most Seen", value: "sizeDesc" },
    { label: "Least Seen", value: "sizeAsc" },
    { label: "Most Liked", value: "likedDesc" },
    { label: "Least Liked", value: "likedAsc" }
  ]

  const [sort, setSort] = useState('sizeDesc')

  const [search, setSearch] = useState('');

  const sortDestinations = (data, method) => {

    switch(method) {
      case 'addedDesc':
        return data.sort((a, b) => b.id - a.id);
      case 'addedAsc':
        return data.sort((a, b) => a.id - b.id);
      case 'alphaAsc':
        return data.sort((a, b) => {
          if(a.label < b.label) { return -1; }
          if(a.label > b.label) { return 1; }
          return 0;
        })
      case 'alphaDesc':
        return data.sort((a, b) => {
          if(a.label > b.label) { return -1; }
          if(a.label < b.label) { return 1; }
          return 0;
        })
      case 'sizeDesc':
        return data.sort((a, b) => b.bucketlists.length - a.bucketlists.length);
      case 'sizeAsc':
        return data.sort((a, b) => a.bucketlists.length - b.bucketlists.length);
      case 'likedDesc':
        return data.sort((a, b) => b.likes - a.likes);
      case 'likedAsc':
        return data.sort((a, b) => a.likes - b.likes);

      default:
        return data;
    }

  }

  if (destinations) {

    let filteredDestinations = sortDestinations(destinations, sort).filter(filterDestination => filterDestination.bucketlists.length > 0);

    if (search.length > 0) {
      filteredDestinations = filteredDestinations.filter(destination => destination.label.toLowerCase().includes(search.toLowerCase()));
    }

    return (
      <>
        <SearchSortBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} sortOptions={sortOptions} />
        <DestinationsList filteredDestinations={filteredDestinations} appState={appState} />
      </>
    )
  }
  return <LoaderOverlay loaderStatus />
}

export default DestinationsPage;