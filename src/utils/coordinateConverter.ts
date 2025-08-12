import { LatLonResult, UtmResult } from '../types/coordinates';

// UTM 좌표를 위경도로 변환하는 함수
export const utmToLatLon = (zone: number, easting: number, northing: number, northern: boolean = true): LatLonResult => {
  // 간단한 UTM to LatLon 변환 (정확한 변환을 위해서는 proj4js 같은 라이브러리 사용 권장)
  const k0 = 0.9996;
  const a = 6378137;
  const e = 0.081819191;
  const e1sq = e * e;
  
  const x = easting - 500000;
  const y = northing;
  
  const arc = y / k0;
  const mu = arc / (a * (1 - e * e / 4 - 3 * e * e * e * e / 64 - 5 * e * e * e * e * e * e / 256));
  
  const ei = (1 - Math.sqrt(1 - e * e)) / (1 + Math.sqrt(1 - e * e));
  const ca = 3 * ei / 2 - 27 * ei * ei * ei / 32;
  const cb = 21 * ei * ei / 16 - 55 * ei * ei * ei * ei / 32;
  const cc = 151 * ei * ei * ei / 96;
  const cd = 1097 * ei * ei * ei * ei / 512;
  
  const phi = mu + ca * Math.sin(2 * mu) + cb * Math.sin(4 * mu) + cc * Math.sin(6 * mu) + cd * Math.sin(8 * mu);
  
  const cosphi = Math.cos(phi);
  const sinphi = Math.sin(phi);
  
  const tanphi = Math.tan(phi);
  const tanphi2 = tanphi * tanphi;
  const tanphi4 = tanphi2 * tanphi2;
  const tanphi6 = tanphi4 * tanphi2;
  
  const ep2 = (a * a - 6377563.396 * 6377563.396) / (6377563.396 * 6377563.396);
  const c1 = ep2 * Math.cos(phi) * Math.cos(phi);
  const t1 = tanphi2;
  const r1 = a * (1 - e * e) / Math.pow(1 - e * e * sinphi * sinphi, 1.5);
  const n1 = a / Math.sqrt(1 - e * e * sinphi * sinphi);
  
  const d = x / (n1 * k0);
  const d2 = d * d;
  const d3 = d2 * d;
  const d4 = d3 * d;
  const d5 = d4 * d;
  const d6 = d5 * d;
  
  const lat = phi - (n1 * tanphi / r1) * (d2 / 2 - d4 / 24 + d6 / 720 + 5 * (5 + 3 * t1 + 10 * c1 - 4 * c1 * c1 - 9 * ep2) * d4 / 24 + 61 * (61 + 90 * t1 + 298 * c1 + 45 * t1 * t1 - 252 * ep2 - 3 * c1 * c1) * d6 / 720);
  const lon = (d - d3 / 6 + d5 / 120) / cosphi + (1 + 2 * t1 + c1) * d3 / (6 * cosphi) + (5 - 2 * c1 + 28 * t1 - 3 * c1 * c1 + 8 * ep2 + 24 * t1 * t1) * d5 / (120 * cosphi);
  
  return {
    lat: lat * 180 / Math.PI,
    lon: (zone - 1) * 6 - 180 + 3 + lon * 180 / Math.PI
  };
};

// 위경도를 UTM 좌표로 변환하는 함수
export const latLonToUtm = (lat: number, lon: number): UtmResult => {
  // 간단한 LatLon to UTM 변환 (정확한 변환을 위해서는 proj4js 같은 라이브러리 사용 권장)
  const zone = Math.floor((lon + 180) / 6) + 1;
  const centralMeridian = (zone - 1) * 6 - 180 + 3;
  
  const latRad = lat * Math.PI / 180;
  const lonRad = lon * Math.PI / 180;
  const centralMeridianRad = centralMeridian * Math.PI / 180;
  
  const a = 6378137;
  const e = 0.081819191;
  const e1sq = e * e;
  
  const cosLat = Math.cos(latRad);
  const sinLat = Math.sin(latRad);
  const tanLat = Math.tan(latRad);
  
  const T = tanLat * tanLat;
  const C = e1sq * cosLat * cosLat / (1 - e * e);
  const A = (lonRad - centralMeridianRad) * cosLat;
  const M = a * ((1 - e * e / 4 - 3 * e * e * e * e / 64 - 5 * e * e * e * e * e * e / 256) * latRad - (3 * e * e / 8 + 3 * e * e * e * e / 32 + 45 * e * e * e * e * e * e / 1024) * Math.sin(2 * latRad) + (15 * e * e * e * e / 256 + 45 * e * e * e * e * e * e / 1024) * Math.sin(4 * latRad) - (35 * e * e * e * e * e * e / 3072) * Math.sin(6 * latRad));
  
  const k0 = 0.9996;
  const x = k0 * a * (A + (1 - T + C) * A * A * A / 6 + (5 - 18 * T + T * T + 72 * C - 58 * 0.0065) * A * A * A * A * A / 120) + 500000;
  const y = k0 * (M + a * ((1 - T + C) * A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24 + (61 - 58 * T + T * T + 600 * C - 330 * 0.0065) * A * A * A * A * A * A / 720));
  
  return {
    zone,
    easting: Math.round(x * 100) / 100,
    northing: Math.round(y * 100) / 100
  };
};
