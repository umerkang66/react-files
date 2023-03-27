import requireAuth from './requireAuth';

const Feature = props => {
  return <div>This is a feature</div>;
};

export default requireAuth(Feature);
