
import ParkingDashboard from "@/components/ParkingDashboard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-3">EasyPark</h1>
      <h3 className="text-2xl font-bold text-center">Admin Dashboard</h3>
      <Button onClick={() => navigate('/data')} className="mb-3">Parking Data</Button>
      <ParkingDashboard />
    </div>
  );
};

export default Index;
