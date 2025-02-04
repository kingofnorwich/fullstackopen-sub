const Hello = (props) => {
  console.log(props)
  return (
    <>
      <p>Hello {props.name} you are {props.age} years old</p>
    </>
  )
}
const Footer = () =>{
  return (
    <>
    greetings app created by <a
    href="https://github.com/kingofnorwich">The King of Norwich</a>
    </>
  )
}

const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]
  console.log(friends)

  return (
    <div>

      <p>{friends[0].name}, {friends[0].age}</p>
      
      <p>{friends[1].name}, {friends[1].age}</p>
    </div>
  )
}

export default App