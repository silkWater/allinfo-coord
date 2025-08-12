export interface Coordinates {
  latitude: number;
  longitude: number;
  utmZone: number;
  utmEasting: number;
  utmNorthing: number;
}

export interface LatLonResult {
  lat: number;
  lon: number;
}

export interface UtmResult {
  zone: number;
  easting: number;
  northing: number;
}
