import React, { useEffect, useState } from 'react';
import axios from "axios";
import Spinner from '../Components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://book-store-api-neon.vercel.app/books")
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Books List</h1>
        <Link to="/books/create" className="flex items-center space-x-2 text-sky-800 hover:text-sky-600 transition">
          <MdOutlineAddBox className="text-4xl" />
          <span className="font-medium">Add Book</span>
        </Link>
      </div>

      {/* Table or Spinner */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-300 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3 text-center">No</th>
                <th className="px-6 py-3 text-center">Title</th>
                <th className="px-6 py-3 text-center max-md:hidden">Author</th>
                <th className="px-6 py-3 text-center max-md:hidden">Publish Year</th>
                <th className="px-6 py-3 text-center">Operations</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-center border-b">{index + 1}</td>
                  <td className="px-6 py-4 text-center border-b">{book.title}</td>
                  <td className="px-6 py-4 text-center border-b max-md:hidden">{book.author}</td>
                  <td className="px-6 py-4 text-center border-b max-md:hidden">{book.publishYear}</td>
                  <td className="px-6 py-4 text-center border-b">
                    <div className="flex justify-center items-center gap-x-4">
                      <Link to={`/books/details/${book._id}`} title="Details">
                        <BsInfoCircle className="text-2xl text-green-600 hover:text-green-500 transition" />
                      </Link>
                      <Link to={`/books/edit/${book._id}`} title="Edit">
                        <AiOutlineEdit className="text-2xl text-yellow-500 hover:text-yellow-400 transition" />
                      </Link>
                      <Link to={`/books/delete/${book._id}`} title="Delete">
                        <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-500 transition" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
