import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";

const PostPage = ({ frontMatter: { title }, mdxSource }) => {
  return (
    <div>
      <Head>
        <link
          id="favicon"
          rel="shortcut icon"
          type="image/png"
          href="https://res.cloudinary.com/elazar93/image/upload/v1647269195/vega_logo_dage4b.png"
        />
        <title>Web Components </title>
      </Head>
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} />
    </div>
  );
};

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default PostPage;
