import React from "react";
import SortIcon from "../assets/sort.svg";

const TableHeader = ({ title, onClick }) => (
  <th>
    <h4>{title}</h4>
    <button onClick={onClick} className="sort-button"><img src={SortIcon} alt="Sort" /></button>
  </th>
)

export default TableHeader;