import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const options = {
    root: null,
    rootMargin: "10px",
    treshhold: 1,
  };

  const observer = useRef(null);
  const lastUserlementRef = useCallback(
    (node) => {
      console.log(node);
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visiii");
          setPage((prevPageNumber) => prevPageNumber + 1);
          // fetchUsers();
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  async function fetchUsers() {
    if (page === 1) {
      setIsLoading(true);
    }
    setError(false);
    const response = await axios.get(
      `https://randomuser.me/api/?page=${page}&results=25`
    );
    // await axios({
    //   // method: "GET",
    //   url: `https://randomuser.me/api/?page=${page}&results=25`,
    //   // params: { page: page },
    // })
    // .then((res) => {
    //   setUsers((prev) => {
    //     return [...prev, ...res.data.results];
    //   });
    //   setHasMore(res.data.results.length > 0);
    //   setIsLoading(false);
    //   // console.log(res.data);
    // })
    // .catch((err) => {
    //   setError(true);
    // });
    // console.log(users);
    setUsers((prev) => {
      return [...prev, ...response.data.results];
    });
    setHasMore(response.data.results.length > 0);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUsers();
    // setIsLoading(false);
    console.log(page);
    console.log(users);
    console.log(isLoading);
    console.log(lastUserlementRef);
  }, [page]);

  return {
    users,
    isLoading,
    // setIsLoading,
    // fetchUsers,
    // handleScroll,
    error,
    lastUserlementRef,
  };
};
