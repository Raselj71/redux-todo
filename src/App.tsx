import { Navigate, Route, Routes } from 'react-router-dom'
import TodosPage from './pages/Home'
import {  Container, Flex, Theme } from '@radix-ui/themes'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useThemeSelector } from './redux/theme/themeSelector'
import ThemeController from './component/ThemeController'
import Logo from '../public/logo.png'
import { isAuthenticated } from './redux/auth/authSlice'
import Logout from './component/Logout'
import { useAppSelector } from './redux/store'
import ProtectedRoute from './component/ProtectedRoute'
import AddTodo from './pages/AddTodo'

export default function App() {
  const theme = useThemeSelector()

    const auth = useAppSelector((state) => state.auth)
  const authed = isAuthenticated(auth)
  console.log(authed)

  return (

   <Theme appearance={theme}>



    <Container >
      <Flex  className='border-b border-gray-500' justify={'between'} p={'4'}>
      <img className='max-w-24' src={ Logo } />

          <Flex gap={'4'}>
               <ThemeController/>

               {authed  && <Logout/>}
              
          </Flex>
      </Flex>
      <main className='w-full p-4'>
        <Routes>
          <Route path="/"  element={<Navigate to="/app/todos" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/app/todos" element={<TodosPage />} />
             <Route path="/app/todos/add" element={<AddTodo />} />
            <Route path="/app/todos/:id" element={<TodosPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    
    </Container>

       </Theme>
  )
}
