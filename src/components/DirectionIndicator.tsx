import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface DirectionIndicatorProps {
  acceleration: {
    x: number;
    y: number;
    z: number;
  };
}

const DirectionIndicator = ({ acceleration }: DirectionIndicatorProps) => {
  // Determine primary movement direction based on strongest acceleration
  const getPrimaryDirection = () => {
    const { x, y } = acceleration;
    const threshold = 2.0; // Minimum acceleration to show movement

    if (Math.abs(x) < threshold && Math.abs(y) < threshold) {
      return "none";
    }

    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? "right" : "left";
    } else {
      return y > 0 ? "down" : "up";
    }
  };

  const direction = getPrimaryDirection();

  return (
    <div className="data-card">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Movement Direction</h3>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="col-start-2">
          <ArrowUp 
            className={`w-8 h-8 mx-auto ${direction === 'up' ? 'text-primary animate-bounce' : 'text-gray-300'}`}
          />
        </div>
        <div className="col-start-1 row-start-2">
          <ArrowLeft 
            className={`w-8 h-8 mx-auto ${direction === 'left' ? 'text-primary animate-pulse' : 'text-gray-300'}`}
          />
        </div>
        <div className="col-start-3 row-start-2">
          <ArrowRight 
            className={`w-8 h-8 mx-auto ${direction === 'right' ? 'text-primary animate-pulse' : 'text-gray-300'}`}
          />
        </div>
        <div className="col-start-2 row-start-3">
          <ArrowDown 
            className={`w-8 h-8 mx-auto ${direction === 'down' ? 'text-primary animate-bounce' : 'text-gray-300'}`}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm text-gray-500 mt-4">
        <div>X: {acceleration.x.toFixed(2)}</div>
        <div>Y: {acceleration.y.toFixed(2)}</div>
        <div>Z: {acceleration.z.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default DirectionIndicator;