import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { customerActions } from '../features/customer-slice';
import { reservationActions } from '../features/reservation-slice';
import { v4 as uuid } from 'uuid';

interface Props {
  customerName: string;
  index: number;
}

const ReservationCard: FC<Props> = ({ customerName, index }) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(reservationActions.removeReservation(index));
    dispatch(
      customerActions.addCustomer({
        id: uuid(),
        name: customerName,
        food: [],
      })
    );
  };

  return (
    <div onClick={onClickHandler} className="reservation-card-container">
      {customerName}
    </div>
  );
};

export default ReservationCard;
