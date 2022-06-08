import Logo from "./Logo";

export default function NormalHeader() {
  return (
    <header className="flex py-6 border-b-2 border-solid items-center">
      <a className="pl-8" href="/">
        <Logo variant="light" className="md:hidden w-32 sm:w-48" />
        <Logo variant="default" className="hidden md:block w-48" />
      </a>
      <nav className="ml-auto">
        <ul className="list-none flex items-center">
          <li className="mx-8 text-lg">
            <a href="/">お知らせ</a>
          </li>
          <li className="mx-8 text-lg">
            <a href="/blog">ブログ</a>
          </li>
          <li className="mx-8 text-lg">
            <a href="/our-mission">活動理念</a>
          </li>
          <li className="mx-8">
            <a href="/">お問い合わせ</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
