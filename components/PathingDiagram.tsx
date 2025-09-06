import React from 'react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';
import { MOCK_PATHING_DATA } from '../constants';
import { PathingData } from '../types';

const PathingDiagram: React.FC = () => {
    const data: PathingData = MOCK_PATHING_DATA;
    const colors = ['#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1', '#0d9488', '#0f766e', '#115e59'];

    return (
        <div className="bg-white shadow rounded-lg p-6 h-[500px]">
            <h3 className="text-xl font-bold font-display text-slate-800">Common User Paths</h3>
            <p className="text-sm text-slate-500 mb-4">Reveals common pre-purchase sequences and post-purchase upsell acceptances.</p>
            <ResponsiveContainer width="100%" height="90%">
                <Sankey
                    data={data}
                    nodePadding={50}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    link={{ stroke: '#cbd5e1' }}
                    node={({ x, y, width, height, index, payload }) => (
                         <g transform={`translate(${x},${y})`}>
                            <rect height={height} width={width} fill={colors[index % colors.length]} strokeWidth="0" />
                            <text
                                x={width < 100 ? width + 6 : width / 2}
                                y={height / 2}
                                dy="0.35em"
                                textAnchor={width < 100 ? "start" : "middle"}
                                fill={width < 100 ? "#334155" : "#ffffff"}
                                className="text-sm font-medium"
                            >
                                {payload.name}
                            </text>
                        </g>
                    )}
                >
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            backdropFilter: 'blur(5px)',
                            border: '1px solid #e2e8f0', 
                            borderRadius: '0.5rem' 
                        }}
                    />
                </Sankey>
            </ResponsiveContainer>
        </div>
    );
};

export default PathingDiagram;
