import { useContext } from "react";
import { footercontext } from "../context/footercontext";
import "./Footer.css";

export function Footer() {
  const { page, setPage, perPage, setPerPage } = useContext(footercontext);

  const changedisplay = (e) => {
    setPerPage(Number(e.target.value)); 
  };

  const changepage=(e)=>{
     if(e.target.id=="previous"){
        if(page==1){
            window.alert("Already in the first page")
            return
        }
         setPage(page-1).then()
          
     }
     else{
        setPage(page+1)
         
     }


    

  }  
  return (
    <div className="footer widget">
      <div className="ghost">x</div>
      <div className="pagination">

        <div id="previous" className="button" onClick={changepage}>{'\u2190'}</div>
            <div className="page-style">{page}</div>
        <div id="next" className="button" onClick={changepage}>{'\u2192'}</div>
      </div>
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
