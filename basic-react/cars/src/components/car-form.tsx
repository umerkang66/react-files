import { ChangeEventHandler, FC, FormEventHandler } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { formActions, carsActions } from '../store';

const CarForm: FC = () => {
  const dispatch = useAppDispatch();
  const { name, cost } = useAppSelector(state => state.form);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(formActions.changeName(e.target.value));
  };

  const handleCostChange: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(formActions.changeCost(+e.target.value));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch(carsActions.addCar({ name, cost }));
  };

  return (
    <div className="car-form panel">
      <h4 className="subtitle is-3">Add Car</h4>

      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <div className="field">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              value={name}
              onChange={handleNameChange}
              className="input is-expanded"
              type="text"
              id="name"
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="cost">
              Cost
            </label>
            <input
              value={cost || ''}
              onChange={handleCostChange}
              className="input is-expanded"
              type="number"
              id="cost"
            />
          </div>
        </div>

        <div className="field">
          <button className="button is-link">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
