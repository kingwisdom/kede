import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import moment  from 'moment';

function Single() {
  const location = useLocation();
  const path = location.pathname?.split("/")[2];
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState({})
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      await axios.get('https://www.googleapis.com/blogger/v3/blogs/2877298230409156118/posts', {
        params: { 'key': 'AIzaSyAeLdzShG4YJURfVEnqEb6joh8Bx2SFO_Y' }
      }).then((res) => {
        let posts = res.data.items;
        let found = posts.find((pr) => pr.id === path);
        setPost(found)
        //console.log(found)
      }).then((err) => console.log(err))
      setLoading(false)
    }

    getPosts();
  }, [path])

  return (
    <div>
      {post ? (

        <>
          {/* <!-- Page Header--> */}
          <header className="masthead" style={{ backgroundImage: "url('assets/img/post-bg.jpg')" }}>
            <div className="container position-relative px-4 px-lg-5">
              <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                  <div className="post-heading">
                    <h1>{post?.title}</h1>
                    {loading && (<p>Loading post...</p>)}
                    <span className="meta">
                      Posted by &nbsp;
                      {post?.author ?
                      (<a> {post?.author.displayName}</a>) :
                      (<a> 'Author'</a>) }
                      &nbsp; {moment(post.published).fromNow()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* <!-- Post Content--> */}
          <article className="mb-4">
            <div className="container px-4 px-lg-5">
              <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                  <div>
                    {post?.content ? parse(post?.content) : parse('&nbsp;')}
                  </div>

                </div>
              </div>
            </div>
          </article>
        </>
      ) : (
        <h3>No post Available</h3>
      )}
    </div>
  )
}

export default Single