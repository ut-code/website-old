import AnchorButton from "./AnchorButton";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-black flex px-28 pt-8">
      <div>
        <a href="/">
          <Logo variant="light" className="hidden md:block w-48" />
        </a>
        <div className="text-white mt-4 text-lg">東京大学工学部傘下</div>
        <div className="text-white">学生会館2階 313号室</div>
        <AnchorButton variant="small" href="/" className="my-10">
          問い合わせ
        </AnchorButton>
      </div>
      <div className="ml-56">
        <ul className="text-white text-lg flex flex-wrap">
          <li className="w-64 mb-4">リンク</li>
          <li className="w-64 mb-4">リンク</li>
          <li className="w-64 mb-4">リンク</li>
          <li className="w-64 mb-4">リンク</li>
          <li className="w-64 mb-4">リンク</li>
          <li className="w-64 mb-4">リンク</li>
        </ul>
      </div>
    </footer>
  );
}
