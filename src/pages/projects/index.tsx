import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ProjectsState, setProjectsLoading, setProjectsSuccess} from "../../redux/slices/projects";


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
    <div></div>
  );
};

export default ProjectsPage;
