interface ModalProps {
  user: string;
  email: string;
  children: React.ReactNode;
}

export default function Modal(props: ModalProps) {
    
    console.log(props);

  return (
    <div className="p-7 border-2 border-black rounded-md">
        <strong>{props.user}</strong>
        <a href="#">{props.email}</a>
        <p>{props.children}</p>
    </div>
  )
}
