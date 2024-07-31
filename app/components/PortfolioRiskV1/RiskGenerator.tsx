import { Event, Stock } from '@/app/types/ScenarioTypes';

interface RiskGeneratorProps {
  event: Event;
  stock: Stock;
}

const RiskGenerator = ({ event, stock }: RiskGeneratorProps) => {
  return (
    <div>
      RiskGenerator, {event.title}, {stock.id}
    </div>
  );
};

export default RiskGenerator;
