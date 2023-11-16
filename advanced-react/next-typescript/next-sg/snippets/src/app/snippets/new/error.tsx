'use client';

interface Props {
  error: Error;
  // automatically refresh the route
  reset: () => void;
}

function CreateSnippetError(props: Props) {
  return <div>{props.error.message}</div>;
}

export default CreateSnippetError;
