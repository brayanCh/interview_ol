import './styles.css'


interface IProps {
  items: string[];
  isInTitle?: boolean;
  isAdmin?: boolean;
  id?: number;
  update?: () => void;
  path?: string;
  mutateItem?: () => void;
}

const TableRow = ({ items, isInTitle, isAdmin, id, update, path, mutateItem }: IProps) => {

  return (
    <tr className="table_title_row">


      {items.map((item, index) => (
        <td key={index} className="table_title_cell" style={{color: isInTitle ? "#000" : "#333" }}>
          {item}
        </td>
      ))}

      { isAdmin &&
        <td className="table_title_cell">
          <button className="send_button" style={{backgroundColor: '#f22'}} onClick={() => {
            fetch(`http://localhost:3000/${path}/${id}`, {
              method: "PUT",
            }).then(() => update?.());
            }}>Eliminar</button>
          <button className="send_button" style={{backgroundColor: '#27b'}} onClick={() => mutateItem?.()}>Modificar</button> 
        </td>
      }
    </tr>
  )
};

export default TableRow;
