import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Navbar from "../../components/navbar";
import {DashboardState, setCPUReport, setDashboardCards, setReleaseResume, setReportCommits} from "../../redux/slices/dashboard";
import "./styles.css";

const DashboardPage = () => {

  const {dashboard_cards, cpu_report, report_commits, release_resume} = useSelector((state: {dashboardState: DashboardState}) => state.dashboardState);
  const dispatch = useDispatch();

  const fetchDashboardData = async () => {
    try {
      const responseDashboardCards = await fetch("http://localhost:3000/dashboard_cards");
      const dataDashboardCards = await responseDashboardCards.json();

      dispatch(setDashboardCards(dataDashboardCards));

      const responseCPU = await fetch("http://localhost:3000/cpu_report");
      const dataCPU = await responseCPU.json();

      dispatch(setCPUReport(dataCPU));

      const responseCommits = await fetch("http://localhost:3000/report_commits");
      const dataCommits = await responseCommits.json();

      dispatch(setReportCommits(dataCommits));

      const responseRelease = await fetch("http://localhost:3000/release_resume");
      const dataRelease = await responseRelease.json();

      dispatch(setReleaseResume(dataRelease));

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="page" style={{height: 'auto'}}>
      <Navbar />
      <div className="row_dashboard">
        <div className="container_small">
          <h4>Proyectos</h4>
          <p>{dashboard_cards.projects}</p>
        </div>
        <div className="container_small">
          <h4>Incidentes registrados</h4>
          <p>{dashboard_cards.peding_nc}</p>
        </div>
        <div className="container_small">
          <h4>Errores de despliegue</h4>
          <p>{dashboard_cards.errors_deploy}</p>
        </div>
      </div>
      <div className="server_info">
        <h4>Detalles del servidor</h4>
        <p>Informacion sobre el consumo y uso del servidor principal para desarrollo</p>
        <div style={{width: "100%"}}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={cpu_report.time}>
              <XAxis dataKey="time" />
              <YAxis />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="commit_info">
        <h4>Reporte de commits por mes</h4>
        <p>Total commits ultimos 12 meses</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={report_commits}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="feat" fill="#fff" />
            <Bar dataKey="fix" fill="#0f0" />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="release_info">
        <h4>Avance de Proyectos</h4>
        <p>reportes de entrega</p>
        <ResponsiveContainer width="100%"  height={200}>
          <BarChart data={release_resume.top_projects}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="porcentaje" fill="#444" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
