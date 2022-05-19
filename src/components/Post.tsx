export default function Post({ post }) {
  return (
    <div className="flex mt-20">
      <div className="w-2/3 h-44">
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
