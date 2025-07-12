import React, {useEffect} from "react";
import {IoCloseOutline} from "react-icons/io5";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({onClose, children}: Props) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4 pb-0">
      {children}
      <button
        onClick={onClose}
        className="mt-6 flex items-center justify-center text-white hover:text-gray-300 transition pt-0 md:p-5 cursor-pointer"
        aria-label="Fermer la modale"
      >
        <IoCloseOutline size={30}/>
      </button>
    </div>
  );
}