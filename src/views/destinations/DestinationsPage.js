import React, { useEffect, useState } from 'react';
import DestinationsList from './DestinationsList';
import LoaderOverlay from '../../components/LoaderOverlay';
import SearchSortBar from '../../components/SearchSortBar';

const DestinationsPage = ({ appState }) => {

  const { destinations, setDisplayContent, setMarkers, setCurrentList } = appState;

  useEffect(() => {
    if (destinations) {
      setDisplayContent(true);
      setMarkers([]);
      setCurrentList(null);
    }
  }, [destinations, setDisplayContent, setMarkers, setCurrentList])

  const sortOptions = [
    { label: "Newest", value: "addedDesc" },
    { label: "Oldest", value: "addedAsc" },
    { label: "Most Popular", value: "sizeDesc" },
    { label: "Least Popular", value: "sizeAsc" },
    { label: "Most Liked", value: "likedDesc" },
    { label: "Least Liked", value: "likedAsc" }
  ]

  const [sort, setSort] = useState(sortOptions[0].value)

  const [search, setSearch] = useState('');

  const sortDestinations = (data, method) => {

    switch(method) {
      case 'addedDesc':
        return data.sort((a, b) => b.id - a.id);
      case 'addedAsc':
        return data.sort((a, b) => a.id - b.id);
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

    let filteredDestinations = sortDestinations(destinations, sort);

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