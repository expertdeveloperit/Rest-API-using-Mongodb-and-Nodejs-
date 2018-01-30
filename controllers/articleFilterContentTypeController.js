import Article from '../models/articleModel';

module.exports = {

	sortArticleListType(req,res,next){

    var sort_type  = req.params.sort_type
    var content_type = req.params.filter_type;
    var page_req = req.params.page;
    var total_count;

    switch(sort_type){
      case "likes": 
          if(content_type == "video") {

          Article.count({content_type})
                 .then(number => { 
                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"likes":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by likes and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                              .catch( err => {
                                   res.status(500).json({
                                    status:false,
                                    error:err.message
                                   });
                                });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          
          else if(content_type == "image") {

             Article.count({content_type})
                 .then(number => { 

                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"likes":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by likes and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                               .catch( err => {
                                 res.status(500).json({
                                  status:false,
                                  error:err.message
                                 });
                              });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          else if(content_type == "lists") {
         Article.count({content_type})
                 .then(number => { 

                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"likes":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by likes and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                              .catch( err => {
                               res.status(500).json({
                                status:false,
                                error:err.message
                               });
                            });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                             });
                           }   
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
          break;
      case "trending": 
          if(content_type == "video") {
           Article.count({content_type})
                 .then(number => { 

                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"trend_graph":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by trending and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                              .catch( err => {
                               res.status(500).json({
                                status:false,
                                error:err.message
                               });
                            });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          else if(content_type == "image") {
            Article.count({content_type})
                 .then(number => { 

                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page 
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"trend_graph":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by trending and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                               .catch( err => {
                                 res.status(500).json({
                                  status:false,
                                  error:err.message
                                 });
                              });    
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          else if(content_type == "lists") {
           Article.count({content_type})
                 .then(number => { 
 
                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page 
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"trend_graph":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by trending and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                               .catch( err => {
                                 res.status(500).json({
                                  status:false,
                                  error:err.message
                                 });
                              });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          break;
      case "latest" : 
          if(content_type == "video") {
           Article.count({content_type})
                 .then(number => { 

                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"_id":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by Latest and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                              .catch( err => {
                               res.status(500).json({
                                status:false,
                                error:err.message
                               });
                            });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          else if(content_type == "image") {
           Article.count({content_type})
                 .then(number => { 

                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page 
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"_id":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by Latest and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                              .catch( err => {
                               res.status(500).json({
                                status:false,
                                error:err.message
                               });
                            });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          else if(content_type == "lists") {
          Article.count({content_type})
                 .then(number => { 

                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page 
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"_id":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by Latest and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                              .catch( err => {
                               res.status(500).json({
                                status:false,
                                error:err.message
                               });
                            });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          break;
      case "both" : 
          if(content_type == "video") {
           Article.count({content_type})
                 .then(number => { 

                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page 
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"trend_graph":-1,"likes":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by likes & Trending and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                             .catch( err => {
                             res.status(500).json({
                              status:false,
                              error:err.message
                             });
                          });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          else if(content_type == "image") {
          Article.count({content_type})
                 .then(number => { 

                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page 
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"trend_graph":-1,"likes":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents likes & Trending and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                               .catch( err => {
                               res.status(500).json({
                                status:false,
                                error:err.message
                               });
                            });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          else if(content_type == "lists") {
           Article.count({content_type})
                 .then(number => { 

                    total_count=number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if(page_req > max_page || page_req < 1 ) {
                        return res.status(400).json({
                          status:false,
                          message:"Please send the valid page number",
                          max_page:max_page 
                        });
                     }
                    else {
                        var page = Math.max(1, page_req);
                        var temppage = page-1;
                      Article.find({content_type})
                        .limit(perPage)
                        .skip(perPage * temppage)
                        .sort({"trend_graph":-1,"likes":-1})
                        .then(docs => {
                          if (docs.length) {
                            Article.count({})
                                   .then(number => {
                                      res.status(200).json({
                                        status:true,
                                        message:`contents list by likes & Trending and ${content_type}`, 
                                        total_articles:total_count,
                                        total_page: max_page, 
                                        content:docs
                                    });
                               })
                               .catch( err => {
                                 res.status(500).json({
                                  status:false,
                                  error:err.message
                                 });
                              });
                          } 
                         else {
                              res.status(400).json({
                                status:false,
                                message:"There are no results matching your query."
                              });
                           }   
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
          break;
        default:
          res.status(400).json({
              status:false,
              message:`No Data found of Sort Type ${sort_type}`
          });
      }
  }

}