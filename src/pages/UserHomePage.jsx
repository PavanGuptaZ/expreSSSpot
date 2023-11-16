import { useContext } from 'react';
import { Heading, LoadingComponent, PostBlock, PostBlock02, PostBlock03, ViewMore } from '../components';
import styles from '../styles/userHomePage.module.css';
import { themeDetails, userDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';
import { useQueries } from '@tanstack/react-query';
import { SomeFeed, followingFeed, newFeedFunction } from '../api/homeFeed';


export const UserHomePage = () => {
  let { theme } = useContext(themeDetails)
  let { user } = useContext(userDetails)
  let { third } = theme ? DarkMode : LiteMode;

  const homeFeedQueries = useQueries({
    queries: [
      { queryKey: ['newQuerys'], queryFn: () => newFeedFunction(user), staleTime: 5 * 60 * 1000 },
      { queryKey: ['followingQuery'], queryFn: () => followingFeed(user), staleTime: 5 * 60 * 1000 },
      { queryKey: ['someFeedQuerys'], queryFn: () => SomeFeed(user), staleTime: 5 * 60 * 1000 }
    ]
  })

  if (homeFeedQueries[0].isLoading || homeFeedQueries[1].isLoading || homeFeedQueries[2].isLoading) {
    return <LoadingComponent />
  }

  return (
    <>
      <div className={styles.PostBlockBox} style={{ backgroundColor: third }}>
        <Heading title="New Things" />
        {homeFeedQueries[0].data.result ?
          <div className={styles.newPosts}>
            <PostBlock typeBlock="PostBlock01" data={homeFeedQueries[0].data?.posts[0]} />
            <div className={styles.newPostsAside}>
              {homeFeedQueries[0].data?.posts[1] != undefined && <PostBlock typeBlock="PostBlock02" data={homeFeedQueries[0].data?.posts[1]} />}
              {homeFeedQueries[0].data?.posts[2] != undefined && <PostBlock typeBlock="PostBlock02" data={homeFeedQueries[0].data?.posts[2]} />}
              {homeFeedQueries[0].data?.posts.length === 2 && <PostBlock03 link={"new"} />}
            </div>
          </div> : <p className={styles.fetchFailedMessage}>{homeFeedQueries[0].data.message}</p>}
        <ViewMore link={"new"} />
      </div>
      <div className={styles.PostBlockBox} style={{ backgroundColor: third }}>
        <Heading title="Following" />
        {homeFeedQueries[1].data.result ?
          <div className={styles.newPosts}>
            <PostBlock typeBlock="PostBlock01" data={homeFeedQueries[1].data?.posts[0]} />
            <div className={styles.newPostsAside}>
              {homeFeedQueries[1].data?.posts[1] != undefined && <PostBlock typeBlock="PostBlock02" data={homeFeedQueries[1].data?.posts[1]} />}
              {homeFeedQueries[1].data?.posts[2] != undefined && <PostBlock typeBlock="PostBlock02" data={homeFeedQueries[1].data?.posts[2]} />}
              {homeFeedQueries[1].data?.posts.length === 2 && <PostBlock03 link={"following"} />}
            </div>
          </div> : <p className={styles.fetchFailedMessage}>{homeFeedQueries[1].data.message}</p>}
        <ViewMore link={"following"} />
      </div>
      <div className={styles.PostBlockBox} style={{ backgroundColor: third }}>
        <Heading title="Some" />
        {homeFeedQueries[2].data.result ?
          <div className={styles.somePosts}>
            {homeFeedQueries[2]?.data?.posts.map((element) => {
              return <PostBlock02 key={element._id} typeBlock="PostBlock03" data={element} />
            })}
          </div> : <p className={styles.fetchFailedMessage}>{homeFeedQueries[2].data.message}</p>}
        {/* <ViewMore link={"somefeed"} /> */}
      </div>
    </>
  )
}
