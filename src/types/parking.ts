
export interface ParkingSpace {
  id: number;
  level: number;
  isOccupied: boolean;
}

export interface ParkingLevel {
  level: number;
  spaces: ParkingSpace[];
}
