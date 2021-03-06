import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import Login from './pages/login/login'
import RestorePassword from './pages/restorePassword/restorePassword'
import Main from './pages/main/main'
import Register from './pages/register/register'
import Task from './pages/tasks/task'
import Tasks from './pages/tasks/tasks'
import Admin from './pages/admin/admin'
import MainTemplate from './templates/main/mainTemplate'
import AuthTemplate from './templates/auth/authTemplate'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppLoader from './components/hoc/appLoader'
import history from './utils/history'
import ProtectedRoute from './components/hoc/protectedRoute'
import video from './assets/video/video.mp4'
import AdminRoute from './components/hoc/adminRoute'

function App() {
  return (
    <>
      <video autoPlay muted loop id="mainVideoBackground">
        <source src={video} type="video/mp4" />
      </video>
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <MainTemplate content={Main} />}
          />
          <Route
            path="/login"
            component={() => <AuthTemplate content={Login} />}
          />
          <Route
            path="/register"
            component={() => <AuthTemplate content={Register} />}
          />
          <Route
            path="/restore-password"
            component={() => <AuthTemplate content={RestorePassword} />}
          />
          <ProtectedRoute>
            <AppLoader>
              <Switch>
                <Route
                  path="/tasks/add"
                  component={() => <MainTemplate content={Task} />}
                />
                <Route
                  path="/tasks/:taskId"
                  component={(...rest) => (
                    <MainTemplate content={Task} {...rest} />
                  )}
                />
                <Route
                  path="/tasks"
                  component={() => <MainTemplate content={Tasks} />}
                />
                <AdminRoute>
                  <Route
                    path="/admin"
                    component={() => <MainTemplate content={Admin} />}
                  />
                </AdminRoute>
              </Switch>
            </AppLoader>
          </ProtectedRoute>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
