import React, { useState } from 'react';
import Map from '../../components/Map';
import CoordinatesPoint from '../../components/CoordPoint';
import Footer from '../../components/Footer';
import { Coordinates } from '../../types/coordinates';
import { utmToLatLon, latLonToUtm } from '../../utils/coordinateConverter';

const CoordConvert: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 37.5665,
    longitude: 126.9780,
    utmZone: 52,
    utmEasting: 0,
    utmNorthing: 0
  });

  // 초기 UTM 좌표 계산
  React.useEffect(() => {
    const result = latLonToUtm(coordinates.latitude, coordinates.longitude);
    setCoordinates(prev => ({
      ...prev,
      utmZone: result.zone,
      utmEasting: result.easting,
      utmNorthing: result.northing
    }));
  }, []);

  // 좌표 변경 처리
  const handleCoordinatesChange = (field: keyof Coordinates, value: number) => {
    setCoordinates(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // UTM 좌표를 위경도로 변환
  const handleConvertUtmToLatLon = () => {
    const result = utmToLatLon(coordinates.utmZone, coordinates.utmEasting, coordinates.utmNorthing);
    setCoordinates(prev => ({
      ...prev,
      latitude: result.lat,
      longitude: result.lon
    }));
  };

  // 위경도를 UTM 좌표로 변환
  const handleConvertLatLonToUtm = () => {
    const result = latLonToUtm(coordinates.latitude, coordinates.longitude);
    setCoordinates(prev => ({
      ...prev,
      utmZone: result.zone,
      utmEasting: result.easting,
      utmNorthing: result.northing
    }));
  };

  // 지도 클릭 이벤트 처리
  const handleMapClick = (lat: number, lon: number) => {
    setCoordinates(prev => ({
      ...prev,
      latitude: lat,
      longitude: lon
    }));
    // 지도 클릭 시 자동으로 UTM 좌표 계산
    setTimeout(() => {
      handleConvertLatLonToUtm();
    }, 100);
  };

  return (
    <>
      <div className="container">
        {/* 지도 영역 (70%) */}
        <Map 
          coordinates={coordinates}
          onMapClick={handleMapClick}
        />
        
        {/* 좌표 입력 영역 (30%) */}
        <CoordinatesPoint
          coordinates={coordinates}
          onCoordinatesChange={handleCoordinatesChange}
          onConvertUtmToLatLon={handleConvertUtmToLatLon}
          onConvertLatLonToUtm={handleConvertLatLonToUtm}
        />
      </div>
      
      <Footer />
    </>
  );
};

export default CoordConvert;
