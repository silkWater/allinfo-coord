import React, { useEffect, useRef } from 'react';
import { Coordinates } from '../../types/coordinates';
import './style.css';

interface MapProps {
  coordinates: Coordinates;
  onMapClick: (lat: number, lon: number) => void;
}

const Map: React.FC<MapProps> = ({ coordinates, onMapClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const mapContainer = mapRef.current;
      mapContainer.innerHTML = `
        <div class="map-inner">
          <div class="map-instruction">
            지도를 클릭하여 좌표를 선택하세요
          </div>
          <div class="map-center-marker"></div>
          <div class="map-coordinates-display">
            현재: ${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}
          </div>
        </div>
      `;

      // 지도 클릭 이벤트
      const handleMapClick = (e: MouseEvent) => {
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 간단한 좌표 변환 (실제로는 더 정확한 계산 필요)
        const lat = coordinates.latitude + (0.5 - y / rect.height) * 0.1;
        const lon = coordinates.longitude + (x / rect.width - 0.5) * 0.1;
        
        onMapClick(lat, lon);
      };

      mapContainer.addEventListener('click', handleMapClick);

      // 클린업 함수
      return () => {
        mapContainer.removeEventListener('click', handleMapClick);
      };
    }
  }, [coordinates, onMapClick]);

  return <div className="map-container" ref={mapRef}></div>;
};

export default Map;
