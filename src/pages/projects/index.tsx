import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "../../components/navbar";
import TableTitleRow from "../../components/tableTitleRow";
import {ProjectsState, setProjectsLoading, setProjectsSuccess} from "../../redux/slices/projects";
import './styles.css';

const projectsHeader = [
  "Id",
  "Project Name",
  "Repo Url",
  "Client",
  "Developers",
  "Ci",
  "Cd",
  "Frontend Tecnology",
  "Backend Tecnology",
  "Databases",
  "Errors_count",
  "Warning_count",
  "Deploy_count",
  "Percentage_completion",
  "Report_nc",
  "Status",
]

const ProjectsPage = () => {

  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    dispatch(setProjectsLoading());
    const response = await fetch('http://localhost:3000/projects');
    const data = await response.json();

    dispatch(setProjectsSuccess(data));
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
          <table className="table">
            <TableTitleRow items={projectsHeader} isInTitle={true} />
            {projects?.map((project, index) => {
              const list = []

              for (const key in project) {
                if (key === "developers") {
                  const x = project[key].replaceAll("|", "\n");
                  list.push(x);
                  continue;
                }
                list.push(String(project[key]));

              }

              return (
                <TableTitleRow key={index} items={list}  isInTitle={false} />
              )
            })
            }
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
