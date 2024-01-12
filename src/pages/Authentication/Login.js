import PropTypes from "prop-types";
import React from 'react'
import { MetaTags } from 'react-meta-tags'
import { Container, Alert, Input, FormFeedback, Button} from 'reactstrap'
import EyeShowIcon from "../../assets/images/FlipEx/eye.svg"
import EyeHideIcon from "../../assets/images/FlipEx/hide.svg"
import Logo from "../../assets/images/logo.png"
import Loader from 'pages/Utility/Loader'
import Iconify from '../Utility/Iconfiy'


// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

// actions
import { loginUser } from "../../store/actions";

const LoginUser = props => {

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.history));
    }
  });



  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

  const { loading } = useSelector(state => ({
    loading: state.Login.loading
  }))



  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Login | Admin dashboard</title>
        </MetaTags>

        <Container>
          <div className='main-contentyu container-fluid d-flex justify-content-center'>

            <div className='major-width'>
              <div className='text-center migi'>
              <img src={Logo} alt=""  height={100} /> 
                <h3>Welcome Back Admin</h3>
                {error ? <Alert color="danger">{error}</Alert> : null}
              </div>
              <form className='' 
                      onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                <div className='input-set'>
                  <label className='form-label '>Email Address</label>
                  <Input
                      name="email"
                      className="form-control"
                      placeholder="Enter your email..."
                      type="email"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ""}
                      
                      invalid={
                        validation.touched.email && validation.errors.email ? true : false
                      }
                    />

                  {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                    ) : null}

                </div>
                
                <div className='input-set'>
                  <label className='form-label'>Password</label>
                  <div style={{ position: "relative"}}>
                      <Input
                        name="password"
                        value={validation.values.password || ""}
                        type={showPassword ? "text" : "password"}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.password && validation.errors.password ? true : false
                        }
                      /> 
                      <img src={showPassword ? EyeShowIcon : EyeHideIcon}   onClick={() => setShowPassword(!showPassword)} alt="" style={{ position: "absolute", top: 8, right: 20}} />
                    </div>

                           

                  {validation.touched.password && validation.errors.password ? (
                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                  ) : null}
                </div>

                  <a href="/forgot-password"><div style={{ width: '100%', textAlign: 'right', fontWeight: '500', fontSize: '12px' }}>Forget Password?</div></a>


                <div className="mt-3 d-grid">
                          <Button
                                color="primary"
                                type="submit"
                                className="font-16 btn-block btn btn-primary"
                                
                              >
                         { !loading && 'Sign in'}
                          { loading && (
                            <>
                             <Loader />
                            </>
                          ) 
                          }
                            </Button>
                          </div>
                <div className='register-prompt' style={{ fontSize: "14px", paddingTop: "10px"}}>Dont have an account with us?<span><a href='/register'> Sign up here</a></span></div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default LoginUser


LoginUser.propTypes = {
  history: PropTypes.object,
};
