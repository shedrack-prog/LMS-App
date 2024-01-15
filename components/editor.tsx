'use client';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

interface EditorProps {
  onChange: () => void;
  value: string;
}
export const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill onChange={onChange} value={value} theme="snow" />
    </div>
  );
};
