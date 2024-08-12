import { createBrowserRouter } from 'react-router-dom';
import Hero from '../sections/Hero';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Hero />
    }
]);

export default router;
