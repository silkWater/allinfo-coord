import React, { useEffect, useRef } from 'react';
import { Coordinates } from '../types/coordinates';

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
        <div style="
          width: 100%; 
          height: 100%; 
          background: linear-gradient(45deg, #e3f2fd, #bbdefb);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: crosshair;
        ">
          <div style="
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(255, 255, 255, 0.9);
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          ">
            지도를 클릭하여 좌표를 선택하세요
          </div>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background: red;
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
          "></div>
          <div style="
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.9);
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 11px;
            color: #666;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          ">
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
