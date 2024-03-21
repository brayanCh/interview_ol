import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type IProject = {
  "id": number,
  "project_name": string,
  "repo_url": string,
  "client": string,
  "developers": string,
  "ci": boolean,
  "cd": boolean,
  "frontend_tecnology": string,
  "backend_tecnology": string,
  "databases": string,
  "errors_count": number,
  "warning_count": number,
  "deploy_count": number,
  "percentage_completion": number,
  "report_nc": number,
  "status": string,
};

export type ProjectsState = {
  projects: IProject[],
  loading: boolean,
  error: string | null,
};

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProjectsSuccess: (state, action: PayloadAction<IProject[]>) => {
      state.loading = false;
      state.projects = action.payload;
    },
    setProjectsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});


export const { setProjectsLoading, setProjectsSuccess, setProjectsFailure, setError } = projectsSlice.actions;
