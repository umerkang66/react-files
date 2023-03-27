import './ImageList.scss';
import React from 'react';

import ImageCard from './ImageCard.js';

const ImageList = props => {
  const images = props.images.map(img => {
    return (
      <ImageCard key={img.id} image={img} className="img-container__img" />
    );
  });

  return <div className="img-container">{images}</div>;
};

export default ImageList;
