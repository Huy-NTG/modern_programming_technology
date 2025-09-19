import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);

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
    <div>
      <h2>Kết quả tìm kiếm cho: "{query}"</h2>
      <ul>
        {results.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
