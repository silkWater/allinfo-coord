import React from 'react';
import { Coordinates } from '../../types/coordinates';
import './style.css';

interface CoordPolygonProps {
  coordinates: Coordinates;
  onCoordinatesChange: (field: keyof Coordinates, value: number) => void;
  onConvertUtmToLatLon: () => void;
  onConvertLatLonToUtm: () => void;
}

const CoordPolygon: React.FC<CoordPolygonProps> = ({
  coordinates,
  onCoordinatesChange,
  onConvertUtmToLatLon,
  onConvertLatLonToUtm
}) => {
  

  return (
    <div className="coordinates-panel">     
      
    </div>
  );
};

export default CoordPolygon;
