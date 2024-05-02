import { Plus } from '@phosphor-icons/react';
import IconButton from './IconButton';

const scenarios = ['Scenario 1'];

const colWidth = 'w-[300px]';

const ScenarioContainer = () => {
  return (
    <div className="bg-red-100 flex items-center justify-between p-4">
      <div className="flex items-center justify-start">
        {scenarios.map((scenario, index) => (
          <div key={index} className={`p-2 bg-white rounded-lg m-2 ${colWidth}`}>
            {scenario}
          </div>
        ))}
      </div>
      <div className="w-[40px]">
        <IconButton icon={Plus} onClick={() => console.log('add')} />
      </div>
    </div>
  );
};

export default ScenarioContainer;
