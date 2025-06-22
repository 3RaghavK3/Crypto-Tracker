import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MainLayout } from './layout/MainLayout'
import { Homepage } from './components/Homepage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainLayout>
        <Homepage/>
        </MainLayout>
    </>
  )
}

export default App
