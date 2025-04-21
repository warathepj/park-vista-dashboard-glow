
export interface ParkingData {
  levels: ParkingLevel[];
  totalOccupancy: TotalOccupancy;
}

export interface ParkingLevel {
  levelNumber: number;
  totalSpots: number;
  availableSpots: number;
  occupiedSpots: number;
  spots: ParkingSpot[];
}

export interface ParkingSpot {
  spotNumber: number;
  isOccupied: boolean;
  registrationNumber?: string;
}

export interface TotalOccupancy {
  total: number;
  available: number;
  occupied: number;
  occupancyRate: number;
}
