import {type ChangeEventHandler } from 'react';

type InputProps = {
  title?: string; 
  id: string;
  type: string; 
  value?: string | number;
  addClassName: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}


export default function({title, type, addClassName, onChange, placeholder, value} :InputProps) {
  return (
    <div>
      <input 
      type={type} 
      title={title} 
      className={`w-full px-3 py-2 outline-none border rounded-lg ${addClassName} `}  
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      />
    </div>
  )
}
