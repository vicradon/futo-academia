import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

function HtmlEditor()  {
  const { quill, quillRef } = useQuill();

  console.log(quill);    // undefined > Quill Object
  console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  return (
    <div className='editor' style={{ width: 860, height: 184 }}>
         <div ref={quillRef} />
      </div>
  );
};
export default HtmlEditor;
