import React from 'react'
import './Pagination.css'
const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  return (
   <div className="pagination">
      <button onClick={onPrev} disabled={page === 1}>
        ⬅ Prev
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button onClick={onNext} disabled={page === totalPages}>
        Next ➡
      </button>
    </div>
  )
}

export default Pagination