import { ChangeEventHandler, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { carsActions } from '../store';

const CarSearch: FC = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(state => state.cars.searchTerm);

  const handleSearchTerm: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(carsActions.changeSearchTerm(e.target.value));
  };

  return (
    <div className="list-header">
      <h3 className="title is-3">My Cars</h3>
      <div className="search field is-horizontal">
        <label htmlFor="search" className="label">
          Search
        </label>
        <input
          value={searchTerm}
          onChange={handleSearchTerm}
          type="text"
          className="input"
        />
      </div>
    </div>
  );
};

export default CarSearch;
