/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react"

const BlogCard = ({
  img_url,
  main_title,
  desc,
  date_title,
  date,
  btn_title,
  btn_url,
  target,
}) => {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }

  return (
    <>
      <div className="item">
        <div className="img">
          <img src={img_url}></img>
        </div>
        <div className="desc">
          <h4>{truncate(main_title, 30)}</h4>
          <p>{truncate(desc, 165)}</p>
          <span className="date">
            <span className="d_title">{date_title}</span>
            <span className="d_time">{date}</span>
          </span>
        </div>
        <div className="bottom">
          <a href={btn_url} target={target} className="btn">
            {btn_title}
            <span className="iconx-arrow-right-circle"></span>
          </a>
        </div>
      </div>
    </>
  )
}

export default BlogCard
