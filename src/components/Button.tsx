interface Button {
  type: "button" | "submit" | "reset";
  title: string;
  name?: string;
  disabled?: boolean;
  onClick: () => void;
  addClassName: string;
  children?: React.ReactNode;
}

export default function({ type, title, name, addClassName, onClick, disabled, children }: Button) {
  return (
    <div>
        <button 
          type={type} 
          title={title} 
          disabled={disabled} 
          onClick={onClick}   
          className={addClassName}
        >
          {children || name}
        </button>
    </div>
  )
}