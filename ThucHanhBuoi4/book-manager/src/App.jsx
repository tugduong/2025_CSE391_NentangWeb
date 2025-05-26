import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  // Dữ liệu mẫu ban đầu
  // const [books, setBooks] = useState([
  //   { id: 1, title: 'React Cơ Bản', author: 'Nguyễn Văn A', year: 2023 },
  //   { id: 2, title: 'JavaScript Nâng Cao', author: 'Trần Thị B', year: 2022 },
  // ]);

  // Khởi tạo books từ localStorage (nếu có), nếu không thì dùng mảng mặc định
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem('books');
    return stored ? JSON.parse(stored) : [
      { id: 1, title: 'React Cơ Bản', author: 'Nguyễn Văn A', year: 2023 },
      { id: 2, title: 'JavaScript Nâng Cao', author: 'Trần Thị B', year: 2022 },
    ];
  });
  
  // Để lưu cuốn sách đang edit
  const [editingBook, setEditingBook] = useState(null);

  // Mỗi khi books thay đổi, tự động lưu vào localStorage
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  // Hàm thêm sách 
  const handleAddBook = (newBook) => { 
    setBooks([...books, newBook]); 
  }; 

   // Hàm cập nhật 
  const handleUpdateBook = (updatedBook) => { 
    const newList = books.map(b =>  
      b.id === updatedBook.id ? updatedBook : b 
    ); 
    setBooks(newList); 
    setEditingBook(null); // Thoát chế độ sửa 
  }; 
 
  // Khi bấm nút "Sửa" trong BookList 
  const handleEditClick = (book) => { 
    setEditingBook(book); 
  }; 

  // Nút "Xóa"
  const handleDeleteBook = (id) => { 
  const newList = books.filter(b => b.id !== id); 
  setBooks(newList); 
  };

  return ( 
    // <div style={{ margin: '20px' }}> 
    //   <h1>Quản Lý Sách</h1> 

    <div className="container mt-5">
      <h1 className="text-center mb-4">📚 Quản Lý Sách</h1>

      <BookForm 
        onAdd={handleAddBook}
        onUpdate={handleUpdateBook} 
        editingBook={editingBook} 
      /> 

      <BookList 
      books={books}
      onEdit={handleEditClick}  
      onDelete={handleDeleteBook} 
      /> 
      
    </div> 
  );
}
export default App;