import React from 'react';
 
function BookList({ books, onEdit, onDelete }) { 
  return ( 
    // <div>
    //   <h2 className="mb-3">📖 Danh sách sách</h2>
    //   <ul className="list-group">
    //     {books.map(book => (
    //       <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
    //         <div>
    //           <strong>{book.title}</strong> - {book.author} ({book.year})
    //         </div>
    //         <div>
    //           <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(book)}>
    //             Sửa
    //           </button>
    //           <button className="btn btn-danger btn-sm" onClick={() => onDelete(book.id)}>
    //             Xóa
    //           </button>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    <div> 
      <h2>Danh sách sách</h2> 
      <ul> 
        {books.map(book => ( 
          <li key={book.id}> 
            <strong>{book.title}</strong> - {book.author} ({book.year}) 
            {' '} 
            <button onClick={() => onEdit(book)}>Sửa</button> 
            {' '} 
            <button onClick={() => onDelete(book.id)}>Xóa</button> 
          </li> 
        ))} 
      </ul> 
    </div> 
  ); 
} 
 
export default BookList;