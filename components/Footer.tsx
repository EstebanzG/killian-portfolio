import {FaInstagram} from "react-icons/fa";
import {FiPhone} from "react-icons/fi";
import {IoMailOutline} from "react-icons/io5";

export function Footer() {

  return (
    <footer
      className={"flex flex-col-reverse gap-5 md:flex-row md:justify-between md:items-center text-white w-full text-xs"}>
      <span>© Killian GOMEZ – Tous droits réservés. - Toute reproduction ou utilisation interdite sans autorisation.</span>
      <span className={"flex gap-2 items-center"}>
        <a href="mailto:gomez.killian@outlook.fr"><IoMailOutline size={27}/></a>
        <a href="tel:+33627896570"><FiPhone size={20}/></a>
        <a href="https://www.instagram.com/killian.gmz/"><FaInstagram size={20}/></a>
      </span>
    </footer>
  );
}
