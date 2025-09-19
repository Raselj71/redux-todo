import { Navigate, Route, Routes } from 'react-router-dom'
import TodosPage from './pages/Home'
import { Container, Flex, Heading, Theme } from '@radix-ui/themes'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useThemeSelector } from './redux/theme/themeSelector'
import ProtectedRoute from './component/ui/ProtectedRoute'
import ThemeController from './component/ThemeController'

export default function App() {
  const theme = useThemeSelector()



  

  return (

   <Theme appearance={theme}>



    <Container >
      <Flex justify={'between'} p={'4'}>
        <Heading>Todo</Heading>
          <ThemeController/>
      </Flex>
      <main className="p-4 max-w-5xl mx-auto">
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
