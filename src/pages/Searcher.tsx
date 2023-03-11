import React, { useEffect } from 'react'
import { getMovies } from '../firebase/api'

function Searcher() {



  useEffect(() => {
    getMovies()
    console.log('Searcher')
  }, [])

  return (
    <div>Searcher</div>
  )
}

export default Searcher