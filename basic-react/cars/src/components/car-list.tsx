import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { carsActions } from '../store';

const CarList: FC = () => {
  const dispatch = useAppDispatch();
  const { cars, name } = useAppSelector(
    ({ cars: { entities, searchTerm }, form }) => {
      const filteredCars = entities.filter(entity =>
        entity.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      return { cars: filteredCars, name: form.name };
    }
  );

  const handleCarDelete = (id: string) => {
    dispatch(carsActions.removeCar(id));
  };

  const renderedCars = cars.map(car => {
    const bold = !!name && car.name.toLowerCase().includes(name.toLowerCase());

    return (
      <div key={car.id} className={`panel ${bold && 'bold'}`}>
        <p>
          {car.name} - ${car.cost}
        </p>
        <button
          onClick={() => handleCarDelete(car.id)}
          className="button is-danger"
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  );
};

export default CarList;
