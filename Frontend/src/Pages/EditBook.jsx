import { useEffect, useState } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBook() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Unable to fetch book details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  const handleEditBook = () => {
    if (!title || !author || isNaN(publishYear)) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const data = { title, author, publishYear };
    setLoading(true);

    axios.patch(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred while saving. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-sky-100 flex items-center justify-center">
      <div className="p-6 w-full max-w-xl bg-white rounded-lg shadow-lg border border-blue-300">
        <BackButton />
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Edit Book</h1>
        {loading && <Spinner />}
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-blue-600">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-lg font-medium text-blue-600">Author</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label htmlFor="publishYear" className="block text-lg font-medium text-blue-600">Publish Year</label>
            <input
              id="publishYear"
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <button
            className={`w-full py-2 text-white font-semibold rounded-md transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleEditBook}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
