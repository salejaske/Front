import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HomePage from './components/HomePage/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import UserLoginPage from './components/UserLoginPage/UserLoginPage';
import CategoryPage from './components/CategoryPage/CategoryPage';
import { UserRegistrationPage } from './components/UserRegistrationPage/UserRegistrationPage';
import OrdersPage from './components/OrdersPage/OrdersPage';
import AdministratorLoginPage from './components/AdministratorLoginPage/AdministratorLoginPage';
import AdministratorDashboard from './components/AdministratorDashboard/AdministratorDashboard';
import AdministratorDashboardCategory from './components/AdministratorDashboardCategory/AdministratorDashboardCategory';
import AdministratorDashboardFeature from './components/AdministratorDashboardFeature/AdministratorDashboardFeature';
import AdministratorDashboardArticle from './components/AdministratorDashboardArticle/AdministratorDashboardArticle';
import AdministratorDashboardPhoto from './components/AdministratorDashboardPhoto/AdministratorDashboardPhoto';
import ArticlePage from './components/ArticlePage/ArticlePage';
import AdministratorDashboardOrder from './components/AdministratorDashboardOrder/AdministratorDashboardOrder';


 
ReactDOM.render(
  <React.StrictMode> 
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/contact" component={ ContactPage } />
        <Route path="/user/login" component={ UserLoginPage } />
        <Route path="/user/register" component={ UserRegistrationPage } />
        <Route path="/category/:cId" component={ CategoryPage } />
        <Route path="/article/:aId" component={ ArticlePage } />
        <Route path="/user/orders" component={ OrdersPage } />
        <Route path="/administrator/login" component={ AdministratorLoginPage } />
        <Route exact path="/administrator/dashboard/" component={ AdministratorDashboard } />
        <Route path="/administrator/dashboard/category/" component={ AdministratorDashboardCategory } />
        <Route path="/administrator/dashboard/feature/:cId" component={ AdministratorDashboardFeature } />
        <Route path="/administrator/dashboard/article/" component={ AdministratorDashboardArticle } />
        <Route path="/administrator/dashboard/photo/:aId" component={ AdministratorDashboardPhoto } />
        <Route path="/administrator/dashboard/order/" component={ AdministratorDashboardOrder } />

        
      </Switch>
    </HashRouter> 

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
