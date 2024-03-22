import {useEffect, useState} from "react";
import {IUser} from "../../redux/slices/users";

interface IProps {
  onClose: () => void;
  updateState: () => void;
  isClosed: boolean;
  userToUpdate: IUser | null;
}

const ModalUpdateUser = ({ onClose, updateState, isClosed, userToUpdate} : IProps) => {

  const [newUser, setNewUser] = useState<IUser>({
    id: Math.floor(Math.random() * 100000),
    name: "",
    last_name: "",
    url_photo: "",
    rol: 0,
    list: "",
    area: "",
  });

  const clearForm = () => {
    setNewUser({
      id: Math.floor(Math.random() * 100000),
      name: "",
      last_name: "",
      url_photo: "",
      rol: 0,
      list: "",
      area: "",
    });
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users/${newUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      console.log(data, "data");
    } catch (error) {
      console.error(error);
    }
    updateState();
    clearForm();
    onClose();
  }

  useEffect(() => {
    if (userToUpdate) {
      setNewUser(userToUpdate);
    }
  }, [userToUpdate]);

  return (
    <>
      {isClosed &&
      <div className="cover_page" onClick={() => {
        onClose();
        clearForm();
        }}>
        <form onSubmit={onSubmit} onClick={(e) => e.stopPropagation()}>
          <h1>Actualizar Usuario</h1>

          <label>Nombre</label>
          <input type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} />

          <label>Apellido</label>
          <input type="text" value={newUser.last_name} onChange={(e) => setNewUser({...newUser, last_name: e.target.value})} />

          <label>Url Foto</label>
          <input type="text" value={newUser.url_photo} onChange={(e) => setNewUser({...newUser, url_photo: e.target.value})} />

          <label>Rol</label>
          <input type="number" value={newUser.rol} onChange={(e) => setNewUser({...newUser, rol: parseInt(e.target.value)})} />

          <label>Lista</label>
          <input type="text" value={newUser.list} onChange={(e) => setNewUser({...newUser, list: e.target.value})} />

          <label>Area</label>
          <input type="text" value={newUser.area} onChange={(e) => setNewUser({...newUser, area: e.target.value})} />

          <button type="submit">Actualizar Usuario</button>
        </form>
      </div>
      }
    </>
  );
}

export default ModalUpdateUser;
