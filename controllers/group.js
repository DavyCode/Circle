
module.exports = function(Users, async){
    return {
        SetRouting: function(router){
              router.get('/group/:name', this.getGroupPage);
             
              router.post('/group/:name', this.postGroupPage);
        },

        getGroupPage: function(req, res){
            const name = req.params.name;

            // Group.findById(group, (err, foundGroup) => {
            //     (err)? console.log(err):  res.render('group/group', {title: 'Circle - Group Name', user: req.user, group: foundGroup});
            // });    
            
            res.render('group/group', {title: 'Circle - Group Name', user: req.user, groupName: name});
        },

        postGroupPage: function(req,res){
            async.parallel([ 
                function(callback){
                    if(req.body.receiver){
                        Users.update({
                            'username': req.body.receiver,
                            'request.userId': {$ne: req.user._id},
                            'friendsList.friendId': {$ne: req.user._id}
                        },
                        {
                            $push: {request: {
                                userId: req.user._id,
                                username: req.user.username
                            }},
                            $inc: { totalRequest: 1}

                        }, (err, count) => {
                            callback(err, count)
                        }
                    
                    )
                    }
                }
                ,
                function(callback){
                    if(req.body.receiver){
                        Users.update({
                                    'username': req.user.username,
                                    'sentRequest.username': {$ne: req.body.receiver}
                            },
                            {
                              $push: {sentRequest: {
                                        username: req.body.receiver
                            }}
                            },(err, count) => {
                                    callback(err, count);
                            })
                    }
                }
            ], (err, results) => {
                res.redirect('/group/'+req.params.name);
            });
        }



    }
}