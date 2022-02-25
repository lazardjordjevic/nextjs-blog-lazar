import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { applyPolyfills, defineCustomElements } from 'lazer-component/loader'
import { useEffect } from 'react'

const PostPage = ({ frontMatter: { title, date }, mdxSource }) => {
    useEffect(() => {
        applyPolyfills().then(() => {
            defineCustomElements()
        })
    })

    return (
        <div>
            <h1>{title}</h1>
            <MDXRemote {...mdxSource} />
        </div>
    )
}

const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.mdx', ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

const getStaticProps = async ({ params: { slug } }) => {
    const markdownWithMeta = fs.readFileSync(
        path.join('posts', slug + '.mdx'),
        'utf-8'
    )

    const { data: frontMatter, content } = matter(markdownWithMeta)
    const mdxSource = await serialize(content)

    return {
        props: {
            frontMatter,
            slug,
            mdxSource,
        },
    }
}

export { getStaticProps, getStaticPaths }
export default PostPage
