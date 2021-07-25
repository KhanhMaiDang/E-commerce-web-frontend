import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { useDispatch, useSelector } from 'react-redux';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import ProductsInCategoryScreen from './screens/ProductsInCategoryScreen';


function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const dispatch = useDispatch();

  const productCategoryList = useSelector(state => state.productCategoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

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
            <a href="/signin">Sign in</a>
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
          <Route path={`/public/categories/:id`} component={ProductsInCategoryScreen} exact></Route>
          {/*<Route path={`/public/categories/${c.name}/:id`} component={ProductsInCategoryScreen}></Route>*/}
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>

        </main>
        <footer className="row center">All right reserved</footer>
      </div >
    </BrowserRouter>
  );
}

export default App;
