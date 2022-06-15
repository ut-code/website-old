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
    <div className="flex mt-20">
      <div className="w-1/2">
        <img
          src={post.frontmatter.coverImage}
          alt=""
          className="h-full w-full"
        />
      </div>
      <div className="pl-2 w-1/2">
        <div className="text-sm">{post.frontmatter.date}</div>
        <h3 className="text-sm font-extrabold hover:text-green-400">
          <a href={`/blog/${post.slug2}`}>{post.frontmatter.title}</a>
        </h3>
      </div>
    </div>
  );
}
