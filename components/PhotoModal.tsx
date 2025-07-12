import Image from "next/image";
import clsx from "clsx";
import React, {useState} from "react";
import {Photo} from "@/types/photos";
import Modal from "@/components/Modal";

export default function PhotoModal({ photo, onCloseAction }: { photo: Photo; onCloseAction: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Modal onClose={onCloseAction}>
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
    </Modal>
  )
}