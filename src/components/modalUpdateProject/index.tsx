import {useEffect, useState} from "react";
import {IProject} from "../../redux/slices/projects";

interface IProps {
  onClose: () => void;
  updateState: () => void;
  isClosed: boolean
  projectToUpdate: IProject | null;
}

const ModalNewProject = ({ onClose, updateState, isClosed, projectToUpdate} : IProps) => {

  const [newProject, setNewProject] = useState<IProject>({
    id: Math.floor(Math.random() * 100000),
    project_name: "",
    repo_url: "",
    client: "",
    developers: "",
    ci: false,
    cd: false,
    frontend_tecnology: "",
    backend_tecnology: "",
    databases: "",
    errors_count: 0,
    warning_count: 0,
    deploy_count: 0,
    percentage_completion: 0,
    report_nc: 0,
    status: "En Desarrollo",
  });

  const clearForm = () => {
    setNewProject({
      id: Math.floor(Math.random() * 100000),
      project_name: "",
      repo_url: "",
      client: "",
      developers: "",
      ci: false,
      cd: false,
      frontend_tecnology: "",
      backend_tecnology: "",
      databases: "",
      errors_count: 0,
      warning_count: 0,
      deploy_count: 0,
      percentage_completion: 0,
      report_nc: 0,
      status: "En Desarrollo",
    });
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/projects/${newProject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });
    updateState();
    clearForm();
    onClose();
  }

  useEffect(() => {
    if (projectToUpdate) {
      setNewProject(projectToUpdate);
    }
  }, [projectToUpdate]);
  return (
    <>
      {isClosed &&
      <div className="cover_page" onClick={() => {
          onClose();
          clearForm();
        }}>
        <form onSubmit={onSubmit} onClick={(e) => e.stopPropagation()}>
          <h1>Actualizar Proyecto</h1>

          <label>Nombre del Proyecto</label>
          <input type="text" value={newProject.project_name} onChange={(e) => setNewProject({...newProject, project_name: e.target.value})} />

          <label>Repo Url</label>
          <input type="text" value={newProject.repo_url} onChange={(e) => setNewProject({...newProject, repo_url: e.target.value})} />

          <label>Cliente</label>
          <input type="text" value={newProject.client} onChange={(e) => setNewProject({...newProject, client: e.target.value})} />

          <label>Desarrolladores</label>
          <input type="text" value={newProject.developers} onChange={(e) => setNewProject({...newProject, developers: e.target.value})} />

          <label>CI</label>
          <input type="checkbox" checked={newProject.ci} onChange={(e) => setNewProject({...newProject, ci: e.target.checked})} />

          <label>CD</label>
          <input type="checkbox" checked={newProject.cd} onChange={(e) => setNewProject({...newProject, cd: e.target.checked})} />

          <label>Tecnología Frontend</label>
          <input type="text" value={newProject.frontend_tecnology} onChange={(e) => setNewProject({...newProject, frontend_tecnology: e.target.value})} />

          <label>Tecnología Backend</label>
          <input type="text" value={newProject.backend_tecnology} onChange={(e) => setNewProject({...newProject, backend_tecnology: e.target.value})} />

          <label>Bases de Datos</label>
          <input type="text" value={newProject.databases} onChange={(e) => setNewProject({...newProject, databases: e.target.value})} />

          <label>Errores</label>
          <input type="number" value={newProject.errors_count} onChange={(e) => setNewProject({...newProject, errors_count: parseInt(e.target.value)})} />

          <label>Warnings</label>
          <input type="number" value={newProject.warning_count} onChange={(e) => setNewProject({...newProject, warning_count: parseInt(e.target.value)})} />
          <label>Despliegues</label>
          <input type="number" value={newProject.deploy_count} onChange={(e) => setNewProject({...newProject, deploy_count: parseInt(e.target.value)})} />

          <label>Porcentaje de Completitud</label>
          <input type="number" value={newProject.percentage_completion} onChange={(e) => setNewProject({...newProject, percentage_completion: parseInt(e.target.value)})} />

          <label>Reporte NC</label>
          <input type="number" value={newProject.report_nc} onChange={(e) => setNewProject({...newProject, report_nc: parseInt(e.target.value)})} />

          <label>Estado</label>
          <select value={newProject.status} onChange={(e) => setNewProject({...newProject, status: e.target.value})}>
            <option value="En Desarrollo">En Desarrollo</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <button type="submit">Actualizar Proyecto</button>
        </form>
      </div>
      }
    </>
  );
}

export default ModalNewProject;
