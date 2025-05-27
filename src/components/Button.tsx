import type {ReactNode} from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  isSelected?: boolean;
}

export default function Button({children, onClick, isSelected = false, }: Props) {
  return (
    <button className={`px-10 py-3 rounded-full cursor-pointer ${isSelected ? "bg-white" : "text-white hover:outline hover:outline-amber-200"}`} onClick={onClick}>
      {children}
    </button>
  );

}