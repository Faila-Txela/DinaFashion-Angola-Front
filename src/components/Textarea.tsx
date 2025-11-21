type TextareaProps = {
    title: string; 
    name: string; 
    addClassName: string;
}

export default function({title, name, addClassName} :TextareaProps) {
  return (
    <div>
        <textarea 
        name={name} 
        title={title}>
        className={`w-full p-3 outline-none border-[1px] rounded-[3px] ${addClassName} `}
        </textarea>
    </div>
  )
}
