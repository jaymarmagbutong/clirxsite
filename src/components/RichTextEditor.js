import dynamic from 'next/dynamic';
import { useState } from 'react';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

function MyEditor() {
  const [content, setContent] = useState("");

  return (
    <JoditEditor
      value={content}
      onChange={(newContent) => setContent(newContent)}
    />
  );
}

export default MyEditor;
