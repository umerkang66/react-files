import './app.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './app/store';
import ReservationCard from './components/reservation-card';
import { useState } from 'react';
import { reservationActions } from './features/reservation-slice';
import CustomerCard from './components/customer-card';

export default function App() {
  const [reservation, setReservation] = useState('');
  const dispatch = useDispatch();

  // first generic argument is rootState, second is what has been returned from reservations
  const reservations = useSelector<RootState, string[]>(
    state => state.reservations.value
  );
  const customers = useSelector((state: RootState) => state.customers.value);

  const onReservationBtnClick = () => {
    if (!reservation) return;
    dispatch(reservationActions.addReservation(reservation));

    setReservation('');
  };

  return (
    <div className="App">
      <div className="container">
        <div className="reservation-container">
          <div>
            <h5 className="reservation-header">Reservations</h5>
            <div className="reservation-cards-container">
              {reservations.map((reservation, i) => {
                return (
                  <ReservationCard
                    index={i}
                    key={i}
                    customerName={reservation}
                  />
                );
              })}
            </div>
          </div>
          <div className="reservation-input-container">
            <input
              value={reservation}
              onChange={e => setReservation(e.target.value)}
            />
            <button onClick={onReservationBtnClick}>Add</button>
          </div>
        </div>
        <div className="customer-food-container">
          {customers.map(customer => {
            return <CustomerCard key={customer.id} customer={customer} />;
          })}
        </div>
      </div>
    </div>
  );
}
