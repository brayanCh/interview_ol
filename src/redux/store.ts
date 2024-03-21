import { configureStore } from '@reduxjs/toolkit'
import {projectsSlice} from './slices/projects'

// store que va a contener el estado de la aplicacion y
// los reducers que van a modificar el estado.
export const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
  },
})

// Tipos que se van a usar en la aplicacion
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
