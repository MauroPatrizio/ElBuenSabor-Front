import { useSelector } from "react-redux";
import styles from "./ViewAdmin.module.css";
import { RootState } from "../../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const HeaderAdmin = () => {
  const navegate = useNavigate();

  return (
    <div className={styles.mainDiv}>
      <div className={styles.contentHeader}>
        <h2
          onClick={() => {
            navegate(-1);
          }}
        >
          {"Empresa"}
        </h2>
        <div className={styles.contentSucursal}>
          <span className="point">•</span>
          <h2>{"Sucursal"}</h2>
        </div>
      </div>

    </div>
  );
};