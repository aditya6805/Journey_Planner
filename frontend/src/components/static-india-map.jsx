import React, { useState } from 'react';

export function StaticIndiaMap() {
  const [hoveredState, setHoveredState] = useState(null);
  
  const stateColors = {
    default: '#E3F2FD',
    hover: '#90CAF9',
    selected: '#2196F3'
  };
  
  const states = [
    { id: 'JK', name: 'Jammu & Kashmir', path: 'M160,80 L200,70 L230,90 L210,120 L170,110 Z', cx: 185, cy: 95 },
    { id: 'HP', name: 'Himachal Pradesh', path: 'M210,120 L230,90 L250,110 L240,130 L220,140 Z', cx: 225, cy: 115 },
    { id: 'PB', name: 'Punjab', path: 'M190,140 L220,140 L230,160 L210,180 L180,170 Z', cx: 200, cy: 155 },
    { id: 'DL', name: 'Delhi', path: 'M210,180 L230,175 L235,190 L225,200 L205,195 Z', cx: 220, cy: 185 },
    { id: 'UP', name: 'Uttar Pradesh', path: 'M230,160 L280,150 L310,170 L300,200 L240,215 L230,190 Z', cx: 270, cy: 180 },
    { id: 'RJ', name: 'Rajasthan', path: 'M140,170 L210,180 L230,190 L240,220 L210,240 L150,230 L120,210 Z', cx: 170, cy: 200 },
    { id: 'GJ', name: 'Gujarat', path: 'M110,230 L150,230 L180,250 L165,290 L120,300 L90,270 L80,240 Z', cx: 130, cy: 255 },
    { id: 'MP', name: 'Madhya Pradesh', path: 'M210,240 L240,220 L290,210 L310,230 L270,280 L220,290 L190,270 Z', cx: 250, cy: 250 },
    { id: 'MH', name: 'Maharashtra', path: 'M180,290 L270,280 L290,310 L270,350 L210,360 L170,330 L160,300 Z', cx: 220, cy: 320 },
    { id: 'BH', name: 'Bihar', path: 'M310,170 L350,170 L370,190 L350,210 L310,220 L300,200 Z', cx: 330, cy: 190 },
    { id: 'WB', name: 'West Bengal', path: 'M350,190 L370,190 L390,210 L380,240 L350,250 L340,220 Z', cx: 365, cy: 220 },
    { id: 'OD', name: 'Odisha', path: 'M290,270 L340,260 L350,290 L330,320 L290,330 L270,300 Z', cx: 315, cy: 290 },
    { id: 'TG', name: 'Telangana', path: 'M230,330 L290,320 L310,350 L280,370 L240,360 Z', cx: 260, cy: 345 },
    { id: 'AP', name: 'Andhra Pradesh', path: 'M220,360 L280,370 L310,350 L330,380 L300,410 L250,430 L230,390 Z', cx: 270, cy: 385 },
    { id: 'KA', name: 'Karnataka', path: 'M170,330 L230,360 L230,390 L250,430 L200,450 L160,420 L150,380 Z', cx: 195, cy: 385 },
    { id: 'TN', name: 'Tamil Nadu', path: 'M250,430 L300,410 L320,440 L300,480 L250,490 L230,460 Z', cx: 270, cy: 455 },
    { id: 'KL', name: 'Kerala', path: 'M200,450 L250,430 L230,460 L250,490 L230,510 L190,480 Z', cx: 220, cy: 480 },
  ];
  
  const cities = [
    { name: 'Delhi', state: 'DL', x: 220, y: 185 },
    { name: 'Mumbai', state: 'MH', x: 170, y: 330 },
    { name: 'Kolkata', state: 'WB', x: 365, y: 230 },
    { name: 'Chennai', state: 'TN', x: 290, y: 460 },
    { name: 'Bangalore', state: 'KA', x: 220, y: 410 },
    { name: 'Hyderabad', state: 'TG', x: 260, y: 345 },
    { name: 'Ahmedabad', state: 'GJ', x: 130, y: 260 },
    { name: 'Jaipur', state: 'RJ', x: 180, y: 210 },
    { name: 'Lucknow', state: 'UP', x: 270, y: 190 },
    { name: 'Bhopal', state: 'MP', x: 230, y: 260 },
  ];

  return (
    <div className="w-full h-full overflow-hidden rounded-lg border border-blue-200 shadow-md bg-white p-4">
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Map of India</h3>
        <p className="text-sm text-gray-600 mb-4">View states and major cities across India</p>
        
        <div className="relative w-full flex-grow">
          <svg
            viewBox="0 0 500 600"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background */}
            <rect x="0" y="0" width="500" height="600" fill="#F8FAFC" />
            
            {/* India Map Outline */}
            <path
              d="M80,70 L200,50 L350,80 L420,150 L430,250 L400,350 L350,420 L300,480 L230,520 L150,490 L90,420 L70,350 L60,250 L70,150 Z"
              fill="#EBF8FF"
              stroke="#3949ab"
              strokeWidth="2"
            />
            
            {/* States */}
            <g>
              {states.map((state) => (
                <path
                  key={state.id}
                  d={state.path}
                  fill={hoveredState === state.id ? stateColors.hover : stateColors.default}
                  stroke="#666"
                  strokeWidth="1"
                  className="transition-colors duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredState(state.id)}
                  onMouseLeave={() => setHoveredState(null)}
                />
              ))}
              
              {states.map((state) => (
                <text
                  key={`text-${state.id}`}
                  x={state.cx}
                  y={state.cy}
                  textAnchor="middle"
                  className="text-[10px] font-medium pointer-events-none"
                  fill="#333"
                >
                  {state.id}
                </text>
              ))}
            </g>
            
            {/* Major cities */}
            <g>
              {cities.map((city, index) => (
                <g key={`city-${index}`}>
                  <circle cx={city.x} cy={city.y} r="3" fill="#E53935" />
                  <text
                    x={city.x + 5}
                    y={city.y + 4}
                    className="text-[8px] pointer-events-none"
                    fill="#111"
                  >
                    {city.name}
                  </text>
                </g>
              ))}
            </g>
            
            {/* Legend */}
            <g transform="translate(20, 520)">
              <rect x="0" y="0" width="180" height="60" fill="white" fillOpacity="0.8" rx="4" stroke="#ccc" strokeWidth="1" />
              <text x="10" y="20" fill="#333" className="text-xs font-semibold">Legend</text>
              <circle cx="20" cy="35" r="3" fill="#E53935" />
              <text x="30" y="38" fill="#333" className="text-xs">Major Cities</text>
              <rect x="10" y="45" width="10" height="10" fill={stateColors.default} stroke="#666" />
              <text x="30" y="53" fill="#333" className="text-xs">States (hover to highlight)</text>
            </g>
          </svg>
        </div>
        
        {hoveredState && (
          <div className="mt-4 p-2 bg-blue-50 rounded-md border border-blue-200">
            <p className="text-sm font-medium">
              {states.find(s => s.id === hoveredState)?.name || hoveredState}
            </p>
          </div>
        )}
        <div className="mt-2">
          <p className="text-xs text-gray-500">* Hover over states to see details</p>
        </div>
      </div>
    </div>
  );
} 