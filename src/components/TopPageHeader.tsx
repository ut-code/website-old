import AnchorButton from "./AnchorButton";
import Logo from "./Logo";

export default function TopPageHeader() {
  return (
    <header className="flex mt-12">
      <a href="/">
        <Logo variant="light" className="md:hidden w-32 sm:w-48" />
        <Logo variant="default" className="hidden md:block w-48" />
      </a>
      <nav className="ml-auto">
        <ul className="list-none flex items-center">
          <li className="mx-8 text-white text-lg">
            <a href="/">お知らせ</a>
          </li>
          <li className="mx-8 text-white text-lg">
            <a href="/blog">ブログ</a>
          </li>
          <li className="mx-8 text-white text-lg">
            <a href="/our-mission">活動理念</a>
          </li>
          <li className="mx-8">
            <AnchorButton variant="medium" href="/contact">
              お問い合わせ
            </AnchorButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}
