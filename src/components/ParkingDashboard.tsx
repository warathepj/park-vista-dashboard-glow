import { useState, useEffect } from 'react';
import ParkingLevel from "@/components/ParkingLevel";
import { ParkingData } from "@/types/parking";

const ParkingDashboard = () => {
  const [parkingData, setParkingData] = useState<ParkingData | null>(null);

  useEffect(() => {
    const eventSource = new EventSource('/api/parking-data/stream');
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setParkingData(data);
      } catch (error) {
        console.error('Error parsing parking data:', error);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {parkingData?.levels.map((level) => (
        <div key={level.levelNumber} className="mb-8">
          <ParkingLevel 
            spaces={level.spots}
            levelNumber={level.levelNumber}
          />
        </div>
      ))}
    </div>
  );
};

export default ParkingDashboard;
