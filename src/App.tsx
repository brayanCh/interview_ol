import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './redux/store'
import LoginPage from './pages/login'

// router que define las rutas de la aplicación
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/about',
    element: <h1>About</h1>
  }
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
