import { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import QuillResizeImage from 'quill-resize-image';

Quill.register('modules/resize', QuillResizeImage);

export const TextEditor = ({ value, onChange, readOnly = false }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
          const file = input.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const range = quillRef.current.getSelection(true);
              quillRef.current.insertEmbed(
                range.index,
                'image',
                e.target.result
              );
            };
            reader.readAsDataURL(file);
          }
        };
      };

      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: !readOnly && {
            container: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ list: 'ordered' }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              ['link', 'image', 'video'],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['clean'],
            ],
            handlers: {
              image: imageHandler,
            },
          },
          ...(!readOnly && {
            resize: {
              locale: {},
            },
          }),
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
          'video',
          'color',
          'background',
          'align',
        ],
        readOnly,
      });

      quillRef.current.root.addEventListener('drop', (e) => {
        e.preventDefault();
      });

      editorRef.current.addEventListener('drop', (e) => {
        e.preventDefault();
        const range = quillRef.current.getSelection();
        const file = e.dataTransfer.files[0];

        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function (event) {
            if (range) {
              quillRef.current.insertEmbed(
                range.index,
                'image',
                event.target.result
              );
            } else {
              quillRef.current.clipboard.dangerouslyPasteHTML(
                quillRef.current.getLength(),
                `<img src="${event.target.result}" />`
              );
            }
          };
          reader.readAsDataURL(file);
        }
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
