import { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export const TextEditor = ({ value, onChange, readOnly = false }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: !readOnly && [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            ['link', 'image'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
          ],
        },
        formats: [
          'header',
          'font',
          'list',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'link',
          'image',
          'color',
          'background',
          'align',
        ],
        readOnly,
      });

      quillRef.current.on('text-change', () => {
        const content = quillRef.current.root.innerHTML;
        onChange(content);
      });
    }

    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value, onChange, readOnly]);

  return <div ref={editorRef} />;
};
