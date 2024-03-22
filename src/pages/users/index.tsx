import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ModalNewUser from "../../components/modalNewUser";
import ModalUpdateUser from "../../components/modalUpdateUser";
import Navbar from "../../components/navbar";
import TableTitleRow from "../../components/tableTitleRow";
import {AuthState} from "../../redux/slices/auth";
import {IUser, setUsersLoading, setUsersSuccess, UsersState} from "../../redux/slices/users";

const userHeader = [
  "Id",
  "Name",
  "Last Name",
  "Url Photo",
  "Rol",
  "List",
  "Area",
];

const UsersPage = () => {

  const users = useSelector((state: {usersState: UsersState}) => state.usersState.users);
  const currentUser = useSelector((state : {auth : AuthState}) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openUpdateModal, setUpdateModalOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userToUpdate, setUserToUpdate] = useState<IUser | null>(null);

  const fetchUsers = async () => {
    dispatch(setUsersLoading());
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();

    dispatch(setUsersSuccess(data));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      window.location.href = '/';
      return;
    }
    setIsAdmin(currentUser.user === 'admin');
  }, [currentUser]);

  const handleUpdateUser = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setUserToUpdate(user);
      setUpdateModalOpen(true);
    }
  }

  return (
    <div className="page">
      <Navbar />
      {isAdmin && <>
        <button className="send_button" onClick={() => setOpenModal(true)}>Registrar usuario</button>
        <ModalNewUser
          isClosed={openModal}
          onClose={() => setOpenModal(false)}
          updateState={fetchUsers}
        />
        <ModalUpdateUser
          isClosed={openUpdateModal}
          onClose={() => setUpdateModalOpen(false)}
          updateState={fetchUsers}
          userToUpdate={userToUpdate}
        />
      </>
      }
      <div className="container_large">
        <div className="scroll_x_container">
          <table className="table">
            <TableTitleRow items={userHeader} isInTitle={true} />
            {users?.map((user, index) => {
              const list = []

              if (!user) {
                return <></>;
            };
            if (Object.keys(user).length < 2) {
              return <></>;
              } 

              for (const key in user) {
                if (key === "list") {
                  const x = user[key].replaceAll("|", "\n");
                  list.push(x);
                  continue;
              }
              list.push(String(user[key]));
              }

              return (
            <>
              <TableTitleRow
                key={index}
                items={list} 
                isInTitle={false}
                isAdmin={isAdmin}
                id={user.id}
                update={fetchUsers}
                mutateItem={() => handleUpdateUser(user.id)}
                path="users"
              />
            </>
            )
            })
            }
            </table>
          </div>
        </div>
      </div>
  );
};

export default UsersPage;
