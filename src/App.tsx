import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './views/Login/Login';
import Instructions from './views/Instructions/Instructions';
import Assessment from './views/Assessment/Assessment';
import Success from './views/Success/Success';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Base from './views/Base/Base';
import Four0Four from './components/four0Four/four0Four';
import AssessmentHOC from './views/AssessmentHOC/AssessmentHOC';
import TermsAndConditions from './views/TermsAndConditions/TermsAndConditions';


function App() {

  const router = createBrowserRouter([
    {
      id: "home",
      path: "/",
      element: <Four0Four />,
    },
    {
      id: "tnc",
      path: "tnc",
      element: <TermsAndConditions />,
    },
    {
      id: "assessment",
      path: ":id",
      element: <Base />,
      children: [
        {
          id: "login",
          path: "login",
          element: <Login />,
        },
        {
          id: "assessmentHOC",
          path: "assessment/:pid",
          element: <AssessmentHOC />,
          children: [
            {
              id: "question",
              path: ":qindex",
              element: <Assessment />,
            },
            {
              id: "success",
              path: "thankyou",
              element: <Success />,
            },
            {
              id: "start",
              path: "start",
              element: <Instructions />,
            },
          ]
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
      <Provider store={store}>
        <RouterProvider router={router} fallbackElement={<p className="text-centre text-lg bg-white text-colorText pt-20">Please wait...</p>} />
      </Provider>
    </>
  )
}

export default App
