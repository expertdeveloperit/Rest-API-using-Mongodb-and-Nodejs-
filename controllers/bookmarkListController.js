import BookmarkList from '../models/bookmarkListModel';
import Article  from '../models/articleModel';
import Channel  from '../models/channelModel';
import User   from '../models/userModel';


module.exports = {

   /*
     * Handle addBookmarkList (POST) Request 
     * 1.Get the user user_id, article_id, channel_id and check in database.
     * 2.save the new BookmarkList to the database.
   */	
   addBookmarkList(user,req,res,next){

     var user_id  = user._id;
     var article_id  = req.body.article_id;
     var channel_id  = req.body.channel_id;
     var list_name = req.body.list_name ;
     var list_description = req.body.list_description;

   if(article_id && channel_id) {
     Article.findOne({_id:article_id})
            .then( data => {
              if(data){
                Channel.findOne({_id:channel_id})
                  .then( data => {
                     if(data){
                      var bookmark = new BookmarkList({
                          list_name,
                          list_description,
                          user_id,
                          list_bookmarks:[{article_id,channel_id}]
                      });
                    BookmarkList.findOne({'list_bookmarks': {$elemMatch: { "article_id": { $eq : article_id }}}})  
                            .then( data => {
                              if(!data){
                          bookmark.save()
                                  .then( data => {
                                     res.status(201).json({
                                        status:true,
                                        message:"bookmark list is added successfuly",
                                        list:data,
                                        total_articles:data.list_bookmarks.length

                                      });
                                  })
                               
                              } else {
                               res.status(400).json({
                                    status:false,
                                    message:"Already added as Bookmark"
                                });
                              }
                            });
                             
                       } else {
                        res.status(200).json({
                            status:false,
                            message:`No data found with channelId ${channel_id}`
                        });
                       }
                     });
                } else {
                   res.status(200).json({
                     status:false,
                     message:`No data found with articleId ${article_id}`
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
       	 res.status(400).json({
             status:false,
             message:"Empty Request body"
       	 });
       }     
   },

   addBookmark(user,req,res,next){
        var user_id = user._id;
        var list_id = req.body.list_id;
        var article_id = req.body.article_id;
        var channel_id = req.body.channel_id;

        BookmarkList.findOne({'list_bookmarks': {$elemMatch: { "article_id": { $eq : article_id }}}})
                    .then( data => {
                       if(data){
                         return res.status(200).json({
                             status:false,
                             message:"Already in the list"
                         });
                       } else {
                    BookmarkList.findOneAndUpdate({_id:list_id},{$push:{'list_bookmarks':{article_id,channel_id}}},{"new":true})
                    .then( data => {
                      if(data){
                        res.status(200).json({
                            status:true,
                            message:`Bookmark added to the list ${data.list_name}`
                        })

                      } else {
                        res.status(200).json({
                           status:false,
                           message:"No data found"
                        })
                      }

                    });

                       }
                    })
                    .catch( err => {
                      res.status(500).json({
                         status:false,
                         error:err.message
                      })

                    });


       
                    
   },

  /*
     * Handle user Bookmarks (GET) Request 
     * 1.Get the user user_id and authenticate user.
     * 2.Find in Bookmarks Schema and all Bookmarks of that user.
   */

   getUserBookmarksLists(user,req,res,next){

    var user_id = user._id ;

     BookmarkList.find({user_id})
             .then( data => {
             	if(data.length){
             		res.status(200).json({
             			status:true,
             			message:"All Bookmark lists",
             			lists:data
             		})
             	} else {
             		res.status(200).json({
             			 status:false,
             			 message:"No Bookmark list found"
             		 })
             	 }
             })
             .catch( err => {
               res.status(500).json({
                   status:false,
                   error:err.message
               })
           }); 
   },

  /*
     * Handle get Request for single Bookmark
     * 1.Get the user user_id and authenticate user.
     * 2.Find in Bookmarks Schema with id  get from (req.params).
   */

   getSingleBookmark(user,req,res,next){

    var user_id = user._id;
    var bookmark_id = req.params.id;

    BookmarkList.findOne({'list_bookmarks': {$elemMatch: { "_id": { $eq : bookmark_id }}}})
            .then( data => {
              if(data){
                 res.status(200).json({
                     status:true,
                     message:"Bookmark details",
                     bookmark:data.list_bookmarks[0]
                 });
              } else {
                res.status(200).json({
                    status:false,
                    message:`No data found with bookmarkId ${bookmark_id}`
                });
              }
            })
            .catch( err => {
               res.status(500).json({
                   status:false,
                   error:err.message
               })
            });
   },

   deleteSingleBookmark(user,req,res,next){
       
       var user_id = user._id;
       //var article_id = req.body.article_id;
       var bookmark_id = req.params.id;
                               
               BookmarkList.findOneAndUpdate({_id:bookmark_id},{ $pull:{'list_bookmarks':{ $eq:{ "_id": bookmark_id } } } })
                       .then( data => {
                        if(data) {                    
                             res.status(200).json({
                              status:true,
                              message:"Bookmark removed successfuly",                              
                           });   
                  }
                  else {
                      res.status(200).json({
                         status:false,
                         message:`No data found with bookmark_id ${bookmark_id}`
                      })
                  }                   
             })
             .catch( err => {
               res.status(500).json({
                  status:false,
                  error:err.message
               });
             }) ;
      },

     deleteBookmarkList(user,req,res,next){
     
     var user_id = user._id;
     var bookmark_id = req.params.id;

      User.findOneAndUpdate({_id:user_id},{ $pull:{'bookmark_lists':{ $in:[bookmark_id] } } })
          .then(result => {
             if(result){                          
             BookmarkList.findOneAndRemove({_id:bookmark_id, user_id})
                     .then( data => {
                      if(data) {                    
                           res.status(200).json({
                            status:true,
                            message:"list Bookmark is removed successfuly",                              
                         });   
                }
                else {
                    res.status(200).json({
                       status:false,
                       message:`No data found with bookmark_id ${bookmark_id}`
                    })
                }                   
              });
            } else {
              res.status(200).json({
                  status:false,
                  message:`No data found with user_id ${user_id}`
              });
            }
           })
           .catch( err => {
             res.status(500).json({
                status:false,
                error:err.message
             });
           }) ;
    }
 
}