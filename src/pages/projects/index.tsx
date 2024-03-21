import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "../../components/navbar";
import {ProjectsState, setProjectsLoading, setProjectsSuccess} from "../../redux/slices/projects";
import './styles.css';


const ProjectsPage = () => {

  const projects = useSelector((state : ProjectsState ) => state.projects);
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    dispatch(setProjectsLoading());
    const response = await fetch('http://localhost:3000/projects');
    const data = await response.json();

    dispatch(setProjectsSuccess(data));
    console.log(data, '[projects]');
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="page">
      <Navbar />
      <button className="send_button" onClick={fetchProjects}>Registrar Proyecto</button>
      <div className="container_large">
        <div className="scroll_x_container">
          {}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
