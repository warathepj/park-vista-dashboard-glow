
import { cn } from "@/lib/utils";

interface ParkingSpaceProps {
  isOccupied: boolean;
  spaceNumber: number;
}

const ParkingSpace = ({ isOccupied, spaceNumber }: ParkingSpaceProps) => {
  return (
    <div className="relative">
      <div
        className={cn(
          "w-12 h-8 rounded-sm transition-colors duration-300",
          isOccupied ? "bg-[#ea384c]" : "bg-[#34c759]"
        )}
      >
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-600">
          {spaceNumber}
        </span>
      </div>
    </div>
  );
};

export default ParkingSpace;
