// 'use strict';

//Require for local uploads
// const path = require('path');
// const fs = require('fs');

module.exports = function(formidable, Group, aws) {
   return {
        SetRouting: function(router) {
            router.get('/dashboard',this.getAdmin);

            router.post('/uploadFile', aws.Upload.any(), this.uploadFile);
            router.post('/dashboard', this.adminPostPage)
        },

        getAdmin: function(req, res) {
            res.render('admin/dashboard')
        },

        adminPostPage: function(req, res) {
            const newGroup = new Group();
            newGroup.groupname = req.body.groupname;
            newGroup.category = req.body.category;
            newGroup.image = req.body.upload;

            newGroup.save((err) => {
              res.render('admin/dashboard');
            })
        },

        //Upload
        uploadFile: function(req, res){
              const form = new formidable.IncomingForm();
              // form.uploadDir = path.join(__dirname, '../public/uploads');

              form.on('file', (field, file) => {
                // fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                //   if(err) throw err;
                //   console.log('File successfully renamed');
                // })
              });

              form.on('error', (err) => {
                console.log(err)
              });

              form.on('end', () => {
                console.log('File upload complete');
              });

              form.parse(req);
        }

   } 
}

