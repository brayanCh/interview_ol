import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type IDCards = {
  projects: number,
  projects_dev: number,
  peding_nc: number,
  errors_deploy: number,
};

export type ICPUReport = {
  percentaje_time: number,
  deploys: number,
  time: Array<{
    time: string,
    value: number,
  }>,
}

export type IReportCommit = {
  month: number,
  feat: number,
  fix: number,
}

export type IReleaseResume = {
  porcentaje: string,
  cicle: string,
  nc_state: {
    detected: number,
    process: number,
    solved: number,
  },
  top_projects: Array<{
    name: string,
    porcentaje: string,
    is_nc: boolean,
    is_delay: boolean,
    is_deliver: boolean,
  }>,
};

export type DashboardState = {
  dashboard_cards: IDCards,
  cpu_report: ICPUReport,
  report_commits: Array<IReportCommit>,
  release_resume: IReleaseResume,
};


const initialState: DashboardState = {
  dashboard_cards: {
    projects: 0,
    projects_dev: 0,
    peding_nc: 0,
    errors_deploy: 0,
  },
  cpu_report: {
    percentaje_time: 0,
    deploys: 0,
    time: [],
  },
  report_commits: [],
  release_resume: {
    porcentaje: "",
    cicle: "",
    nc_state: {
      detected: 0,
      process: 0,
      solved: 0,
    },
    top_projects: [],
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardCards: (state, action: PayloadAction<IDCards>) => {
      state.dashboard_cards = action.payload;
    },
    setCPUReport: (state, action: PayloadAction<ICPUReport>) => {
      state.cpu_report = action.payload;
    },
    setReportCommits: (state, action: PayloadAction<Array<IReportCommit>>) => {
      state.report_commits = action.payload;
    },
    setReleaseResume: (state, action: PayloadAction<IReleaseResume>) => {
      state.release_resume = action.payload;
    },
  },
});

export const {
  setDashboardCards,
  setCPUReport,
  setReportCommits,
  setReleaseResume,
} = dashboardSlice.actions;
