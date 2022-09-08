import ContentContainer from "../components/ContentContainer";
import NormalHeader from "../components/NormalHeader";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <ContentContainer>
        <NormalHeader />
      </ContentContainer>
      <ContentContainer className="prose lg:prose-lg max-w-4xl p-20">
        <h1>お問い合わせ</h1>
        <div>
          入会希望の方はTwitterまたはLINEでご連絡ください。いつでもお待ちしております。
        </div>
        <ul>
          <li>
            <span>公式LINE</span>
            <a className="ml-4" href="https://line.me/ti/p/%40nlr3843e">
              @nlr3843e
            </a>
          </li>
          <li>
            <span>公式Twitter</span>
            <a className="ml-4" href="https://twitter.com/utokyo_code">
              @utokyo_code
            </a>
          </li>
        </ul>
      </ContentContainer>
      <Footer />
    </>
  );
}
