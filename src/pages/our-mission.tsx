import ContentContainer from "../components/ContentContainer";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Ourmission() {
  const pStyle = "leading-loose my-3";
  return (
    <>
      <ContentContainer>
        <Header textColor="text-black" />
      </ContentContainer>
      <ContentContainer>
        <div className="mt-8 mb-16 px-16 sm:px-24 2xl:px-40">
          <div className="text-4xl text-center font-extrabold">活動理念</div>
          <div className="my-8">
            <h2 className="leading-loose text-3xl font-bold">
              ut.code(); の使命
            </h2>
            <p className={pStyle}>
              コンピューターの性能が日に日に向上を続ける現代、ソフトウェアの重要性は以前にもまして高まっています。近い将来、現在の私たちが行っている知的労働の多くがソフトウェアによって代替可能になるとの予測があるほどです。
            </p>
            <p className={pStyle}>
              しかしながら、国内のソフトウェア産業の水準は、諸外国と比較して大きく水をあけられていると指摘されています。これから社会に出る私たち学生には、こういった現状を打破するための行動を起こすことが期待されているといえるでしょう。
            </p>
            <p className={pStyle}>
              大学は学問の府であり、技術とは距離を置くべきだという指摘もあります。その一方で、大学で生まれた新たな発見を社会で生かすためには、それを表現するための技術の存在が必要不可欠です。ut.code();
              は、東京大学のソフトウェアエンジニアリングコミュニティとして、学生に学びと発信の機会を提供し、産業全体の進歩に貢献します。
            </p>
          </div>
          <div className="my-8">
            <h2 className="leading-relaxed text-3xl font-bold">
              ut.code(); の価値
            </h2>
            <h3 className="leading-relaxed text-2xl font-semibold">
              透明であること
            </h3>
            <p className={pStyle}>
              現代のソフトウェア開発は、これまでに世界中の人々が積み上げてきた膨大な公開資産の上に成り立っています。これら資産が信頼に足るものだと認識されるのは、その構築の過程でなされた様々な意思決定に対し、多くの人々の参画があったからこそです。私たちは、透明性を普遍的価値として認識し、最大限の情報の公開に努めます。
            </p>
            <h3 className="leading-relaxed text-2xl font-semibold">
              非営利であること
            </h3>
            <p className={pStyle}>
              人は、何よりも貴重な資産です。そのため、現代では、人の移動に際して多額の金銭の移動が起こりがちです。しかしながら、こういった状況は市場の流動性を低下させ、人材の一極集中を招きます。私たちは、非営利を貫くことこそが、個々人の自由な選択に寄与すると確信します。
            </p>
            <p className={pStyle}>
              一方で、ut.code();
              としての非営利性は、構成員によるプロジェクトの収益化を妨げません。私たちは、ソフトウェアに対して正当な対価が支払われることが、持続的な発展のために必要不可欠だと考えます。
            </p>
          </div>
        </div>
      </ContentContainer>
      <Footer />
    </>
  );
}
