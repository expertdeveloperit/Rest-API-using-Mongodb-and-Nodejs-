import multer from  'multer' ;
import fs from 'fs';

export const storage = multer.diskStorage({
  destination: function(req, file, cb) { 
    var path = `./public/uploads/`;   

    try {
     fs.lstatSync(path).isDirectory() 
     cb(null,path);
    } catch(err) {
    // Handle error
    if(err.code == 'ENOENT'){
     //no such file or directory
     fs.mkdirSync(path);
      cb(null,path);
     } else {
      console.log(err);
     }
    }             
  }, 

  filename: function(req, file, cb) {
    
      var name = file.originalname;
      cb(null, new Date().toISOString() + name.replace(/ +/g, "")); 
  }
});

export const imageFileFilter = (req,file, cb) => {
  // reject a file
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {

      cb(new Error("Send valid Image Type"));
  } else {

     cb(null, true);
  }
};

export const videoFileFilter = (req, file, cb) => {
  // reject a file
  if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) {

    cb(new Error("Send valid Video Type"));

  } else {
    
         cb(null, true);
  }

};
 
