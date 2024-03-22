import './styles.css'


interface IProps {
  items: string[];
  isInTitle?: boolean;
}

const TableRow = ({ items, isInTitle }: IProps) => {

  return (
    <tr className="table_title_row">
      {items.map((item, index) => (
        <td key={index} className="table_title_cell" style={{color: isInTitle ? "#000" : "#333" }}>
          {item}
        </td>
      ))}
    </tr>
  )
};

export default TableRow;
