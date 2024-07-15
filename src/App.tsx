import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './views/Login/Login';
import Instructions from './views/Instructions/Instructions';
import Assessment from './views/Assessment/Assessment';
import Success from './views/Success/Success';

function App() {

  const router = createBrowserRouter([
    {
      id: "assessment",
      path: ":id",
      children: [
        {
          id: "login",
          path: "login",
          element: <Login />,
        },
        {
          id: "start",
          path: "start",
          element: <Instructions />,
        },
        {
          id: "question",
          path: "assessment",
          element: <Assessment />,
        },
        {
          id: "success",
          path: "thankyou",
          element: <Success />,
        },
      ]
    }

    // {
    //   id: "root",
    //   path: "/",
    //   element: <PrivateRoutes />,
    //   children: [
    //     {
    //       path: "",
    //       element: <div>Home</div>,
    //     },
    //     {
    //       path: "/clients",
    //       element: <ClientLayout />,
    //       children: [
    //         {
    //           path: "",
    //           element: <ClientView />,
    //         },
    //         {
    //           path: "create",
    //           element: <ClientCreate />,
    //         },
    //         {
    //           path: ":id",
    //           element: <ClientDetail />,
    //         },
    //       ]
    //     },
    //     {
    //       path: "/question-pool",
    //       element: <div>qpool</div>,
    //     },

    //   ],
    // }
  ]);

  return (
    <>
      <RouterProvider router={router} fallbackElement={<p className="text-centre text-lg bg-white text-colorText pt-20">Please wait...</p>} />
    </>
  )
}

export default App
