'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

interface Props {
  children: React.ReactNode;
}

function FormButton({ children }: Props) {
  // looks for forms in parent component
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      {children}
    </Button>
  );
}

export default FormButton;
