export default class Location{
  lat: number | null | undefined
  lng: number | null | undefined
  constructor(lat, lng){
    this.lat = lat
    this.lng = lng
  }
}
