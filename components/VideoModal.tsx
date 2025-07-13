import {Video} from "@/types/video";
import Modal from "@/components/Modal";

interface Props {
  video: Video;
  onCloseAction: () => void;
}

export default function VideoModal({video, onCloseAction}: Props) {
  return (
    <Modal onClose={onCloseAction}>
        <div className={"bg-[#1B1C1F] p-5 rounded-lg md:w-1/2 flex flex-col items-center gap-5 overflow-scroll"}>
          <h2 className="text-lg text-white font-bold">{video.title}</h2>
          <p className="text-lg text-white font-light">{video.description}</p>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={video.embedUrl}
              allowFullScreen
            ></iframe>
          </div>
        </div>
    </Modal>
  );
}
