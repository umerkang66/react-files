import React, { Fragment } from 'react';
import './Header.css';

export default function Header({ title }) {
  return (
    <Fragment>
      <h1 data-testid="header_id" className="header">
        {title}
      </h1>
      <h3 title="secondary_heading" className="header">
        Second Heading
      </h3>
    </Fragment>
  );
}
