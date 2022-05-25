import React from 'react'

const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) => <strong>Number of exercises {sum}</strong>

const Part = ({ part }) => <p> {part.name} {part.exercises}</p>

const Content = ({ parts }) => <> {parts.map(part => <Part key={part.id} part={part}/>)}</>

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </> 
  )
}

export default Course