import React from 'react';
import { Coordinates } from '../../types/coordinates';
import './style.css';

interface CoordPointProps {
  coordinates: Coordinates;
  onCoordinatesChange: (field: keyof Coordinates, value: number) => void;
  onConvertUtmToLatLon: () => void;
  onConvertLatLonToUtm: () => void;
}

const CoordPoint: React.FC<CoordPointProps> = ({
  coordinates,
  onCoordinatesChange,
  onConvertUtmToLatLon,
  onConvertLatLonToUtm
}) => {
  const handleInputChange = (field: keyof Coordinates, value: string) => {
    const numValue = parseFloat(value) || 0;
    onCoordinatesChange(field, numValue);
  };

  const handleLatLonBlur = () => {
    // 위경도 입력 완료 시 자동으로 UTM 좌표 계산
    onConvertLatLonToUtm();
  };

  return (
    <div className="coordinates-panel">
      <h2>Point 변환</h2>
      
      <div className="coordinate-section">
        <h3>위경도 좌표</h3>
        <div className="input-group">
          <label>위도 (Latitude):</label>
          <input
            type="number"
            step="0.000001"
            value={coordinates.latitude}
            onChange={(e) => handleInputChange('latitude', e.target.value)}
            onBlur={handleLatLonBlur}
          />
        </div>
        <div className="input-group">
          <label>경도 (Longitude):</label>
          <input
            type="number"
            step="0.000001"
            value={coordinates.longitude}
            onChange={(e) => handleInputChange('longitude', e.target.value)}
            onBlur={handleLatLonBlur}
          />
        </div>
      </div>

      <div className="coordinate-section">
        <h3>UTM 좌표</h3>
        <div className="input-group">
          <label>UTM Zone:</label>
          <input
            type="number"
            min="1"
            max="60"
            value={coordinates.utmZone}
            onChange={(e) => handleInputChange('utmZone', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Easting (X):</label>
          <input
            type="number"
            step="0.01"
            value={coordinates.utmEasting}
            onChange={(e) => handleInputChange('utmEasting', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Northing (Y):</label>
          <input
            type="number"
            step="0.01"
            value={coordinates.utmNorthing}
            onChange={(e) => handleInputChange('utmNorthing', e.target.value)}
          />
        </div>
        <button 
          className="convert-btn"
          onClick={onConvertUtmToLatLon}
        >
          UTM → 위경도 변환
        </button>
      </div>

      <div className="info-section">
        <h3>사용법</h3>
        <ul>
          <li>지도를 클릭하여 좌표를 선택하세요</li>
          <li>위경도 좌표를 입력하면 자동으로 UTM 좌표가 계산됩니다</li>
          <li>UTM 좌표를 입력하고 변환 버튼을 클릭하면 위경도로 변환됩니다</li>
        </ul>
      </div>
    </div>
  );
};

export default CoordPoint;
