import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MainLayout } from './layout/MainLayout'
import { Homepage } from './components/Homepage'
import { FooterProvider } from './context/footercontext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <FooterProvider>
      <MainLayout>
        <Homepage/>
        </MainLayout>
      </FooterProvider>  
    </>
  )
}

export default App
