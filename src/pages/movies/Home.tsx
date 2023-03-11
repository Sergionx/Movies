import React, { useEffect, useState } from 'react'
import { Movie } from '../../interfaces/Movie'

function Home() {
  const [movies, setMovies] = useState<Movie[]>([])


  useEffect(() => {
      
      console.log('Home')
  }, [])

  return (
    <div>Home</div>
  )
}

export default Home