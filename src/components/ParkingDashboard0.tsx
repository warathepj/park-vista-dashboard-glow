
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { ParkingLevel as ParkingLevelType } from "@/types/parking";
import ParkingLevel from "./ParkingLevel";
import { getLatestParkingData } from "@/api/parkingData";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const ParkingDashboard = () => {
  const [parkingLevels, setParkingLevels] = useState<ParkingLevelType[]>(() => {
    // Initialize parking data with the correct structure
    return Array.from({ length: 3 }, (_, levelIndex) => ({
      levelNumber: levelIndex + 1,
      totalSpots: 30,
      availableSpots: 15, // Example value
      occupiedSpots: 15, // Example value
      spots: Array.from({ length: 30 }, (_, spaceIndex) => ({
        spotNumber: spaceIndex + 1,
        isOccupied: Math.random() < 0.5, // Randomly set occupancy for demo
        registrationNumber: undefined
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Parking Dashboard</h1>
        <Button onClick={() => navigate('/data')} variant="outline">
          View Data
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-sm text-blue-600">Total Spots</p>
          <p className="text-2xl font-bold">{parkingLevels.reduce((acc, level) => acc + level.totalSpots, 0)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <p className="text-sm text-green-600">Available</p>
          <p className="text-2xl font-bold">{parkingLevels.reduce((acc, level) => acc + level.availableSpots, 0)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded">
          <p className="text-sm text-red-600">Occupied</p>
          <p className="text-2xl font-bold">{parkingLevels.reduce((acc, level) => acc + level.occupiedSpots, 0)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded">
          <p className="text-sm text-purple-600">Occupancy Rate</p>
          <p className="text-2xl font-bold">
            {((parkingLevels.reduce((acc, level) => acc + level.occupiedSpots, 0) / 
              parkingLevels.reduce((acc, level) => acc + level.totalSpots, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {parkingLevels.map((level) => (
            <TabsTrigger 
              key={level.levelNumber} 
              value={level.levelNumber.toString()}
              className="flex flex-col gap-1"
            >
              <span>Level {level.levelNumber}</span>
              <span className="text-sm text-muted-foreground">
                {level.availableSpots} available
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {parkingLevels.map((level) => (
          <TabsContent 
            key={level.levelNumber} 
            value={level.levelNumber.toString()}
          >
            <ParkingLevel 
              spaces={level.spots} 
              levelNumber={level.levelNumber} 
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ParkingDashboard;
