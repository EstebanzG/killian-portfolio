"use client";

import {useEffect, useState} from "react";
import Button from "@/components/Button";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import {Photo} from "@/types/photos";
import {PhotoCard} from "@/components/PhotoCard";
import {IoMailOutline} from "react-icons/io5";
import {FiPhone} from "react-icons/fi";
import {FaInstagram} from "react-icons/fa";
import {Video} from "@/types/video";
import VideoModal from "@/components/VideoModal";
import {VideoCard} from "@/components/VideoCard";
import PhotoModal from "@/components/PhotoModal";
import Loader from "@/components/loader";
import { Analytics } from "@vercel/analytics/next"


enum Menu {
  PHOTO = "Photographie",
  VIDEO = "Vidéo",
  CONTACT = "Contact",
}

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.PHOTO);
  const [modalOpen, setModalOpen] = useState(false);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [photosLoading, setPhotosLoading] = useState(false);

  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videosLoading, setVideosLoading] = useState(false);

  useEffect(() => {
    setPhotosLoading(true);
    fetch("/api/photos")
      .then((res) => res.json())
      .then(setPhotos)
      .finally(() => setPhotosLoading(false));

    setVideosLoading(true);
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data.videos))
      .finally(() => setVideosLoading(false));
  }, []);

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const openModal = (photo: Photo) => {
    setSelectedImage(photo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedVideo(null);
    setModalOpen(false);
  };

  return (
    <>
      <Analytics/>
      <Header/>

      <div className="mb-5 flex flex-col justify-between w-full p-5 text-white max-w-screen-2xl mx-auto">
        <nav className="sticky top-5 z-10 mix-blend-difference">
          <div className="flex justify-between md:hidden">
            {Object.values(Menu).map((menuItem) => (
              <button
                key={menuItem}
                className={selectedMenu === menuItem ? "underline" : ""}
                onClick={() => setSelectedMenu(menuItem)}
              >
                {menuItem}
              </button>
            ))}
          </div>
          <div className="hidden md:flex md:gap-5">
            {Object.values(Menu).map((menuItem) => (
              <Button
                key={menuItem}
                isSelected={selectedMenu === menuItem}
                onClick={() => setSelectedMenu(menuItem)}
              >
                {menuItem}
              </Button>
            ))}
          </div>
        </nav>

        {selectedMenu === Menu.PHOTO && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-10 relative">
            {photosLoading ? (
              <Loader/>
            ) : (
              photos.map((photo, index) => (
                <PhotoCard photo={photo} onClick={() => openModal(photo)} key={index}/>
              ))
            )}
          </div>
        )}

        {selectedMenu === Menu.VIDEO && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-10 relative">
            {videosLoading ? (
                <Loader />
            ) : (
              videos.map((video, index) => (
                <VideoCard video={video} onClickAction={() => openVideoModal(video)} key={index}/>
              ))
            )}
          </div>
        )}

        {selectedMenu === Menu.CONTACT && (
          <div className="flex flex-col gap-4 py-10 md:text-2xl font-semibold">
            <a className="flex items-end gap-2" href="mailto:killiangomez@outlook.fr">
              <span className="w-[7%] md:w-[3%] flex justify-end">
                <IoMailOutline size={40}/>
              </span>
              killiangomez@outlook.fr
            </a>
            <a className="flex items-end gap-2" href="tel:+33627896570">
              <span className="w-[7%] md:w-[3%] flex justify-end">
                <FiPhone size={30}/>
              </span>
              +33 (0)6 27 89 65 70
            </a>
            <a className="flex items-end gap-2" href="https://www.instagram.com/killian.gmz/">
              <span className="w-[7%] md:w-[3%] flex justify-end">
                <FaInstagram size={32}/>
              </span>
              killian.gmz
            </a>
          </div>
        )}

        <Footer/>
      </div>

      {selectedImage && modalOpen && (
        <PhotoModal onCloseAction={closeModal} photo={selectedImage}/>
      )}

      {selectedVideo && modalOpen && (
        <VideoModal onCloseAction={closeModal} video={selectedVideo}/>
      )}
    </>
  );
}
