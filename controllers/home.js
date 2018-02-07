
module.exports = function(async, Group, _){
  return {
    SetRouting: function(router){
        router.get('/home', this.homePage);

    },
          //ROUTE FUNCTIONS

          //home
        homePage: function(req, res){
            async.parallel([
                function(callback){
                  Group.find({}, (err, result) => {
                    callback(err, result);
                  })
                },

                function(callback){
                    Group.aggregate([ { $group: { _id: '$category'} } ], (err, newResult) => {
                        callback(err, newResult);
                    })
                }
              ], (err, results) => {
                  const foundResult = results[0];
                  const aggregateResult = results[1];
                  


                  const dataChunk = [];
                  const chunkSize = 3;
                  for(let i = 0; i < foundResult.length; i += chunkSize){
                      dataChunk.push(foundResult.slice(i, i + chunkSize));
                  }

                  const categorySort = _.sortBy(aggregateResult, '_id');

                  return res.render('home/home', {title: 'Circle - Home', data: dataChunk, user:req.user, category: categorySort})
                }
            )   
        }

  }
}