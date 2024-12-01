import { useState } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateBook() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios.post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-sky-100">
      {/* Back Button */}
      <div className="self-start ml-6 mb-4">
        <BackButton />
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Add a New Book</h1>

        {/* Loading Indicator */}
        {loading && (
          <div className="mb-4">
            <Spinner />
          </div>
        )}

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Book Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>

        {/* Author Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author's name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>

        {/* Publish Year Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            placeholder="Enter publish year"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveBook}
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded-md transition ${
            loading
              ? "bg-sky-300 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600"
          }`}
        >
          {loading ? "Saving..." : "Save Book"}
        </button>
      </div>
    </div>
  );
}

export default CreateBook;
