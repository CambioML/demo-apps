import SideBar from './components/SideBar/SideBar';
import Workspace from './components/Workspace/Workspace';
import EventModal from './components/modals/EventModal';
import GenerateModal from './components/modals/GenerateModal';
import InfoModal from './components/modals/InfoModal';
import StockModal from './components/modals/StockModal';

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-[300px_1fr]">
      <EventModal />
      <StockModal />
      <GenerateModal />
      <SideBar />
      <InfoModal />
      <Workspace title="My Workspace" />
    </main>
  );
}
