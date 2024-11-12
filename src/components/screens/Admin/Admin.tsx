import ViewAdmin from "../../Views/ViewAdmin/ViewAdmin";
import styles from "./Admin.module.css";
import { Outlet } from "react-router-dom";

export const Admin = () => {

  return (
    <div className={styles.mainDiv}>
      <ViewAdmin></ViewAdmin>
      <div className={styles.containerOutlet}>

        <Outlet></Outlet>

      </div>
    </div>
  );
};