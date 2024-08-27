import { createBrowserRouter } from "react-router-dom";
import Header from "../sections/Header";
import MoviePage from "../pages/MoviePage";
import Main from "../pages/Main";
import MovieListPage from "../pages/MovieListPage";
import MovieSearchResult from "../pages/MovieSearchResult";

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Header />
            <Main />
        </>,
    },
    {
        path: "/movie/:id",
        element: <>
            <Header />
            <MoviePage />
        </>
    },
    {
        path: "/movies/:type",
        element: <>
            <Header />
            <MovieListPage />
        </>
    },
    {
        path: "/tvshows/:type",
        element: <>
            <Header />
            <MovieListPage />
        </>
    },
    {
        path: "/movie/find/:query",
        element: <>
            <Header />
            <MovieSearchResult />
        </>
    }
  ]);

  export default router