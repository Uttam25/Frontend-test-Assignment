import React, { useEffect, useState } from "react";
import axios from "axios";

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

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination state
  const moviesPerPage = 10;

  useEffect(() => {
    console.log("Fetching movies...");
    axios
      .post("https://hoblist.com/api/movieList", {
        category: "movies",
        language: "kannada",
        genre: "all",
        sort: "voting",
      })
      .then((response) => {
        console.log("Movies fetched successfully:", response.data.result);
        setMovies(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie list:", error);
        setLoading(false);
      });
  }, []);

  // Calculate the current movies to display based on pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Calculate total pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
    <div>
        
    </div>
      <div className="flex flex-row w-[100vw] my-[3%] justify-center items-center">
        <div className=" mx-auto px-4">
          <h2 className="text-[24px] font-medium text-[#000000] my-6">
            Here is the list of Movies
          </h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader border-t-4 border-[#CB1517] rounded-full w-12 h-12 animate-spin"></div>
              <p className="ml-4 text-lg font-medium">Loading...</p>
            </div>
          ) : (
            <div>
              <div className="grid gap-6">
                {currentMovies.map((movie, index) => (
                  <div
                    key={movie?._id}
                    className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center"
                  >
                    {/* Index number and Image (Row on mobile) */}
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                      <div className="text-4xl w-[11vw] font-bold text-orange-500">
                        {indexOfFirstMovie + index + 1}
                      </div>
                      <img
                        src={movie?.poster}
                        alt={movie?.title}
                        className="w-28 h-36 object-cover rounded-lg"
                      />
                    </div>

                    {/* Description, Upvotes and Downvotes (Row on mobile, column on desktop) */}
                    <div className="flex flex-col md:flex-row md:pl-[8%] w-full  md:space-x-4">
                      <div className="py-3 md:w-[100%]">
                        <h3 className="text-xl font-semibold">
                          {movie?.title}
                        </h3>
                        <p className="text-gray-600">Genre: {movie?.genre}</p>
                        <p className="text-gray-600">
                          Language: {movie?.language}
                        </p>
                        <p className="text-gray-600">
                          Director: {movie?.director}
                        </p>
                        <p className="text-gray-600">
                          Release Date: {movie?.releasedDate}
                        </p>
                      </div>
                      
                    </div>
                    <div className="flex flex-row justify-start gap-4 w-full md:w-auto text-center">
                        <div className="text-green-600 font-bold text-lg">
                          👍 {movie.voting}
                        </div>
                        <div className="text-red-600 font-bold text-lg">
                          👎 {movie.downVoting}
                        </div>
                      </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1} // Disable previous button on the first page
                >
                  Previous
                </button>
                <span className="mx-4 text-lg font-bold text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages} // Disable next button on the last page
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieList;
