"use client";

import { Video } from "@/types/video";

interface Props {
  video: Video;
  onClickAction: () => void;
}

export function VideoCard({ video, onClickAction }: Props) {
  return (
    <div className="cursor-pointer transition-transform ease-linear delay-150 hover:scale-[1.05] duration-150" onClick={onClickAction}>
      <img src={video.thumbnail} alt={video.title} className="rounded-lg" />
    </div>
  );
}
