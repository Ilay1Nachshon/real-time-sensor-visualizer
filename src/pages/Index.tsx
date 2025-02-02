import { useState, useEffect } from "react";
import ConnectionStatus from "../components/ConnectionStatus";
import DataDisplay from "../components/DataDisplay";
import DataChart from "../components/DataChart";
import DirectionIndicator from "../components/DirectionIndicator";
import { Button } from "../components/ui/button";

interface DataPoint {
  timestamp: number;
  value: number;
}

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

  // Simulate data reception - replace this with actual ESP32 serial data
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        // Simulate accelerometer data
        const newAcceleration = {
          x: Math.sin(Date.now() / 1000) * 5,
          y: Math.cos(Date.now() / 1000) * 5,
          z: Math.sin(Date.now() / 500) * 2
        };
        setAcceleration(newAcceleration);

        // Update chart data
        const newValue = Math.abs(newAcceleration.x) + Math.abs(newAcceleration.y);
        setCurrentValue(newValue);
        setChartData(prev => [
          ...prev.slice(-50),
          { timestamp: Date.now(), value: newValue }
        ]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Real-Time Serial Data Visualization</h1>
          <ConnectionStatus isConnected={isConnected} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DataDisplay label="Current Movement Intensity" value={currentValue.toFixed(2)} />
          <DirectionIndicator acceleration={acceleration} />
        </div>

        <div className="mb-6">
          <DataChart data={chartData} />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => setIsConnected(!isConnected)}
            variant={isConnected ? "destructive" : "default"}
          >
            {isConnected ? "Disconnect" : "Connect to ESP32"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;