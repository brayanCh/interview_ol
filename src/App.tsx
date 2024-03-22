import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './redux/store'
import LoginPage from './pages/login'
import ProjectsPage from './pages/projects'
import UsersPage from './pages/users'
import DashboardPage from './pages/dashboard'

// router que define las rutas de la aplicación
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/users',
    element: <UsersPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
])


function App() {

  // Se envuelve el RouterProvider con el Provider de redux
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
