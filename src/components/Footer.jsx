import { useContext } from "react";
import { footercontext } from "../context/footercontext";
import "./Footer.css";

export function Footer() {
  const { page, setPage, perPage, setPerPage } = useContext(footercontext);

  const changedisplay = (e) => {
    setPerPage(Number(e.target.value)); 
  };

  return (
    <div className="footer widget">
      <div className="ghost">x</div>
      <div className="pagination">x</div>
      <div className="display-count">
        <select
          name="perpage-div"
          id="perpage-div"
          value={perPage}
          onChange={changedisplay}
          style={{
            color:"white"
          }}
        >
          <option value="100">Show 100</option>
          <option value="200">Show 200</option>
          <option value="250">Show 250</option>
        </select>
      </div>
    </div>
  );
}
