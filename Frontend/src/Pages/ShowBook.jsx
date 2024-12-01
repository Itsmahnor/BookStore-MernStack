import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';

export const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-sky-100 flex items-center justify-center">
      <div className="p-6 w-full max-w-lg bg-white rounded-lg shadow-lg border border-blue-300">
        <BackButton />
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Book Details</h1>
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-blue-600 font-semibold">ID:</span>
              <span className="text-gray-800">{book._id}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-blue-600 font-semibold">Title:</span>
              <span className="text-gray-800">{book.title}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-blue-600 font-semibold">Author:</span>
              <span className="text-gray-800">{book.author}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-blue-600 font-semibold">Publish Year:</span>
              <span className="text-gray-800">{book.publishYear}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-blue-600 font-semibold">Created At:</span>
              <span className="text-gray-800">{new Date(book.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-semibold">Last Updated:</span>
              <span className="text-gray-800">{new Date(book.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
