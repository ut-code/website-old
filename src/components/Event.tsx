export default function Event({
  date,
  name,
  content,
}: {
  date: string;
  name: string;
  content: string;
}) {
  return (
    <div className="border-l-2 border-dotted ml-48 pb-20">
      <div className="flex items-center">
        <div className="bg-green-400 -translate-x-32 text-white p-2 font-extrabold text-lg tracking-wide">
          {date}
        </div>
        <div className="flex bg-white rounded-full border-solid border-green-500 absolute border-2 w-6 h-6 -translate-x-1/2 place-content-center items-center">
          <div className="w-3 bg-green-500 rounded-full h-3" />
        </div>
        <div className="text-4xl -translate-x-16">{name}</div>
      </div>
      <div className="ml-5 mr-28 text-lg tracking-widest leading-loose">
        {content}
      </div>
    </div>
  );
}
