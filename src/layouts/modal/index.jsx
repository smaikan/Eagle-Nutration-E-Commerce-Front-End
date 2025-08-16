const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-[0.06]  flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg border-black shadow-sm w-full max-w-3xl h-auto relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
