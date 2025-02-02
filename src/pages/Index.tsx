import { useState, useEffect } from "react";
import ConnectionStatus from "../components/ConnectionStatus";
import DataDisplay from "../components/DataDisplay";
import DataChart from "../components/DataChart";
import DirectionIndicator from "../components/DirectionIndicator";
import { Button } from "../components/ui/button";
import { useWebSocket } from "../hooks/useWebSocket";

interface DataPoint {
  timestamp: number;
  value: number;
}

const WEBSOCKET_URL = 'ws://localhost:8080'; // Update this with your WebSocket server URL

const Index = () => {
  const { isConnected, lastMessage, connect, disconnect } = useWebSocket(WEBSOCKET_URL);
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    if (lastMessage) {
      const movementIntensity = Math.sqrt(
        Math.pow(lastMessage.x, 2) + 
        Math.pow(lastMessage.y, 2) + 
        Math.pow(lastMessage.z, 2)
      );

      setChartData(prev => [
        ...prev.slice(-50),
        { timestamp: lastMessage.timestamp, value: movementIntensity }
      ]);
    }
  }, [lastMessage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Real-Time Serial Data Visualization</h1>
          <ConnectionStatus isConnected={isConnected} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DataDisplay 
            label="Current Movement Intensity" 
            value={lastMessage ? 
              Math.sqrt(
                Math.pow(lastMessage.x, 2) + 
                Math.pow(lastMessage.y, 2) + 
                Math.pow(lastMessage.z, 2)
              ).toFixed(2) : 
              "0.00"
            } 
          />
          <DirectionIndicator 
            acceleration={lastMessage ? 
              { x: lastMessage.x, y: lastMessage.y, z: lastMessage.z } : 
              { x: 0, y: 0, z: 0 }
            } 
          />
        </div>

        <div className="mb-6 h-[400px]">
          <DataChart data={chartData} />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={isConnected ? disconnect : connect}
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