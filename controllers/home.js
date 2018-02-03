
module.exports = function() {
  return {
    SetRouting: function(router){
        router.get('/home', this.homePage);
    },
          //ROUTE FUNCTIONS

          //home
          homePage: function(req, res) {
            return res.render('home')
          }

  }
}