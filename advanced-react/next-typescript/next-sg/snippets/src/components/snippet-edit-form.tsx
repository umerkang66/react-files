'use client';

import { type Snippet } from '@prisma/client';
import Editor from '@monaco-editor/react';
import { useState } from 'react';

import * as actions from '@/actions';

interface Props {
  snippet: Snippet;
}

function SnippetEditForm({ snippet }: Props) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        onChange={handleEditorChange}
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}

export default SnippetEditForm;
