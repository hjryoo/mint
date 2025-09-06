import React from 'react';
import { Task } from '../types';
import Icon from './Icon';

interface TasksWidgetProps {
  tasks: Task[];
}

const TasksWidget: React.FC<TasksWidgetProps> = ({ tasks }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Growth Checklist</h3>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-start">
            <div className="flex-shrink-0 mt-1">
                {task.completed ? 
                    <Icon name="check-circle" className="w-5 h-5 text-mint-500" /> :
                    <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>
                }
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium text-slate-800 ${task.completed ? 'line-through text-slate-500' : ''}`}>{task.title}</p>
              <p className={`text-sm ${task.completed ? 'text-slate-400' : 'text-slate-500'}`}>{task.description}</p>
            </div>
             <div className="ml-auto flex-shrink-0 pl-2">
                {task.icon}
             </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksWidget;
