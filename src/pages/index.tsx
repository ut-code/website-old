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
import Logo from "../components/Logo";
import ExplanationBox, { List } from "../components/ExplanationBox";
import Post, { PostType, PostsType } from "../components/Post";
import TopPageHeader from "../components/TopPageHeader";
import Footer from "../components/Footer";
import sortByDate from "../../utils/index";
import Event from "../components/Event";

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
        <TopPageHeader />
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
  const events = [
    {
      date: "4月 下旬",
      name: "新歓体験会",
      content:
        "春の新歓体験会で、HTMLやJavaScriptの使い方など、web開発の基礎となる技術について学ぶ講座を開きます。また、実際に小規模のフロントエンドアプリを作成し、技術の定着を図ります。",
    },
    {
      date: "5月 初旬",
      name: "ゴールデンウィークイベント",
      content:
        "ゴールデンウィーク期間に、２日間かけてフロントエンド開発とバックエンド開発の基礎を学びます。サーバーの構築方法からデプロイの方法まで、実際の開発現場で使われる技術を習得します。",
    },
    {
      date: "5月 中旬",
      name: "五月祭",
      content:
        "東京大学の学園祭の1つ、五月祭に出展します。企画チームごとに作成したものや企画したものを用いて、web開発技術の魅力や技法を伝えます。大規模な学園祭であり、企画グランプリでの入賞を狙い、冬ごろから3か月ほどかけて作品を練り上げます。",
    },
    {
      date: "6月 中旬",
      name: "ハッカソン",
      content:
        "2日間でグループに分かれて集中的に開発を行い、グループごとに1つのプロダクトを完成させます。実際の作業を通して、実践的なweb開発技術を身につけます。",
    },
    {
      date: "8月 中旬",
      name: "夏新歓",
      content:
        "4月から6月にかけて行った学習カリキュラムや講座をを夏でもう一度行います。春に新歓に参加できなかった人や、もう一度復習がしたいという人向けにキャッチアップを行います。",
    },
    {
      date: "11月 下旬",
      name: "駒場祭",
      content:
        "東京大学の学園祭の1つ、駒場祭に出展します。企画チームごとに作成したものや企画したものを用いて、web開発技術の魅力や技法を伝えます。1年と2年が主体となる学園祭であり、企画準備を通してさらなる技術の向上に努めます。",
    },
  ];
  return (
    <div>
      <div className="text-5xl font-extrabold tracking-widest text-center mt-28">
        <span className="text-green-400">年間</span>カレンダー
      </div>
      <div className="tracking-widest leading-loose text-center my-5">
        <div>ut.code()での主なイベントの日程です。</div>
        <div>
          個々のイベントや常時稼働しているプロジェクトの詳細はSNSやウェブサイトのお知らせでご確認ください。
        </div>
      </div>
      <ul className="my-10">
        {events.map((event) => (
          <li>
            <Event
              date={event.date}
              name={event.name}
              content={event.content}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ActivityHistory({ posts }: { posts: PostsType }) {
  return (
    <div className="bg-gray-100 pt-28 px-28 ">
      <div className="text-5xl font-extrabold tracking-widest text-center">
        活動履歴
      </div>
      {posts.map((post: PostType) => (
        <Post key={post.slug} post={post} />
      ))}
      <div className="flex">
        <a
          href="/blog"
          className="text-green-400 tracking-widest text-xl font-extrabold ml-auto my-14 hover:brightness-110"
        >
          もっと見る
        </a>
      </div>
    </div>
  );
}

export default function Home({ posts }: { posts: PostsType }) {
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
      posts: posts.sort(sortByDate).slice(0, 3),
    },
  };
}
