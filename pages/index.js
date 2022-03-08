import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

import { applyPolyfills, defineCustomElements } from 'lazer-component/loader'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

const Home = ({ posts }) => {
    const router = useRouter()
    let test = null

    const handleKeypress = e => {
        if (test !== null) {
            if (e.code === 'ArrowLeft' && test >= 0) {
                test = test > 0 ? test - 1 : 0
            } else if (e.code === 'ArrowRight' && test < posts.length - 1) {
                test += 1
            }
        } else {
            test = 0
        }

        // test = e.code === 'ArrowLeft' && test >= 0 ? test > 0 ? test - 1 : 0 : e.code === 'ArrowRight' && test < posts.length - 1 ? test += 1 : 0

        router.push(`/${test}`)
    }

    useEffect(() => {
        applyPolyfills().then(() => {
            defineCustomElements()
        })
        window.addEventListener('keydown', handleKeypress)
    })

    return (
        <div className='mt-5'>
            {posts.map((post, index) => (
                <Link href={'/' + post.slug} passHref key={index}>
                    <div className='post-card'>
                        <h5 className='post-card__title'>
                            {post.frontMatter.title}
                        </h5>
                        <span className='post-card__description'>
                            {post.frontMatter.description}
                        </span>
                        <span className='post-card__date'>{post.frontMatter.date}</span>
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
