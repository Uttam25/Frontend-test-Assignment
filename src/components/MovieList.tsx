import React, { useMemo, useState } from "react";
import Header from "./Header";
import Loading from "./Loading";
import useFetchMovies from "../hooks/useFetchMovies";

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

const MovieCard: React.FC<{ movie: Movie; displayIndex: number }> = ({
  movie,
  displayIndex,
}) => (
  <div
    key={movie._id}
    className="bg-black rounded-lg shadow-lg p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center"
  >
    <div className="flex items-center space-x-4 w-full md:w-auto">
      <div className="text-4xl w-[11vw] font-bold text-orange-500">
        {displayIndex}
      </div>
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-28 h-36 object-cover rounded-lg"
        loading="lazy"
      />
    </div>

    <div className="flex flex-col md:flex-row md:pl-[8%] w-full md:space-x-4">
      <div className="py-3 flex flex-col text-white justify-center items-center md:w-[100%]">
        <h3 className="text-xl text-[#FFD700] text-center font-BebasNune">
          {movie.title}
        </h3>
        <p className="text-white">Genre: {movie.genre}</p>
        <p className="text-white">Language: {movie.language}</p>
        <p className="text-white">Director: {movie.director}</p>
        <p className="text-white">Release Date: {movie.releasedDate}</p>
      </div>
    </div>

    <div className="flex flex-row justify-center gap-4 w-full md:w-auto text-center">
      <div className="text-green-600 font-bold text-lg">👍 {movie.voting}</div>
      <div className="text-red-600 font-bold text-lg">👎 {movie.downVoting}</div>
    </div>
  </div>
);

const MovieList: React.FC = () => {
  const { movies, loading, error } = useFetchMovies();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const moviesPerPage = 10;

  const indexOfLastMovie = useMemo(
    () => currentPage * moviesPerPage,
    [currentPage]
  );
  const indexOfFirstMovie = useMemo(
    () => indexOfLastMovie - moviesPerPage,
    [indexOfLastMovie]
  );
  const currentMovies = useMemo(
    () => movies?.slice(indexOfFirstMovie, indexOfLastMovie) || [],
    [movies, indexOfFirstMovie, indexOfLastMovie]
  );
  const totalPages = useMemo(
    () => Math.ceil((movies?.length || 0) / moviesPerPage),
    [movies]
  );

  const handlePaginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  return (
    <div className="flex flex-col w-[100vw]">
      <Header />
      <div className="flex flex-col w-[100vw] h-auto py-[3%] justify-center items-center">
        <div className="px-4">
          <h2 className="text-[24px] font-PoppinsBoldItalic text-white py-6">
            Here is the list of Movies
          </h2>
          <div className="mt-[7%]">
            <div className="grid text-white gap-6">
              {currentMovies.map((movie, index) => (
                <MovieCard
                  key={movie._id}
                  //@ts-ignore
                  movie={movie}
                  displayIndex={indexOfFirstMovie + index + 1}
                />
              ))}
            </div>

            <div className="flex justify-center my-8 space-x-4">
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handlePaginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                Previous
              </button>
              <span className="mx-4 text-center my-2 text-lg font-BebasNune text-[#CB1517]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handlePaginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
