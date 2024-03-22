import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from './slices/auth'
import {dashboardSlice} from './slices/dashboard'
import {projectsSlice} from './slices/projects'
import {usersSlice} from './slices/users'

// store que va a contener el estado de la aplicacion y
// los reducers que van a modificar el estado.
export const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
    usersState: usersSlice.reducer,
    dashboardState: dashboardSlice.reducer,
    auth: authSlice.reducer,
  },
})

// Tipos que se van a usar en la aplicacion
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
