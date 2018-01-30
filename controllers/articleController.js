import Article from '../models/articleModel';
import Draft   from '../models/draftModel';
import Channel from  '../models/channelModel';
import multer from 'multer';
import { storage,imageFileFilter,videoFileFilter } from '../config/fileUpload';

module.exports = {
  /*
     * Handle creation of new Article process.
     * 1. Save article information in MongoDB
  */
    saveAsDraft(user, req, res, next) {
       
        var created_by = user._id;
        var published_channel = req.body.published_channel;
        var quick_category_title = req.body.quick_category_title;
        var quick_category_icon = req.body.quick_category_icon;
        var content_type = req.body.content_type;        
        var main_title = req.body.main_title;
        var draft_id = req.body.draft_id;
        var draft_title = req.body.draft_title;
        var article_data = req.body.article_data;
        var newdraft = new Draft({
            created_by,
            main_title,
            published_channel,
            quick_category_title,
            quick_category_icon,
            content_type,
            draft_title,
            article_data
        });
  
   if(Object.keys(req.body).length !== 0){
      if(draft_id)
      {
      Draft.findOne({_id:draft_id})
             .then(data => {
              if(data){
                 Draft.findByIdAndUpdate(
                        {_id:draft_id},
                        { 
                          $set: {
                            published_channel,
                            quick_category_title,
                            quick_category_icon, 
                            main_title,
                            content_type,
                            article_data
                            } 
                          }, 
                         { "new": true }
                         )
                       .then( data => {  
                            if(data){            
                                res.status(200).json({
                                    status: true,
                                    message:`${data.draft_title} Override successfully`,
                                    draft: data
                                  });
                              } else {
                                res.status(409).json({
                                    status: false,
                                    message: `No Draft Found with id ${draft_id}`
                                });
                              }
                           });                  
                    } else {
                    res.status(200).json({
                        message:"This is not a valid Id"
                    })
                   }
                })
                .catch(err => {
                    res.status(500).json({
                          status:false,
                          error:err.message
                     });      
                  }); 
                 } else { 
                newdraft.save()
                          .then( data => {                           
                               res.status(201).json({
                                    status: true,
                                    message:`Save a new ${draft_title} successfully`,
                                    draft: data
                                });
                            })                        
                  .catch(err => {
                    res.status(500).json({
                          status:false,
                          error:err.message
                     });      
                  });
             } 
           }else {
               res.status(400).json({
                         status:false,
                         message:"cannot sent empty request"
                    });
         }
    },

  /*
     * Handles save and pusblish request for New Article.
  */
    saveAndPublish(user,req,res,next){

        var published_by = user._id;
        var published_channel = req.body.published_channel;
        var quick_category_title = req.body.quick_category_title;
        var quick_category_icon = req.body.quick_category_icon;
        var content_type = req.body.content_type;        
        var main_title = req.body.main_title;
        var article_id = req.body.article_id;
        var article_data = req.body.article_data;
        var draft_id  = req.body.draft_id;

        var newarticle = new Article({
            published_by,
            main_title,
            published_channel,
            quick_category_title,
            quick_category_icon,
            content_type,
            article_data
        });


   if(Object.keys(req.body).length !== 0){
      if(draft_id){
         Article.findOne({"published_by":user._id,"main_title":main_title})
             .then(data => {
               if(data) {
                res.status(400).json({
                         status:false,
                         message:"cannot sent same main Title"
                    });
               } else {
                newarticle.save()
                          .then( data => {  
                            Draft.findOneAndRemove({_id:draft_id})
                                 .then( result => {
                                  res.status(201).json({
                                    status: true,
                                    message: "Article Created and Published successfully",
                                    article: data
                                });
                             })                                     
                          });
                    }   
                 })
                .catch( err => {
                      res.status(500).json({
                          status:false,
                          error:err.message
                     });  
                });  
         } else {
          Article.findOne({"published_by":user._id,"main_title":main_title})
             .then(data => {
               if(data) {
                res.status(400).json({
                         status:false,
                         message:"cannot sent same main Title"
                    });

               } else {
                newarticle.save()
                          .then( data => {
                            
                                res.status(201).json({
                                    status: true,
                                    message: "Article Created and Published successfully",
                                    article: data
                                });
                            });
                    }
                 
                 })
                .catch( err => {
                      res.status(500).json({
                          status:false,
                          error:err.message
                     });  
                });
           }    
       } else {
           res.status(400).json({
                status:false,
                message:"cannot sent empty request"
            });
         }
    },

  /*
     * Handles put request for update  Article.
  */
    updateArticle(user,req,res,next){

        var article_id = req.params.id;
        var published_channel = req.body.published_channel;
        var quick_category_title = req.body.quick_category_title;
        var quick_category_icon = req.body.quick_category_icon;
        var content_type = req.body.content_type;        
        var main_title = req.body.main_title;
        var article_data = req.body.article_data;
       
        Article.find({"published_by":user._id, "_id":article_id})
               .then(data => {
                if(data.length){

        Article.findByIdAndUpdate(
                  {_id:article_id},
                  { 
                    $set: {
                      published_channel,
                      quick_category_title,
                      quick_category_icon, 
                      main_title,
                      article_data,
                      content_type
                      } 
                    }, 
                   { "new": true}
                   )
               .then( data => {  
                    if(data){            
                        res.status(200).json({
                            status: true,
                            message: "Article updated successfully",
                            New_data: data
                        });
                      }
                      else{
                        res.status(409).json({
                            status: false,
                            message: `No Article Found with id ${article_id}`
                        });
                      }
                  });
                } else {
                     res.status(400).json({
                            status: false,
                            message: `No Article Found with user_id ${user._id} and Article_id ${article_id}`
                    });
                }
            })
            .catch(err => {
              res.status(500).json({
                    status:false,
                    error:err.message
              });

            });   
    },
    
   /*
     * Handles post request for uploading  Article images.
   */

    articleUploadImages(req,res,next){

       var upload = multer({
            storage: storage,
            limits: {
              fileSize: 1024 * 1024 * 5
            },
            fileFilter: imageFileFilter
        }).array('article_images',3);

        upload(req, res, function(err) {
            if (err) {      
               return res.status(400).json({
                   status:false,
                   error:err.message
               });
            }
            if(req.files.length) {   
            console.log(req.files)        
                 res.status(200).json({
                  status:true,
                  message:"Article image uploaded",
                  path:req.files.map((file) => {
                       return file.path
                  })

                });
            }
            else{
              res.status(400).json({
                   status:false,
                   message:"send file fieldname or Choose file"
               });
            }
        });
    },

   /*
     * Handles post request for uploading  Article images.
   */    

     articleUploadVideo(user,req,res,next){

       var upload = multer({
            storage: storage,
             limits: {
              fileSize: 1024 * 1024 * 30
            },
            fileFilter: videoFileFilter
            
        }).single('article_video');

        upload(req, res, function(err) {
            if (err) {
                return res.status(400).json({
                   status:false,
                   error:err.message
               })
            }
            if(req.file) {
                res.status(200).json({
                  status:true,
                  message:"article video uploaded",
                  path:req.file.path 

                });
            }
            else {
              res.status(400).json({
                   status:false,
                   message:"send file fieldname or Choose file"
            
                 });
              }
          });
    },
  /*
     * Handles Get request for getting All drafts.
  */

    getDrafts(user,req,res,next){
      var user_id =  user._id;

      Draft.find({'created_by':user_id})
            .populate({
                path: 'created_by',
                select: 'email _id',
             })
            .populate({
                path: 'published_channel',
                select: 'channelTitle _id',
             })
            .then( data => {
                if(data.length){
                    res.status(200).json({
                      status:true,
                      message:`Drafts data with user-id ${user_id}`,
                      data:data
                    })
                }
                else{
                  res.status(200).json({
                      status:false,
                      message:"No Drafts To Show"
                  });
                }

             })
            .catch(err => {
                res.status(500).json({
                    status:false,
                    error: err.message
                });
            }); 
    },

  /*
     * Handles Get request for getting single draft with id.
  */

     getSingleDraft(user,req,res,next){

      var draft_id = req.params.id;

      Draft.findById({"_id":draft_id})                 
            .populate({
                path: 'created_by',
                select: 'email _id',
             })
            .populate({
                path: 'published_channel',
                select: 'channelTitle _id',
             })
            .then( data => {
                if(data){
                    res.status(200).json({
                      status:true,
                      message:`Draft data with id ${draft_id}`,
                      draft:data
                    })
                }
                else {
                  res.status(200).json({
                      status:false,
                      message:`No Draft Found with id ${draft_id}`
                  });
                }
             })
            .catch(err => {
                res.status(500).json({
                  status:false,
                    error: err.message
                });
            });
    },

  /*
     * Handles Get request for getting single article with article id.
  */
    getSingleArticle(req,res,next){

        var article_id = req.params.id; 

      Article.findById({_id:article_id})
             .populate({
                path: 'comments',
                model: 'comment',
                select: 'comment',
                populate: {
                 path: 'user_id',
                 select:'email',
                 model: 'User'
               }
             })
            .populate({
                path: 'liked_by',
                match: {
                    show_like_publicly: true
                },
                select: 'email _id',
            })
            .populate({
                path: 'published_by',
                select: 'email _id',
             })
            .populate({
                path: 'published_channel',
                select: 'channelTitle _id',
             })
            .then( data => {
                if(data){
                  Channel.findByIdAndUpdate({_id:data.published_channel._id},
                          { $inc :{ 'views':1 }}
                          )
                         .then( doc => {
                          if(doc){
                          res.status(200).json({
                              status:true,
                              message:`Article data with id ${article_id}`,
                              data:data
                            }); 
                            } else {
                                res.status(500).json({
                                    status:false,
                                    message:"No channel Found"
                                });
                            }     
                         });                      
                }
                else{
                  res.status(200).json({
                      status:false,
                      message:`No Article Found with id ${article_id}`
                  });
                }

             })
            .catch(err => {
                res.status(500).json({
                    status:false,
                    error: err.message
                });
            });
    },

  /*
     * Handles Get request for getting all Articles Count.
  */
    getArticlesCount(req, res, next) {
        Article.find({})
               .where('published').equals('true')  
               .then(docs => {
                
                if (docs.length) {
                    res.status(200).json({
                        status: true,
                        message: "Total published Articles",
                        Articles: docs.length
                    });
                } else {

                    res.status(400).json({
                        status: false,
                        message: "No Article is Published Yet"
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    status:false,
                    error: err.message
                });
            });
    },
  
  /*
     * Handles Get request for getting Articles.
     * Filtered By Content-Type (video,lists,image) 
  */

    getArticlesContentType(req, res, next) {

        var content_type = req.params.type;
        var page_req = req.params.page;
        var total_count;

        Article.count({
                content_type
            })
            .then((number) => {

                if (number) {
                    total_count = number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if (page_req > max_page || page_req < 1) {

                        return res.status(400).json({
                            status: false,
                            message: "No Data Found For your Request",
                            max_page: max_page
                        });
                    } else {
                        var page = Math.max(1, page_req);
                        var temppage = page - 1;
                        Article.find({
                                content_type
                                 })
                               .populate({
                                path: 'comments',
                                model: 'comment',
                                select: 'comment',
                                populate: {
                                 path: 'user_id',
                                 select:'email',
                                 model: 'User'
                               }
                             })
                            .populate({
                                path: 'liked_by',
                                match: {
                                    show_like_publicly: true
                                },
                                select: 'email _id',
                            })
                            .populate({
                                path: 'published_by',
                                select: 'email _id',
                            })
                            .limit(perPage)
                            .skip(perPage * temppage)
                            .then(docs => {
                                if (docs.length) {

                                    res.status(200).json({
                                        message: `Articles list by ${content_type}`,
                                        total_articles: docs.length,
                                        content: docs
                                    });
                                } else {
                                    res.status(400).json({
                                        status: false,
                                        message: "There are no results matching your query."
                                    });
                                }
                            })
                    }
                } else {
                    res.status(400).json({
                        status: false,
                        message: `No Data Found with type ${content_type}`
                    });
                }
            })
            .catch(err => {
                  res.status(500).json({
                        status:false,
                        error:err.message
                   });      
                });
    }

   

}