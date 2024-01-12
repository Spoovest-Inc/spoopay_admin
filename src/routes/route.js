import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

 const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {

      const auth = localStorage.getItem("profile") && JSON.parse(localStorage.getItem("profile"))
      // console.log(auth?.code === 200);
      if (isAuthProtected && auth?.code !== 200){
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  isBatchProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any, 
}


// export const BatchMiddleware = ({
//   component: Component,
//   layout: Layout,
//   isBatchProtected,
//   ...rest 
// }) => (
//   <Route 
//      { ...rest}
//      render={props => {
//        if(isBatchProtected && !localStorage.getItem("todayBatch") && (localStorage.getItem("profile").role === 2)){
//          return (
//            <Redirect 
//              to={{ pathname: "/create-batch", state: { from: props.location} }}
//              />
//          )
//        }else if (isBatchProtected && !localStorage.getItem("todayBatch") && !(localStorage.getItem("profile").role === 2)){
//         return (
//           <Redirect 
//             to={{ pathname: "/waiting", state: { from: props.location} }}
//             />
//         )
//        }

//        return (
//          <Layout>
//            <Component { ...props} />
//          </Layout>
//        )
//      }}
//      />
// )

// BatchMiddleware.propTypes = {
//   isBatchProtected: PropTypes.bool,
//   component: PropTypes.any,
//   location: PropTypes.object,
//   layout: PropTypes.any
// }

export default Authmiddleware




