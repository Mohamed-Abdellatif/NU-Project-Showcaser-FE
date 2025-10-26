import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

/**
 * Top-level application component that provides routing for the app.
 *
 * @returns A React element rendering a RouterProvider configured with the application's router.
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;