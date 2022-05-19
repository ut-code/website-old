import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export default function PostPage({
  frontmatter: { title, date, coverImage },
  slug,
  content,
}) {
  return (
    <>
      <h1>{title}</h1>
      <div>{date}</div>
      <img src={coverImage} alt="" className="" />
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
      <div>{slug}</div>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", `${slug}.md`),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
