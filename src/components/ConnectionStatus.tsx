import { WifiOff, Wifi } from "lucide-react";

interface ConnectionStatusProps {
  isConnected: boolean;
}

const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-full bg-muted">
      {isConnected ? (
        <>
          <Wifi className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-green-500">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="w-5 h-5 text-red-500" />
          <span className="text-sm font-medium text-red-500">Disconnected</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;