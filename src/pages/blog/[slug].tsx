import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import NormalHeader from "../../components/NormalHeader";
import ContentContainer from "../../components/ContentContainer";
import TinyPost from "../../components/TinyPost";
import Footer from "../../components/Footer";

type TinyPostType = {
  slug2: string;
  frontmatter: {
    title: string;
    date: string;
    coverImage: string;
    excerpt: string;
  };
  content?: string;
};

type TinyPostPage = {
  frontmatter: {
    title: string;
    date: string;
    coverImage: string;
    excerpt: string;
    id: number;
  };
  content: string;
  posts: TinyPostsType;
};

type TinyPostsType = [
  {
    slug2: string;
    frontmatter: {
      title: string;
      date: string;
      coverImage: string;
      excerpt: string;
    };
  }
];

export default function PostPage({
  frontmatter: { title, date, coverImage },
  content,
  posts,
}: TinyPostPage) {
  return (
    <>
      <ContentContainer>
        <NormalHeader />
      </ContentContainer>
      <ContentContainer className="flex pt-20 mb-20">
        <div className="w-3/4">
          <article className="mr-10">
            <div>{date}</div>
            <h1 className="text-5xl">{title}</h1>
            <img src={coverImage} alt="" className="w-full" />
            <div
              className="text-xl mt-10"
              dangerouslySetInnerHTML={{ __html: marked(content) }}
            />
          </article>
        </div>
        <div className="w-1/4">
          <div className=" text-2xl tracking-widest">最近の記事</div>
          {posts.map((post: TinyPostType) => (
            <TinyPost key={post.slug2} post={post} />
          ))}
        </div>
      </ContentContainer>
      <Footer />
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
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const slug2 = filename.replace(".md", "");
    const markdownWithMeta1 = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta1);
    return {
      slug2,
      frontmatter,
    };
  });
  const markdownWithMeta2 = fs.readFileSync(
    path.join("posts", `${slug}.md`),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta2);
  return {
    props: {
      frontmatter,
      slug,
      content,
      posts,
    },
  };
}
