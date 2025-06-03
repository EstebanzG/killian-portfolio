"use client"
import {useEffect, useState} from "react";
import Button from "@/components/Button";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import {Photo} from "@/common/photos";
import {PhotoCard} from "@/components/PhotoCard";
import Modal from "@/components/Modal";
import {IoMailOutline} from "react-icons/io5";
import {FiPhone} from "react-icons/fi";
import {FaInstagram} from "react-icons/fa";

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

        {selectedMenu === Menu.VIDEO && (
          <div className="flex flex-col justify-center h-[20vh]">
            <h2 className="text-2xl mb-5">Vidéo à venir</h2>
            <p className="text-lg">Restez connecté pour plus d'informations.</p>
          </div>
        )}

        {selectedMenu === Menu.CONTACT && (
          <div className="flex flex-col py-10 md:text-4xl font-bold">
            <a className={"flex items-center gap-2"} href="mailto:killiangomez@outlook.fr">
              <span className={'w-[7%] md:w-[3%] flex justify-end'}><IoMailOutline size={40}/></span>
              killiangomez@outlook.fr
            </a>
            <a className={"flex items-center gap-2"} href="tel:+33627896570">
              <span className={'w-[7%] md:w-[3%] flex justify-end'}><FiPhone size={30}/></span>
              +33 (0)6 27 89 65 70
            </a>
            <a className={"flex items-center gap-2"} href="https://www.instagram.com/killian.gmz/">
              <span className={'w-[7%] md:w-[3%] flex justify-end'}><FaInstagram size={32}/></span>
              killian.gmz
            </a>
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
