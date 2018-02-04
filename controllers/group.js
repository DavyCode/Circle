
module.exports = function(Group){
    return {
        SetRouting: function(router){
              router.get('/group/:id', this.getGroupPage)
        },

        getGroupPage: function(req, res){
              const group = req.params.id

         Group.findById(group, (err, foundGroup) => {
             (err)? console.log(err):  res.render('group/group', {title: 'Circle - Group Name', user: req.user, group: foundGroup});
            });
             
        }


    }
}