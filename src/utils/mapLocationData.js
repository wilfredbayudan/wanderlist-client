function mapLocationData(array) {
  return array.map(data => {
    return {
      lat: data.location.lat,
      lng: data.location.lng
    }
  })
}

export default mapLocationData;