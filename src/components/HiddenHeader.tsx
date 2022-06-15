import { useState, useEffect } from "react";

export default function HiddenHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.scrollY > 700) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <header
      className={
        isVisible
          ? "fixed opacity-100 w-full bg-white z-50 transition border-b-2 border-black"
          : "fixed opacity-0 w-full bg-white z-50 transition border-b-2 border-black"
      }
    >
      <nav>
        <ul className="grid grid-cols-4 gap-0 text-center">
          <li className="hover:bg-blue-300 transition-colors tracking-widest text-lg py-1">
            お知らせ
          </li>
          <li className="hover:bg-blue-300 transition-colors tracking-widest text-lg py-1">
            ブログ
          </li>
          <li className="hover:bg-blue-300 transition-colors tracking-widest text-lg py-1 border-l-2">
            活動理念
          </li>
          <li className="hover:bg-blue-300 transition-colors tracking-widest text-lg py-1 border-l-2">
            お問い合わせ
          </li>
        </ul>
      </nav>
    </header>
  );
}
