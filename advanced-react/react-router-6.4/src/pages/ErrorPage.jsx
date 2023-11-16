import React from 'react';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <MainNavigation />
      <main id="error-content">
        <h1>A Error Occurred</h1>
        <p>{error.message}</p>
      </main>
    </>
  );
}
