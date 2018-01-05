export default {
  childRoutes: [{
    path: '/',
    component: require('../containers/Index').default,
    indexRoute: {
      onEnter: (nextState, replace) => replace('/posts')
    },
    childRoutes: [{
      path: 'posts',
      getComponent(nextState, cb) {
        cb(null, require('../containers/Post').PostListPage)
      }
    }, {
      path: 'post/:id',
      getComponent(nextState, cb) {
        cb(null, require('../containers/Post').PostPage)
      }
    }]
  }]
}
