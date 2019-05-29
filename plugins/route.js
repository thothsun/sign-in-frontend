export default ({app}) => {
  app.router.beforeEach((to, from, next) => {
    //TODO 1。先打开主页才跳转登录页，太慢。2。标题css？太大？
    if (to.path === '/login') {
      sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path !== '/login') {
      next({path: '/login'})
    } else {
      next()
    }
  })
}
