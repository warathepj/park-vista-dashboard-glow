
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ParkingLevel as ParkingLevelType } from "@/types/parking";
import ParkingLevel from "./ParkingLevel";

const ParkingDashboard = () => {
  const [parkingLevels] = useState<ParkingLevelType[]>(() => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Parking Dashboard</h1>
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
