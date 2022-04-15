import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react'
import parse from 'html-react-parser';
import { Link, useNavigate } from 'react-router-dom';

function Landing() {
  const navigation  = useNavigate();
    const [posts, setPosts] = useState([])
  useEffect(() => {
    const getPosts = async () => {
      await axios.get('https://www.googleapis.com/blogger/v3/blogs/2877298230409156118/posts', {
         params: { 'key': 'AIzaSyAeLdzShG4YJURfVEnqEb6joh8Bx2SFO_Y' }
      }).then((res) => {
        setPosts(res.data.items)
         console.log(res.data.items)
      }).then((err) => console.log(err))
    }

    getPosts();
  }, [])

  function handleSinglePage(post){
    //navigation.navigate("",post)
  }
  return (
    <div>
      <header className="masthead" style={{backgroundImage: "url('assets/img/home-bg.jpg')"}}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="site-heading">
                            <h1>Clean Blog</h1>
                            <span className="subheading">A Blog Theme by Start Bootstrap</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        {/* <!-- Main Content--> */}
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    
                {posts.map((er)=> (
                    <div className="post-preview" key={er.id}>
                        <Link to={`/post/${er.id}`}>
                        <a href="">
                            <h2 className="post-title">{parse(er.title)}</h2>
                        </a>
                        </Link>
                        <p className="post-meta">
                            Posted by&nbsp;
                            <a href="#!">{er.author.displayName}</a> &nbsp;
                            {er.published}
                        </p><hr className="my-4" />
                    </div>
                    ))}
                    
                    {/* <!-- Post preview--> */}
                    
                    <div className="d-flex justify-content-end mb-4"><a className="btn btn-primary text-uppercase" href="#!">Older Posts →</a></div>
                </div>
            </div>
        </div>
        {/* <ul>
      {posts.map((er)=> (
        <li key={er.id}>
            <h3>{parse(er.title)}</h3>
            <p>{parse(`${er.content.substring(0, 1000)}...`)}</p>
            <hr />
        </li>
        ))}
      </ul> */}
    </div>
  )
}

export default Landing