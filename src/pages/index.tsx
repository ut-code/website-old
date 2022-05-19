import fs from "fs";
import path from "path";
import matter from "gray-matter";
import homeHeroBackgroundPcImage from "../../resources/home-hero-background-pc.svg";
import conceptImage from "../../resources/concept.svg";
import homeGoalLearningImage from "../../resources/home-goal-learning.svg";
import homeGoalCommunityImage from "../../resources/home-goal-community.svg";
import homeGoalDevelopmentImage from "../../resources/home-goal-development.svg";
import AnchorButton from "../components/AnchorButton";
import ContentContainer from "../components/ContentContainer";
import Header from "../components/Header";
import Logo from "../components/Logo";
import ExplanationBox, { List } from "../components/ExplanationBox";
import Post from "../components/Post";
import Footer from "../components/Footer";

export function Keyvisual() {
  return (
    <div className="relative md:h-[48rem] overflow-hidden">
      {/* 背景画像 */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#003fff] to-[#000091]"
      />
      <div
        aria-hidden
        className="hidden md:block absolute top-0 left-0 w-full h-full"
      >
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-b from-[#f5f6ff] to-[#ecf1ff]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-[#003fff] to-[#000091]" />
        <div className="absolute top-0 left-[calc(50%-32rem)] w-[64rem] h-[48rem]">
          <img
            className="w-[64rem] h-[48rem]"
            alt=""
            src={homeHeroBackgroundPcImage.src}
          />
        </div>
      </div>
      <ContentContainer className="flex flex-col relative h-full">
        <Header />
        <div className="flex-grow md:flex items-center mt-8 md:mt-0">
          <div className="flex-grow">
            <div className="text-3xl sm:text-5xl sm:leading-tight md:text-3xl md:leading-normal lg:text-5xl lg:leading-tight xl:text-6xl xl:leading-tight font-extrabold">
              <span className="text-white md:text-black">東京大学の</span>
              <br />
              <span className="text-primary-main">
                ソフトウェア
                <br />
                エンジニアリング
                <br />
              </span>
              <span className="text-white md:text-black">コミュニティ</span>
            </div>
            <AnchorButton variant="large" href="/" className="mt-6">
              JOIN US
            </AnchorButton>
          </div>
          <img
            alt=""
            src={conceptImage.src}
            className="w-[24rem] mt-8 md:mt-0 md:w-[24rem] lg:w-[30rem] xl:w-[36rem] mx-auto"
          />
        </div>
      </ContentContainer>
    </div>
  );
}

export function AboutCircle() {
  return (
    <div className="mx-8">
      <p className="text-center mt-40 text-xl leading-loose tracking-widest">
        ut.code();のウェブサイトへようこそ！
      </p>
      <p className="text-center text-xl leading-loose tracking-widest">
        私たちは東京大学のソフトウェアエンジニアリングサークルです！
      </p>
      <div className="text-center  text-5xl font-extrabold mt-10">
        私たちの<span className="text-green-400">活動</span>
      </div>
      {[
        {
          title: "①　開発",
          text: "私たちはコミュニティのメンバーがプログラミングの技術の習得を行えるような活動を行います。例えば各プログラミング言語やソフトウェア技術に関する講習会を開き、プログラミングに関する技術を教えます。また、コミュニティのメンバーが学習を進める上で、指針となりうるような教材の作成を行います。さらに、ハッカソンを通じて実践的な開発技術の習得を目指します。",
          src: homeGoalLearningImage,
        },
        {
          title: "②　交流",
          text: "大規模なプロジェクトを行ううえで、技術者同士の交流があることは欠かせません。私たちはコミュニティのメンバーが互いに親睦を深め、唯一無二の関係を構築できる場を提供します。様々な開発をチームに分かれて行いチーム内での結束力を高めることで、将来的に様々な場面でかかわり開発を行えるような関係の構築を目指します。",
          src: homeGoalCommunityImage,
        },
        {
          title: "③　開発",
          text: "大学という学問の府において、私たちはアカデミックな知識だけでなく実践的な技術の習得を目指します。そのためにサークル内でチームを組みプロジェクトを立ち上げ、社会に実際にインパクトを与えるプロダクトの開発を行います。開発を通じて社会に何が必要かを考え、次世代のパイオニアリングエンジニアを社会へ送り出すことを目指します。",
          src: homeGoalDevelopmentImage,
        },
      ].map((element: List) => (
        <ExplanationBox
          key="key"
          title={element.title}
          text={element.text}
          src={element.src}
        />
      ))}
    </div>
  );
}

export function BlueBar() {
  return (
    <div className="flex items-center bg-gradient-to-b from-[#003fff] to-[#000091] h-64">
      <div className="text-white pl-44">
        <div className="text-3xl tracking-widest leading-relaxed font-extrabold">
          <p>一緒にプログラミング、</p>
          <p>始めてみませんか？</p>
        </div>
        <p className="tracking-widest font-light text-lg">
          初心者の方も上級者の方も歓迎します
        </p>
      </div>
      <div className="ml-auto mr-44 ">
        <Logo variant="light" className="hidden md:block w-56" />
        <AnchorButton variant="large" href="/" className="mt-10">
          今すぐ連絡する
        </AnchorButton>
      </div>
    </div>
  );
}

export function Schedule() {
  return (
    <div>
      <div className="text-5xl font-extrabold tracking-widest text-center mt-28">
        <span className="text-green-400">年間</span>カレンダー
      </div>
      <ul className="mt-10">
        <li>
          <div className="border-l-2 border-dotted ml-48 pb-20">
            <div className="flex items-center">
              <div className="bg-green-400 -translate-x-32 text-white p-2 font-extrabold text-lg tracking-wide">
                4/10
              </div>
              <div className="bg-green-400 -translate-x-32 text-white p-2 font-extrabold text-lg tracking-wide">
                SUN
              </div>
              <div className="bg-white rounded-full border-solid border-green-500 absolute border-2 w-6 h-6 -translate-x-1/2" />
              <div className="w-3 bg-green-500 absolute rounded-full h-3 -translate-x-1/2" />
              <div className="text-4xl">新歓</div>
            </div>
            <div className="ml-8 mx-28">
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森
              で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
              またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼
              のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパ
              ーゴなど、
            </div>
          </div>
        </li>
        <li>
          <div className="border-l-2 border-dotted ml-48 pb-20">
            <div className="flex items-center">
              <div className="bg-green-400 -translate-x-32 text-white p-2 font-extrabold text-lg tracking-wide">
                4/10
              </div>
              <div className="bg-green-400 -translate-x-32 text-white p-2 font-extrabold text-lg tracking-wide">
                SUN
              </div>
              <div className="bg-white rounded-full border-solid border-green-500 absolute border-2 w-6 h-6 -translate-x-1/2" />
              <div className="w-3 bg-green-500 absolute rounded-full h-3 -translate-x-1/2" />
              <div className="text-4xl">新歓</div>
            </div>
            <div className="ml-8 mx-28">
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森
              で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
              またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼
              のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパ
              ーゴなど、
            </div>
          </div>
        </li>
        <li>
          <div className="border-l-2 border-dotted ml-48 pb-20">
            <div className="flex items-center">
              <div className="bg-green-400 -translate-x-32 text-white p-2 font-extrabold text-lg tracking-wide">
                4/10
              </div>
              <div className="bg-green-400 -translate-x-32 text-white p-2 font-extrabold text-lg tracking-wide">
                SUN
              </div>
              <div className="bg-white rounded-full border-solid border-green-500 absolute border-2 w-6 h-6 -translate-x-1/2" />
              <div className="w-3 bg-green-500 absolute rounded-full h-3 -translate-x-1/2" />
              <div className="text-4xl">新歓</div>
            </div>
            <div className="ml-8 mx-28">
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森
              で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
              またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼
              のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパ
              ーゴなど、
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export function ActivityHistory({ posts }) {
  return (
    <div className="bg-gray-100 pt-28 px-28 ">
      <div className="text-5xl font-extrabold tracking-widest text-center">
        活動履歴
      </div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <div className="flex mt-20">
        <div className="bg-gray-300 w-2/3 h-44" />
        <div className="ml-14">
          <div>2022年1月2日</div>
          <h3 className="text-xl font-extrabold mb-5">吾輩は猫である</h3>
          <div className="tracking-wider leading-relaxed">
            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森
            で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
            またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼
            のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパ
            ーゴなど、
          </div>
        </div>
      </div>
      <div className="flex">
        <a
          href="/"
          className="text-green-400 tracking-widest text-xl font-extrabold ml-auto my-14 hover:brightness-110"
        >
          もっと見る
        </a>
      </div>
    </div>
  );
}

export default function Home({ posts }) {
  return (
    <>
      <Keyvisual />
      <AboutCircle />
      <BlueBar />
      <Schedule />
      <ActivityHistory posts={posts} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });
  return {
    props: {
      posts,
    },
  };
}
