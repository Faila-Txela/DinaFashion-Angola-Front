import {type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface ModalProps {
    isOpen: boolean;
    title?: string;
    onClose: () => void;
    onConfirm?: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, title, onClose, children, onConfirm}) =>{
    // Fecha o modal ao pressionar a tecla Esc

    useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      
      {/* Container do Modal */}
      <div 
        className="bg-white w-full max-w-md rounded-lg shadow-xl flex flex-col max-h-[90vh] overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <Button 
            title="close"
            type="button"
            onClick={onClose}
            addClassName="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            ✕
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 text-gray-600 overflow-y-auto flex-grow">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 bg-gray-50 border-t flex-shrink-0">
          <Button  
            title="cancelar"
            type="button"
            name="Cancelar"
            onClick={onClose}
            addClassName="px-4 py-2 text-sm font-medium text-gray-700 bg-white cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50"
          />
          
          <Button 
            title="confirmar" 
            type="button"
            name="Confirmar"
            onClick={() => onConfirm?.()}
            addClassName="px-4 py-2 text-sm font-medium text-white bg-blue-600 cursor-pointer rounded-md hover:bg-blue-700"
          />
          </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;