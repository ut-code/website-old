import Image, { StaticImageData } from "next/image";

export interface List {
  title: string;
  text: string;
  src: StaticImageData;
}

export default function ExplanationBox(props: List) {
  const { title, text, src } = props;
  return (
    <div className="my-28 px-24 flex">
      <div>
        <h2 className="text-3xl">{title}</h2>
        <div className="leading-loose tracking-widest text-xl pr-14 mt-5">
          {text}
        </div>
      </div>
      <div className="flex-none w-96">
        <Image layout="responsive" src={src} />
      </div>
    </div>
  );
}
