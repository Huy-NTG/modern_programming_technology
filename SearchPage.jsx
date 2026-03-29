import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    if (!query) return;

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setResults(data.results || []))
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Kết quả tìm kiếm cho: "{query}"
      </h2>

      <MovieList
        movies={results}
        imageBaseUrl={IMAGE_BASE_URL}
        onMovieClick={(id) => navigate(`/movie/${id}`)}
      />
    </div>
  );
};

export default SearchPage;
