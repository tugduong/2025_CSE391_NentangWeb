import React, { useState, useEffect } from 'react'; 
 
function BookForm({ onAdd, onUpdate, editingBook  }) { 
  const [title, setTitle] = useState(''); 
  const [author, setAuthor] = useState(''); 
  const [year, setYear] = useState(''); 
 
  // @@@ useEffect lắng nghe sự thay đổi của editingBook (ở đây là  1 class) !
  // Mỗi khi editingBook thay đổi, nạp dữ liệu vào form 
  useEffect(() => { 
    if (editingBook) { 
      setTitle(editingBook.title); 
      setAuthor(editingBook.author); 
      setYear(editingBook.year); 
    } else { 
      setTitle(''); 
      setAuthor(''); 
      setYear(''); 
    } 
  }, [editingBook]); 

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (!title || !author || !year) { 
      alert('Vui lòng nhập đầy đủ thông tin!'); 
      return; 
    } 
    if (editingBook) { 
      // Update 
      onUpdate({ 
        ...editingBook, 
        title, 
        author, 
        year: parseInt(year, 10), 
      });
    }
    else {
    // Tạo object sách mới 
        const newBook = { 
        id: Date.now(), // Tạo ID tạm 
        title, 
        author, 
        year: parseInt(year, 10), 
    }; 
    onAdd(newBook); 
    }
    // Xóa trắng form 
    setTitle(''); 
    setAuthor(''); 
    setYear(''); 
  }; 
 
  return ( 
    // <form onSubmit={handleSubmit} className="mb-4">
    //   <div className="row g-3">
    //     <div className="col-md-4">
    //       <input
    //         type="text"
    //         name="title"
    //         placeholder="Tên sách"
    //         className="form-control"
    //         value={formData.title}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="col-md-4">
    //       <input
    //         type="text"
    //         name="author"
    //         placeholder="Tác giả"
    //         className="form-control"
    //         value={formData.author}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="col-md-2">
    //       <input
    //         type="number"
    //         name="year"
    //         placeholder="Năm"
    //         className="form-control"
    //         value={formData.year}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="col-md-2 d-grid">
    //       <button type="submit" className="btn btn-success">
    //         {editingBook ? 'Cập nhật' : 'Thêm'}
    //       </button>
    //     </div>
    //   </div>
    // </form>
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}> 
      <h2>{editingBook ? 'Cập nhật Sách' : 'Thêm Sách'}</h2> 
      <div> 
        <label>Tiêu đề: </label> 
        <input  
          value={title}  
          onChange={(e) => setTitle(e.target.value)}  
        /> 
      </div> 
      <div> 
        <label>Tác giả: </label> 
        <input  
          value={author}  
          onChange={(e) => setAuthor(e.target.value)}  
        /> 
      </div> 
      <div> 
        <label>Năm XB: </label> 
        <input  
          type="number" 
          value={year}  
          onChange={(e) => setYear(e.target.value)}  
        /> 
      </div> 
      <button type="submit">
         {editingBook ? 'Cập nhật' : 'Thêm'}
      </button> 
    </form> 
  ); 
} 
 
export default BookForm; 