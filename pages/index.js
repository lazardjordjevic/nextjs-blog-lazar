import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";

const Home = ({ posts }) => {
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
      <div className="mt-5">
        {posts.map((post, index) => (
          <Link href={"/" + post.slug} passHref key={index}>
            <div className="lazer-card__wrapp">
              <lazer-card
                card-title={post.frontMatter.title}
                card-description={post.frontMatter.description}
                card-date={post.frontMatter.date}
              ></lazer-card>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Home;
