import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileUpload from './components/fileUpload'

function App() {
  const [count, setCount] = useState(0)


console.log(count);
  return (
    <>
      <div  className="container"> 
        <FileUpload/>
      </div>
    </>
  )
}

export default App
