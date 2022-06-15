export type TinyPostType = {
  slug2: string;
  frontmatter: {
    title: string;
    date: string;
    coverImage: string;
    excerpt: string;
  };
  content?: string;
};

export default function TinyPost({ post }: { post: TinyPostType }) {
  return (
    <div className="flex mt-20 w-1/3">
      <div className="">
        <img src={post.frontmatter.coverImage} alt="" className="" />
      </div>
      <div className="ml-14">
        <div>{post.frontmatter.date}</div>
        <h3 className="text-lg font-extrabold hover:text-green-400">
          <a href={`/blog/${post.slug2}`}>{post.frontmatter.title}</a>
        </h3>
      </div>
    </div>
  );
}
