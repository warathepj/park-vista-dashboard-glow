
import { ParkingSpace as ParkingSpaceType } from "@/types/parking";
import ParkingSpace from "./ParkingSpace";

interface ParkingLevelProps {
  spaces: ParkingSpaceType[];
  levelNumber: number;
}

const ParkingLevel = ({ spaces, levelNumber }: ParkingLevelProps) => {
  const availableSpaces = spaces.filter((space) => !space.isOccupied).length;

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Level {levelNumber}</h2>
        <span className="text-sm text-gray-600">
          {availableSpaces} spaces available
        </span>
      </div>
      <div className="grid grid-cols-5 gap-8 p-6 bg-white rounded-lg shadow-sm">
        {spaces.map((spot) => (
          <ParkingSpace
            key={`${levelNumber}-${spot.spotNumber}`}
            spot={spot}
          />
        ))}
      </div>
    </div>
  );
};

export default ParkingLevel;
