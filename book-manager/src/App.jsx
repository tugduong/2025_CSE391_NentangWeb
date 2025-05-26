import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [
      { id: 1, title: 'React Cơ Bản', author: 'Nguyễn Văn A', year: 2023 },
      { id: 2, title: 'JavaScript Nâng Cao', author: 'Trần Thị B', year: 2022 },
    ];
  });

  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleUpdateBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    setEditingBook(null);
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá sách này không?')) {
      const filteredBooks = books.filter((book) => book.id !== id);
      setBooks(filteredBooks);
      if (editingBook && editingBook.id === id) {
        setEditingBook(null);
      }
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Quản Lý Sách</h1>
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
