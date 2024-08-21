import { createBrowserRouter } from "react-router-dom";
import Header from "../sections/Header";
import MoviePage from "../pages/MoviePage";
import Main from "../pages/Main";

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
    }
  ]);

  export default router