import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {useState} from "react";
import {Menu} from "./Menu.ts";
import Button from "./components/Button.tsx";


function App() {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.PHOTO);

  const photos: Record<string, { default: string }> = import.meta.glob("/src/assets/photos/*.png", { eager: true });
  const imageUrls = Object.values(photos).map((img) => img.default);

  return (
    <>
      <Header/>
      <div className={"mb-5 flex flex-col justify-between w-full p-5 text-white"}>
        <nav className="sticky top-5 z-10 mix-blend-difference">
          <div className="flex justify-between md:hidden">
            {Object.values(Menu).map((menuItem) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
            {imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Photo ${index + 1}`}
                className="w-full h-[300px] object-cover"
              />
            ))}
          </div>
        )}

        <Footer/>
      </div>
    </>
  );
}

export default App;
