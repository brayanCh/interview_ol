import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ModalNewProject from "../../components/modalNewProject";
import Navbar from "../../components/navbar";
import TableTitleRow from "../../components/tableTitleRow";
import {AuthState} from "../../redux/slices/auth";
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

  const projects = useSelector((state : {projects : ProjectsState}) => state.projects.projects);
  const currentUser = useSelector((state : {auth : AuthState}) => state.auth.currentUser);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  useEffect(() => {
    if (!currentUser) {
      window.location.href = '/';
      return;
    }

    setIsAdmin(currentUser.user === 'admin');
  }, [currentUser]);

  return (
    <div className="page">
      <Navbar />
      {isAdmin && <>
        <button
          onClick={() => setOpenModal(true)}
          className="send_button"
        >
          Nuevo Proyecto
        </button>
        <ModalNewProject
          isClosed={openModal}
          onClose={() => setOpenModal(false)}
          lengthProjects={projects.length}
          updateState={fetchProjects}
        />
      </>}
      <div className="container_large">
        <div className="scroll_x_container">
          <table className="table">
            <TableTitleRow items={projectsHeader} isInTitle={true} />
            {projects?.map((project, index) => {
              const list = []

              if (!project) {
                return <></>;
              };
              if (Object.keys(project).length < 2) {
                return <></>;
              } 

              for (const key in project) {
                if (key === "developers") {
                  const x = project[key].replaceAll("|", "\n");
                  list.push(x);
                  continue;
                }
                list.push(String(project[key]));

              }

              return (
                  <TableTitleRow key={index} items={list}  isInTitle={false} isAdmin={isAdmin} id={project.id} update={fetchProjects} path="projects"/>
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
