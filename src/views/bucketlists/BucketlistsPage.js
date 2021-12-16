import React, { useEffect, useState } from 'react';
import BucketlistsList from './BucketlistsList';
import LoaderOverlay from '../../components/LoaderOverlay';
import SearchSortBar from '../../components/SearchSortBar';

const Bucketlists = ({ appState }) => {

  const { setPopup, setDisplayContent, bucketlists, setBucketlists, setMarkers } = appState;

  useEffect(() => {
    setPopup(false);
    if (bucketlists) {
      setDisplayContent(true);
      setMarkers([]);
    }
  }, [setPopup, bucketlists, setDisplayContent, setMarkers])

  const sortOptions = [
    { label: "Newest", value: "addedDesc" },
    { label: "Oldest", value: "addedAsc" },
    { label: "Largest", value: "sizeDesc" },
    { label: "Smallest", value: "sizeAsc" }
  ]

  const [sort, setSort] = useState(sortOptions[0].value)

  const [search, setSearch] = useState('');

  const sortBucketlists = (data, method) => {

    switch(method) {
      case 'addedDesc':
        return data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'addedAsc':
        return data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case 'sizeDesc':
        return data.sort((a, b) => b.bucketlist_destinations.length - a.bucketlist_destinations.length);
      case 'sizeAsc':
        return data.sort((a, b) => a.bucketlist_destinations.length - b.bucketlist_destinations.length);
        
      default:
        return data;
    }

  }

  if (bucketlists) {



    let bucketlistsDisplay = sortBucketlists(bucketlists, sort);

    if (search.length > 0) {
      bucketlistsDisplay = bucketlistsDisplay.filter(bucketlist => bucketlist.name.toLowerCase().includes(search.toLowerCase()) || bucketlist.description.toLowerCase().includes(search.toLowerCase()));
    }

    return (
      <>
        <SearchSortBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} sortOptions={sortOptions} />
        <BucketlistsList appState={appState} bucketlists={bucketlistsDisplay} setBucketlists={setBucketlists} />
      </>
    )
  }
  return <LoaderOverlay loaderStatus />
}

export default Bucketlists;