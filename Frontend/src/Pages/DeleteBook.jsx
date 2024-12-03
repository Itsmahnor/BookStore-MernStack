import { useState } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://book-store-api-neon.vercel.app/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while deleting. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg w-full transform scale-105 transition duration-300 hover:scale-110">
        <BackButton />
        <h1 className="text-3xl font-bold text-center mb-4 text-red-500">
          Confirm Deletion
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Are you sure you want to permanently delete this book? This action
          cannot be undone.
        </p>
        {loading && (
          <div className="flex justify-center mb-4">
            <Spinner />
          </div>
        )}
        <div className="flex justify-center space-x-4">
          <button
            className={`px-6 py-3 text-white font-medium rounded-lg shadow-md bg-sky-500 hover:bg-sky-600 transition ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleDeleteBook}
            disabled={loading}
          >
            Yes, Delete
          </button>
          <button
            className="px-6 py-3 text-gray-800 font-medium rounded-lg shadow-md bg-gray-300 hover:bg-gray-400 transition"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBook;
