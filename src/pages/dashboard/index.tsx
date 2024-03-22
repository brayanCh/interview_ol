import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "../../components/navbar";
import {DashboardState, setDashboardCards} from "../../redux/slices/dashboard";
import "./styles.css";

const DashboardPage = () => {

  const {dashboard_cards} = useSelector((state: {dashboardState: DashboardState}) => state.dashboardState);
  const dispatch = useDispatch();

  const fetchDashboardData = async () => {
    try {
      const responseDashboardCards = await fetch("http://localhost:3000/dashboard_cards");
      const dataDashboardCards = await responseDashboardCards.json();

      dispatch(setDashboardCards(dataDashboardCards));

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);


  return (
    <div className="page">
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
      </div>
    </div>
  );
};

export default DashboardPage;
