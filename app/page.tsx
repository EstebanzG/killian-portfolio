"use client"
import {useEffect, useState} from "react";
import Button from "@/components/Button";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import Modal from "@/components/Modal";
import {Photo} from "@/common/photos";
import {PhotoCard} from "@/components/PhotoCard";

enum Menu {
  PHOTO = "Photographie",
  VIDEO = "Vidéo",
  CONTACT = "Contact",
}

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.PHOTO);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  useEffect(() => {
    fetch("/api/photos")
      .then(res => res.json())
      .then(setPhotos);
  }, []);

  const openModal = (photo: Photo) => {
    setSelectedImage(photo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header/>
      <div className="mb-5 flex flex-col justify-between w-full p-5 text-white">
        <nav className="sticky top-5 z-10 mix-blend-difference">
          <div className="flex justify-between md:hidden">
            {Object.values(Menu).map(menuItem => (
              <button
                key={menuItem}
                className={`${selectedMenu === menuItem ? "underline" : ""}`}
                onClick={() => setSelectedMenu(menuItem)}
              >
                {menuItem}
              </button>
            ))}
          </div>
          <div className="hidden md:flex md:gap-5">
            {Object.values(Menu).map(menuItem => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
            {photos.map((photo, index) =>
              <PhotoCard photo={photo} onClick={() => openModal(photo)} key={index}/>
            )}
          </div>
        )}

        <Footer/>
      </div>

      {selectedImage && modalOpen && (
        <Modal
          onClose={closeModal}
          photo={selectedImage}
        />
      )}
    </>
  );
}
