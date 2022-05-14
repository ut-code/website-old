import Image from "next/image";
import homeHeroBackgroundPcImage from "../../resources/home-hero-background-pc.svg";
import conceptImage from "../../resources/concept.svg";
import homeGoalLearningImage from "../../resources/home-goal-learning.svg";
import homeGoalCommunityImage from "../../resources/home-goal-community.svg";
import homeGoalDevelopmentImage from "../../resources/home-goal-development.svg";
import AnchorButton from "../components/AnchorButton";
import ContentContainer from "../components/ContentContainer";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
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
              <AnchorButton variant="large" href="/sample" className="mt-6">
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
      <ContentContainer>
        <p className="text-center mt-40 text-lg">
          ut.code();のウェブサイトへようこそ！
        </p>
        <p className="text-center text-lg">
          私たちは東京大学のソフトウェアエンジニアリングサークルです！
        </p>
        <div className="text-center mt-20 text-5xl font-extrabold">
          私たちの<span className="text-green-400">活動</span>
        </div>
        <div className="lg: grid grid-cols-3 gap-12 max-w-screen-xl mx-auto">
          {[
            {
              title: "学習",
              image: homeGoalLearningImage,
              description:
                "私たちはコミュニティのメンバーがプログラミングの技術の習得を行えるような活動を行います。例えば各プログラミング言語やソフトウェア技術に関する講習会を開き、プログラミングに関する技術を教えます。また、コミュニティのメンバーが学習を進める上で、指針となりうるような教材の作成を行います。さらに、ハッカソンを通じて実践的な開発技術の習得を目指します。",
            },
            {
              title: "交流",
              image: homeGoalCommunityImage,
              description:
                "大規模なプロジェクトを行ううえで、技術者同士の交流があることは欠かせません。私たちはコミュニティのメンバーが互いに親睦を深め、唯一無二の関係を構築できる場を提供します。様々な開発をチームに分かれて行いチーム内での結束力を高めることで、将来的に様々な場面でかかわり開発を行えるような関係の構築を目指します。",
            },
            {
              title: "開発",
              image: homeGoalDevelopmentImage,
              description:
                "私たちはコミュニティのメンバーがプログラミングの技術の習得を行えるような活動を行います。例えば各プログラミング言語やソフトウェア技術に関する講習会を開き、プログラミングに関する技術を教えます。また、コミュニティのメンバーが学習を進める上で、指針となりうるような教材の作成を行います。さらに、ハッカソンを通じて実践的な開発技術の習得を目指します。",
            },
          ].map(({ title, image, description }) => (
            <div key={title} className="mt-10">
              <div className="text-center font-extrabold text-4xl">{title}</div>
              <Image layout="responsive" src={image} />
              <div className="mt-20 leading-loose tracking-widest text-xl">
                {description}
              </div>
            </div>
          ))}
        </div>
      </ContentContainer>
    </>
  );
}
