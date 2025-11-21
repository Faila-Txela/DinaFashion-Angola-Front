interface Button {
  type: "button" | "submit" | "reset";
  title: string;
  name: string;
  disabled?: boolean;
  onClick?: any;
  addClassName?: string;
}


export default function({type, title, name, addClassName}: Button) {
  return (
    <div>
        <button 
        type={type} 
        title={title} 
        className={addClassName}>
          {name}
        </button>
    </div>
  )
}
