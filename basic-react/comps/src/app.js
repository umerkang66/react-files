import Route from './components/route';
import Sidebar from './components/sidebar';
import AccordionPage from './pages/accordion-page';
import DropdownPage from './pages/dropdown-page';
import ButtonPage from './pages/button-page';
import ModalPage from './pages/modal-page';
import TablePage from './pages/table-page';
import CounterPage from './pages/counter-page';

export default function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Sidebar />

      <div className="col-span-5">
        <Route path="/">
          <DropdownPage />
        </Route>
        <Route path="/accordion">
          <AccordionPage />
        </Route>
        <Route path="/buttons">
          <ButtonPage />
        </Route>
        <Route path="/modal">
          <ModalPage />
        </Route>
        <Route path="/table">
          <TablePage />
        </Route>
        <Route path="/counter">
          <CounterPage initialCount={25} />
        </Route>
      </div>
    </div>
  );
}
