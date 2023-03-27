import { FC } from 'react';
import { useAppSelector } from '../hooks';

const CarValue: FC = () => {
  const carsCost = useAppSelector(({ cars: { entities, searchTerm } }) => {
    const filteredCars = entities.filter(entity =>
      entity.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    return filteredCars.reduce((acc, cur) => acc + cur.cost, 0);
  });

  return <div className="car-value">Total Cost: ${carsCost}</div>;
};

export default CarValue;
