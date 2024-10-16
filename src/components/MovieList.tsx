import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Header from "./Header";

interface Movie {
  _id: string;
  title: string;
  genre: string;
  language: string;
  director: string;
  releasedDate: string;
  voting: number;
  downVoting: number;
  poster: string;
}

const MovieCard: React.FC<{ movie: Movie; index: number; displayIndex: number }> = ({ movie, index, displayIndex }) => (
  <div
    key={movie?._id}
    className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center"
  >
    {/* Index number and Image */}
    <div className="flex items-center space-x-4 w-full md:w-auto">
      <div className="text-4xl w-[11vw] font-bold text-orange-500">
        {displayIndex}
      </div>
      <img
        src={movie?.poster}
        alt={movie?.title}
        className="w-28 h-36 object-cover rounded-lg"
        loading="lazy"
      />
    </div>

    {/* Description */}
    <div className="flex flex-col md:flex-row md:pl-[8%] w-full md:space-x-4">
      <div className="py-3 md:w-[100%]">
        <h3 className="text-xl font-BebasNune">{movie?.title}</h3>
        <p className="text-gray-600">Genre: {movie?.genre}</p>
        <p className="text-gray-600">Language: {movie?.language}</p>
        <p className="text-gray-600">Director: {movie?.director}</p>
        <p className="text-gray-600">Release Date: {movie?.releasedDate}</p>
      </div>
    </div>

    {/* Voting */}
    <div className="flex flex-row justify-start gap-4 w-full md:w-auto text-center">
      <div className="text-green-600 font-bold text-lg">👍 {movie.voting}</div>
      <div className="text-red-600 font-bold text-lg">👎 {movie.downVoting}</div>
    </div>
  </div>
);

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination state
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies...");
        const response = await axios.post("https://hoblist.com/api/movieList", {
          category: "movies",
          language: "kannada",
          genre: "all",
          sort: "voting",
        });
        setMovies(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie list:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Memoized values to avoid recalculations
  const indexOfLastMovie = useMemo(() => currentPage * moviesPerPage, [currentPage]);
  const indexOfFirstMovie = useMemo(() => indexOfLastMovie - moviesPerPage, [indexOfLastMovie]);
  const currentMovies = useMemo(() => movies.slice(indexOfFirstMovie, indexOfLastMovie), [movies, indexOfFirstMovie, indexOfLastMovie]);
  const totalPages = useMemo(() => Math.ceil(movies.length / moviesPerPage), [movies.length]);

  const handlePaginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex flex-col w-[100vw]">
        <Header />

        <div className="flex flex-col w-full h-auto my-[3%] justify-center items-center">
          <div className="mx-auto px-4">
            <h2 className="text-[24px] font-PoppinsBoldItalic text-white my-6">
              Here is the list of Movies
            </h2>
            {loading ? (
              <div className="flex h-[100vh] justify-center items-center" aria-busy="true">
                <div className="loader border-t-4 border-[#CB1517] rounded-full w-12 h-12 animate-spin"></div>
                <p className="ml-4 text-lg font-BebasNune text-[#CB1518] font-medium">
                  Loading...
                </p>
              </div>
            ) : (
              <div className="mt-[7%]">
                <div className="grid gap-6">
                  {currentMovies.map((movie, index) => (
                    <MovieCard
                      key={movie._id}
                      movie={movie}
                      index={index}
                      displayIndex={indexOfFirstMovie + index + 1}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-8 space-x-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handlePaginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="mx-4 text-center my-2 text-lg font-BebasNune text-[#CB1517]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handlePaginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieList;
