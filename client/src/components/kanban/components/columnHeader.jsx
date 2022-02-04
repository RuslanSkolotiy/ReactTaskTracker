import React from "react"

const ColumnHeader = ({ column }) => {
  return (
    <div className="card-header" style={{ minWidth: 200 + "px", textAlign: "center", backgroundColor: column.color }}>
      {column.title}
    </div>
  )
}

export default ColumnHeader