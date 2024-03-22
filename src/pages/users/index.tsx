import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "../../components/navbar";
import TableTitleRow from "../../components/tableTitleRow";
import {setUsersLoading, setUsersSuccess} from "../../redux/slices/users";

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

  const users = useSelector((state) => state.usersState.users);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    dispatch(setUsersLoading());
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();

    //console.log(data);
    dispatch(setUsersSuccess(data));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="page">
      <Navbar />
      <button className="send_button" >Registrar Usuario</button>
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
            console.log(list);

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
