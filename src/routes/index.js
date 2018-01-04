export default {
  childRoutes: [{
    path: '/',
    // onEnter: redirectToLogin,
    component: require('../containers/Index').default,
    childRoutes: []
  }]
}
