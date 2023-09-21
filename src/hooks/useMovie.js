import React, { useState, useEffect } from "react";
const key = "3a445a45";
export function useMovie(query, callback) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();

      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with detching movies");
          const data = await res.json();

          if (data.Response === "False") throw new Error("movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie();
      fetchMovie();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, error };
}
