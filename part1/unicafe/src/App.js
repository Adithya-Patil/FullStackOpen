import { useState } from 'react'

const Statistics = (props) => {

  const count = props.good + props.bad + props.neutral

  if (count === 0) {
    return (
      <p>No Feedback Given!</p>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>

      <table>
        <tbody>
          <StatisticsLine text="Good" value={props.good}/>
          <StatisticsLine text="Neutral" value={props.neutral}/>
          <StatisticsLine text="Bad" value={props.bad}/>
          <StatisticsLine text="All" value={count}/>
          <StatisticsLine text="Average" value={(props.good - props.bad) / count}/>
          <StatisticsLine text="Positive" value={props.good / count * 100 + " %"}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}: </td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App