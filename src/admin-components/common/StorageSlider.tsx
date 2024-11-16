export default function StorageSlider({ usedStorage, totalStorage }: {usedStorage: number, totalStorage: number}) {
    const usedPercentage = (usedStorage / totalStorage) * 100;
    const remainingPercentage = 100 - usedPercentage;
  
    return (
      <div className="w-full max-w-md mx-auto text-xs">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Storage Usage</h2>
          <p className=" text-gray-600">
            {usedStorage}GB of {totalStorage}GB used
          </p>
        </div>
  
        {/* Slider container */}
        <div style={{height: '6px'}} className="relative border w-full rounded-full bg-gray-200 overflow-hidden shadow-inner">
          {/* Gradient bar */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${usedPercentage}%`,
              background: `green`,
            }}
          ></div>
        </div>

        {/* Percentage details */}
        <div className="flex justify-between mt-2">
          <span className="text-gray-600">{usedPercentage.toFixed(1)}% Used</span>
          <span className="text-gray-600">{remainingPercentage.toFixed(1)}% Remaining</span>
        </div>
      </div>
    );
  }
  