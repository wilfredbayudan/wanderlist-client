function mapLocationData(array) {
  return array.map(data => {
    return {
      id: data.id,
      lat: data.destination.lat,
      lng: data.destination.lng
    }
  })
}

export default mapLocationData;