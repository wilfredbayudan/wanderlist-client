function mapLocationData(array) {
  return array.map(data => {
    return {
      lat: data.destination.lat,
      lng: data.destination.lng
    }
  })
}

export default mapLocationData;