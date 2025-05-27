import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import Button from "./components/Button.tsx";
import {useState} from "react";
import {Menu} from "./Menu.ts";

function App() {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.PHOTO);

  return (
    <>
      <Header />
      <div className={"h-screen mb-5 flex flex-col justify-between"}>
        <nav className={"flex gap-5 max-w-screen overflow-hidden"}>
          {Object.values(Menu).map((menuItem) => (
            <Button
              key={menuItem}
              isSelected={selectedMenu === menuItem}
              onClick={() => setSelectedMenu(menuItem)}
            >
              {menuItem}
            </Button>
          ))}
        </nav>
        <Footer />
      </div>
    </>
  );
}

export default App;
