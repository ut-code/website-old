import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { useState } from "react";
import NormalHeader from "../components/NormalHeader";
import blogImage from "../../public/images/posts/blog.jpg";
import ContentContainer from "../components/ContentContainer";
import Post, { PostsType, PostType } from "../components/Post";
import Footer from "../components/Footer";
import sortByDate from "../../utils";

export default function Blog({ posts }: { posts: PostsType }) {
  const [pageNumber, setPageNumber] = useState<number>(1);
  return (
    <>
      <ContentContainer>
        <NormalHeader />
      </ContentContainer>
      <ContentContainer>
        <div className="flex mt-20">
          <div className="w-1/2 text-center">
            <div className="text-4xl tracking-widest">
              プログラミング的な<span className="text-green-500">日常</span>
            </div>
            <div className="mt-16 tracking-widest">
              ここでは、サークルのメンバーが書いた記事を紹介しています！
            </div>
            <div className="mt-10 tracking-widest">
              プログラミング関連の技術を真面目に書いたものもあれば、
            </div>
            <div className="mt-10 tracking-widest">
              部員の日常生活をさらけ出しちゃったりする物もあるかもしれません。
            </div>
            <div className="mt-10 tracking-widest">
              ut.code();の世界を、ちょっぴり覗いてみましょう！
            </div>
          </div>
          <div className="w-1/2">
            <Image src={blogImage} layout="responsive" />
          </div>
        </div>
      </ContentContainer>
      <ContentContainer className="mb-20">
        {posts
          .slice((pageNumber - 1) * 10, pageNumber * 10)
          .map((post: PostType) => (
            <Post key={post.slug} post={post} />
          ))}
        <div className="flex">
          <button
            type="button"
            onClick={() => {
              setPageNumber(pageNumber - 1);
              window.scroll(0, 530);
            }}
            className="text-green-400 tracking-widest text-xl font-extrabold mt-10 ml-auto mr-1 hover:brightness-110"
          >
            前のページ
          </button>
          <button
            type="button"
            onClick={() => {
              setPageNumber(pageNumber + 1);
              window.scroll(0, 530);
            }}
            className="text-green-400 tracking-widest text-xl font-extrabold mr-auto ml-1 mt-10 hover:brightness-110"
          >
            次のページ
          </button>
        </div>
      </ContentContainer>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });
  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
