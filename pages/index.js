import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

import { applyPolyfills, defineCustomElements } from 'lazer-component/loader';

const Home = ({ posts }) => {
    applyPolyfills().then(() => {
        defineCustomElements();
      });

    return (
        <div className='mt-5'>
            <div>asd</div>
            <my-component></my-component>
            {posts.map((post, index) => (
                <Link href={'/' + post.slug} passHref key={index}>
                    <div>
                        <div className='row g-0'>
                            <h5 className='card-title'>
                                {post.frontMatter.title}
                            </h5>
                            <p className='card-text'>
                                {post.frontMatter.description}
                            </p>
                            <p className='card-text'>
                                <small className='text-muted'>
                                    {post.frontMatter.date}
                                </small>
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export const getStaticProps = async () => {
    const files = fs.readdirSync(path.join('posts'))

    const posts = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(
            path.join('posts', filename),
            'utf-8'
        )
        const { data: frontMatter } = matter(markdownWithMeta)

        return {
            frontMatter,
            slug: filename.split('.')[0],
        }
    })

    return {
        props: {
            posts,
        },
    }
}

export default Home
