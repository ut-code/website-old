export type PostsType = [
  {
    slug: string;
    frontmatter: {
      title: string;
      date: string;
      coverImage: string;
      excerpt: string;
    };
  }
];

export type PostType = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    coverImage: string;
    excerpt: string;
  };
  content?: string;
};

export default function Post({ post }: { post: PostType }) {
  return (
    <div className="flex mt-20">
      <div className="w-54 h-44">
        <img
          src={post.frontmatter.coverImage}
          alt=""
          className="h-full w-full"
        />
      </div>
      <div className="ml-14">
        <div>{post.frontmatter.date}</div>
        <h3 className="text-2xl font-extrabold hover:text-green-400">
          <a href={`/blog/${post.slug}`}>{post.frontmatter.title}</a>
        </h3>
        <div className="tracking-wider leading-relaxed">
          {post.frontmatter.excerpt}
        </div>
      </div>
    </div>
  );
}
