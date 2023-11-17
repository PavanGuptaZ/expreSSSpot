import PropTypes from "prop-types"
import styles from '../styles/PostListPage.module.css'
import { Heading } from "../components/Heading"
import { Fragment, useContext } from "react"
import { themeDetails, userDetails } from "../Hooks/ContextProvider"
import { DarkMode, LiteMode } from "../theme/themeColors"
import { useInfiniteQuery } from "@tanstack/react-query"
import { LoginForm } from "./LoginForm.jsx"
import { LoadingComponent } from "../components/LoadingComponent.jsx"
import { PagenotFound } from "./PagenotFound.jsx"
import { useGetTime } from "../Hooks/useTime.js"
import { useNavigate } from "react-router-dom"
import { feedPages } from "../api/homeFeed"

export const PostListPage = (props) => {
  let { user } = useContext(userDetails)

  const pagesQurey = useInfiniteQuery({
    queryKey: [props.type],
    queryFn: ({ pageParam = 1 }) => feedPages({ pageParam, user, type: props.type }),
    getNextPageParam: (lastPage, allpage) => {
      if (lastPage.page < lastPage.totalPages) {
        return allpage.length + 1
      } else {
        return undefined
      }
    },
    enabled: user !== null,
    staleTime: 5 * 60 * 1000
  })

  if (!user) {
    return <LoginForm />
  }
  if (PostListPage.status == "loading") {
    return <LoadingComponent />
  }
  if (PostListPage.status == "error") {
    return <PagenotFound />
  }

  return (
    <div className={styles.PostListPage}>
      <Heading title={props.type + " List"} textSize={"1.5rem"} />
      <div className={styles.listBox}>
        {
          pagesQurey.data?.pages.map((page, i) => (
            <Fragment key={i}>
              {page.result ?
                page?.posts.map((ele) => (
                  <PostListBox key={ele._id} post={ele} />
                ))
                : <p style={{ textAlign: "center" }}>{page.message}</p>}
            </Fragment>
          ))
        }
      </div>
      {pagesQurey.isFetching && pagesQurey.isFetchingNextPage ? 'fetching' : null}
      <button onClick={() => pagesQurey.fetchNextPage()} className={styles.loadMoreBTN}
        disabled={!pagesQurey.hasNextPage || pagesQurey.isFetchingNextPage}>
        {pagesQurey.isFetchingNextPage
          ? 'Loading more...'
          : pagesQurey.hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </button>
    </div>
  )
}
export const PostListBox = (props) => {
  let { theme } = useContext(themeDetails)
  let { third } = theme ? DarkMode : LiteMode;
  let { post } = props
  const navigator = useNavigate()
  return (
    <div className={styles.ListBlock} style={{ border: `1px solid ${third}` }} onClick={() => navigator(`/post/${post._id}`)}>
      <div className={styles.imageBox}>
        <img src={`${import.meta.env.VITE_BACKEND_LINK}/images/${post.image || 'blog.png'}`} alt="Cover Image" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div className={styles.listBlockContent}>
        <div className={styles.listBlocktitle}>
          {post.title}
        </div>
        <div className={styles.listBlockText}>
          {post.text}
        </div>
        <div className={styles.listBlockDate}>
          <p> Posted on - {useGetTime(post.createdAt)}</p>
          <p> By - {post.userName}</p>
        </div>
      </div>
    </div >
  )
}
PostListPage.propTypes = {
  type: PropTypes.string.isRequired
}
PostListBox.propTypes = {
  post: PropTypes.object
}