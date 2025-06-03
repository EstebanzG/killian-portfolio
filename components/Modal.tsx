import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Photo } from "@/common/photos";
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  onClose: () => void;
  photo: Photo;
}

export function Modal({ onClose, photo }: Props) {
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4 pb-0">
      <div className="relative w-full max-w-5xl h-[80vh]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={photo.fullSize}
          alt={photo.name || "Image"}
          className={clsx(
            "transition-opacity duration-300 pointer-events-none",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
          style={{ objectFit: "contain" }}
          quality={100}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <button
        onClick={onClose}
        className="mt-6 flex items-center justify-center text-white hover:text-gray-300 transition pt-0 md:p-5 cursor-pointer"
        aria-label="Fermer la modale"
      >
        <IoCloseOutline size={30} />
      </button>
    </div>
  );
}

export default Modal;
