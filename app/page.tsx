'use client'

import React, { useEffect, useState } from 'react';

const fetchData = async ()  => {
  const data = await fetch('https://tabletop.events/api/convention/32D6B730-365B-11EF-B58A-DCC620F8A28C/events')
  const posts = await data.json()
  console.log(posts["result"]["items"][11])
  return posts["result"]["items"];
  // return (
  //   <ul>
  //     {posts.map((post) => (
  //       <li key={post.id}>{post.title}</li>
  //     ))}
  //   </ul>
  // )
}

export default function Page() {
  const [data, setData] = useState({});

  // useEffect(() => {
    const d = fetchData();
    setData(d);
  // })

  return <h1>Hello, Next.js!</h1>
}
