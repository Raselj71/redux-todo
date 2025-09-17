import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@radix-ui/themes/styles.css";


async function deferRender (){
  const {worker}= await import('../src/mockServer/browser.ts')
  
  await worker.start()

}

deferRender().then(()=>{
     createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

})

