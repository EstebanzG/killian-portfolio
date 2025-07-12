import {useState} from "react";
import {Photo} from "@/types/photos";
import Image from "next/image";
import Loader from "@/components/loader";

interface Props {
  photo: Photo;
  onClick: () => void;
}

export function PhotoCard({photo, onClick}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="cursor-pointer transition-transform ease-linear delay-150 hover:scale-[1.05] duration-150
                 relative h-[300px] aspect-[3/2] max-w-full"
      onClick={onClick}
    >
      {!loaded && (
        <Loader/>
      )}
      <Image
        src={photo.thumbnail}
        alt={photo.name || "Image"}
        className="transition-opacity duration-300"
        fill
        style={{objectFit: 'cover', opacity: loaded ? 1 : 0}}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={75}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
