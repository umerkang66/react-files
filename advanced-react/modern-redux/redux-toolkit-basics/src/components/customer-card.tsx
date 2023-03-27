import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { customerActions } from '../features/customer-slice';

interface Props {
  customer: {
    id: string;
    name: string;
    food: string[];
  };
}

const CustomerCard: FC<Props> = ({ customer: { id, name, food } }) => {
  const dispatch = useDispatch();
  const [foodNameInput, setFoodNameInput] = useState('');

  const onAddFoodItemClick = () => {
    dispatch(
      customerActions.addCustomerFood({
        customerId: id,
        foodName: foodNameInput,
      })
    );

    setFoodNameInput('');
  };

  return (
    <div className="customer-food-card-container">
      <p>{name}</p>
      <div className="customer-foods-container">
        <div className="customer-food">
          {food.map((foodItem, i) => {
            return <p key={i}>{foodItem} </p>;
          })}
        </div>
        <div className="customer-food-input-container">
          <input
            value={foodNameInput}
            onChange={e => setFoodNameInput(e.target.value)}
          />
          <button onClick={onAddFoodItemClick}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
