import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "../../components/navbar";
import TableTitleRow from "../../components/tableTitleRow";
import {AuthState} from "../../redux/slices/auth";
import {setUsersLoading, setUsersSuccess, UsersState} from "../../redux/slices/users";

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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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

  return (
    <div className="page">
      <Navbar />
      {isAdmin && <button className="send_button">Registrar usuario</button>}
      <div className="container_large">
        <div className="scroll_x_container">
          <table className="table">
            <TableTitleRow items={userHeader} isInTitle={true} />
            {users?.map((user, index) => {
              const list = []

              for (const key in user) {
                if (key === "list") {
                  const x = user[key].replaceAll("|", "\n");
                  list.push(x);
                  continue;
                }
                list.push(String(user[key]));
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

export default UsersPage;
