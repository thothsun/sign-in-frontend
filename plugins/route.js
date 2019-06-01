export default ({app}) => {
  app.router.beforeEach((to, from, next) => {
    console.log('app:'+app)

    if (to.path === '/login') {
      sessionStorage.removeItem('user');
      console.log('here 1'+to.path);
      next();
    } else {
      let user = JSON.parse(sessionStorage.getItem('user'));
      console.log('user:' + user + ',' + !user);
      if (!user) {
        console.log('here 2'+to.path);
        next('/login');
      } else {
        console.log('here 3'+to.path);
        next();
      }
    }
    // TODO 1。先打开主页才跳转登录页，太慢。2。标题css？太大？

  })
}
