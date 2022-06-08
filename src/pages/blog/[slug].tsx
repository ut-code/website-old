import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import NormalHeader from "../../components/NormalHeader";
import ContentContainer from "../../components/ContentContainer";

type PostPage = {
  frontmatter: {
    title: string;
    date: string;
    coverImage: string;
    excerpt: string;
    id: number;
  };
  content: string;
};

export default function PostPage({
  frontmatter: { title, date, coverImage },
  content,
}: PostPage) {
  return (
    <>
      <ContentContainer>
        <NormalHeader />
      </ContentContainer>
      <ContentContainer className="flex pt-20">
        <div>
          <article className="mr-20">
            <h1 className="text-5xl">{title}</h1>
            <div>{date}</div>
            <img src={coverImage} alt="" className="" />
            <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
          </article>
        </div>
        <div className="w-64 text-xl tracking-widest">最近の記事</div>
      </ContentContainer>
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

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
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
