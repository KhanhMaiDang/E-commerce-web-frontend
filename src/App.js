import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { useDispatch, useSelector } from 'react-redux';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import ProductsInCategoryScreen from './screens/ProductsInCategoryScreen';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import AdminRoute from './components/AdminRoute';
import ManageCategoryScreen from './screens/ManageCategoryScreen';
import ManageProductScreen from './screens/ManageProductScreen';
import ManageCustomerScreen from './screens/ManageCustomerScreen';


function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const dispatch = useDispatch();
  const productCategoryList = useSelector(state => state.productCategoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const handleLoggedOut = () => {
    alert("Log out successfully");
  }

  const signoutHandler = () => {
    dispatch(signout(handleLoggedOut));
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <a href="/">Boko</a>
          </div>
          <div>
            {
              (userInfo && userInfo.roles.includes("ADMIN") && (
                <div className="dropdown">
                  <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content" style={{ textAlign: "center" }}>
                    <li>
                      <Link to="/admin/productlist">Manage product</Link>
                    </li>
                    <li>
                      <Link to="/admin/categorylist">Manage category</Link>
                    </li>
                    <li>
                      <Link to="/admin/customerlist">Manage customer</Link>
                    </li>
                  </ul>
                </div>
              ))
            }
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">Hi, {userInfo.name} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <Link to="/" onClick={signoutHandler}>Sign out</Link>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign in</Link>
              )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/public/categories/${c.id}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path={`/public/categories/:id`} component={ProductsInCategoryScreen} ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <AdminRoute path="/admin/productlist" component={ManageProductScreen} exact></AdminRoute>
          <AdminRoute path="/admin/categorylist" component={ManageCategoryScreen} exact></AdminRoute>
          <AdminRoute path="/admin/customerlist" component={ManageCustomerScreen} exact></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>

        </main>
        <footer className="row center">All right reserved</footer>
      </div >
    </BrowserRouter>
  );
}

export default App;
