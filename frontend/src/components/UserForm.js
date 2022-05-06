import React, { useState } from 'react'

const UserForm = ({title,setTitle,author,setAuthor,length,setLength,year,setYear,saveBook}) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      saveBook();
    }}>
      <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="book title" />
      <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="author" />
      <input type="number" name="length" value={length} onChange={(e) => setLength(e.target.value)} placeholder="length (pages)" />
      <input type="number" name="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="year" />
      <button>save</button>
    </form>
  )
}

export default UserForm