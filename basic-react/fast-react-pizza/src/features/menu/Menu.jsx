import { useLoaderData } from 'react-router-dom';

import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();
  console.log(menu);

  return (
    <ul>
      {menu.map(pizza => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// this will return a promise
export function loader() {
  return getMenu();
}

export default Menu;
