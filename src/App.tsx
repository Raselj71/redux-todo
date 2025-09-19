import { Navigate, Route, Routes } from 'react-router-dom'
import TodosPage from './pages/Home'
import { Container, Flex, Theme } from '@radix-ui/themes'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useThemeSelector } from './redux/theme/themeSelector'
import ProtectedRoute from './component/ui/ProtectedRoute'
import ThemeController from './component/ThemeController'
import Logo from '../public/logo.png'

export default function App() {
  const theme = useThemeSelector()



  

  return (

   <Theme appearance={theme}>



    <Container >
      <Flex justify={'between'} p={'4'}>
      <img className='max-w-24' src={ Logo } />

          <ThemeController/>
      </Flex>
      <main className='w-full p-4'>
        <Routes>
          <Route path="/"  element={<Navigate to="/app/todos" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/app/todos" element={<TodosPage />} />
            <Route path="/app/todos/:id" element={<TodosPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* <Toasts /> */}
    </Container>

       </Theme>
  )
}
