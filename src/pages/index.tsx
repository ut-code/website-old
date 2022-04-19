import Image from "next/image";
import homeHeroBackgroundPcImage from "../../resources/home-hero-background-pc.svg";
import conceptImage from "../../resources/concept.svg";
import homeGoalLearningImage from "../../resources/home-goal-learning.svg";
import homeGoalCommunityImage from "../../resources/home-goal-community.svg";
import homeGoalDevelopmentImage from "../../resources/home-goal-development.svg";
import Logo from "../components/Logo";
import AnchorButton from "../components/AnchorButton";
import ContentContainer from "../components/ContentContainer";

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
          <header className="flex mt-12">
            <Logo variant="light" className="md:hidden w-32 sm:w-48" />
            <Logo variant="default" className="hidden md:block w-48" />
          </header>
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
      <ContentContainer>
        <div className="lg: grid grid-cols-3 gap-12 max-w-screen-xl mx-auto">
          {[
            {
              title: "学習",
              image: homeGoalLearningImage,
              description: "吾輩は猫である",
            },
            {
              title: "交流",
              image: homeGoalCommunityImage,
              description: "吾輩は猫である",
            },
            {
              title: "開発",
              image: homeGoalDevelopmentImage,
              description: "開発を行います",
            },
          ].map(({ title, image, description }) => (
            <div key={title}>
              <div>{title}</div>
              <Image layout="responsive" src={image} />
              <div>{description}</div>
            </div>
          ))}
        </div>
      </ContentContainer>
    </>
  );
}
