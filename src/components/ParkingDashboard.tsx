
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { ParkingLevel as ParkingLevelType } from "@/types/parking";
import ParkingLevel from "./ParkingLevel";
import { getLatestParkingData } from "@/api/parkingData";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const ParkingDashboard = () => {
  const [parkingLevels, setParkingLevels] = useState<ParkingLevelType[]>(() => {
    // Initialize parking data
    return Array.from({ length: 3 }, (_, levelIndex) => ({
      level: levelIndex + 1,
      spaces: Array.from({ length: 30 }, (_, spaceIndex) => ({
        id: levelIndex * 30 + spaceIndex + 1,
        level: levelIndex + 1,
        isOccupied: Math.random() < 0.5, // Randomly set occupancy for demo
      })),
    }));
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Listen for parking data updates
    const handleParkingDataUpdate = (event: CustomEvent) => {
      const data = event.detail;
      console.log('Received new parking data:', data);
      
      // Here you can update the parking levels state based on the received data
      // This is just a basic example - adjust according to your data structure
      if (data && data.levels) {
        // Update your state based on the received data
        // This is a placeholder - implement according to your data structure
        console.log('Updating parking levels with new data');
      }
    };

    // Add event listener
    window.addEventListener('parkingDataUpdate', handleParkingDataUpdate as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('parkingDataUpdate', handleParkingDataUpdate as EventListener);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Parking Dashboard</h1>
      <Button onClick={() => navigate('/data')}>Data</Button>
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {parkingLevels.map((level) => (
            <TabsTrigger key={level.level} value={level.level.toString()}>
              Level {level.level}
            </TabsTrigger>
          ))}
        </TabsList>
        {parkingLevels.map((level) => (
          <TabsContent key={level.level} value={level.level.toString()}>
            <ParkingLevel spaces={level.spaces} levelNumber={level.level} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ParkingDashboard;
