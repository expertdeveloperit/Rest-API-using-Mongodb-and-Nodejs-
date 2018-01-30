import Category from '../models/categoryModel';
import Article  from '../models/articleModel';

module.exports = {

    /*
     * Handle get request for all categories.
  */

    getCategories(req, res, next) {
        Category.find({})
            .then(data => {
                res.json({
                    status: true,
                    message: "All categories",
                    categories: data
                });
            })
            .catch( err => {
                res.status(500).json({
                    status:false,
                    error:err.message
                });
            });
    },

    /*
     * Handle get request  single category data
     * 1. On the basis of category type 
  */
 
    getArticlesCategoryType(req, res, next) {

        var quick_category_title = req.params.category_title;
        var page_req = req.params.page;
        var total_count;

        Article.count({
                quick_category_title
            })
            .then((number) => {

                if (number) {
                    total_count = number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if (page_req > max_page || page_req < 1) {

                        return res.status(404).json({
                            status: false,
                            message: "Please send the valid page number",
                            max_page:max_page 
                        });
                    } else {
                        var page = Math.max(1, page_req);
                        var temppage = page - 1;
                        Article.find({
                                quick_category_title
                            })
                            .limit(perPage)
                            .skip(perPage * temppage)
                            .then(docs => {
                                if (docs.length) {
                                    res.status(200).json({
                                        status: true,
                                        message: `Articles list of Category ${quick_category_title}`,
                                        total_articles: docs.length,
                                        content: docs
                                    });
                                } else {
                                    res.status(404).json({
                                        status: false,
                                        message: `There are no results matching your Category title ${quick_category_title}`
                                    });
                                }
                            });                          
                    }
                } else {
                    res.status(404).json({
                        status: false,
                        message: `No Data Found with Category Title ${quick_category_title}`
                    });
                }
            })
            .catch( err => {
                res.status(500).json({
                    status:false,
                    error:err.message
                });
            });
    },

    /*
     * Handle get request for category data 
     * 1. On the basis of category type and sort type
  */

    sortArticleCategoryType(req, res, next) {

        var sort_type = req.params.sort_type
        var quick_category_title = req.params.filter_type;
        var page_req = req.params.page;
        var total_count;

        switch (sort_type) {
            case "likes":
                Article.count({
                        quick_category_title
                    })
                    .then(number => {
                        if (number) {
                            total_count = number;
                            var perPage = 10;
                            var max_page = Math.ceil(total_count / perPage);

                            if (page_req > max_page || page_req < 1) {
                                return res.status(404).json({
                                    status: false,
                                    message: "Please send the valid page number",
                                    max_page:max_page 
                                });
                            } else {
                                var page = Math.max(1, page_req);
                                var temppage = page - 1;
                                Article.find({
                                        quick_category_title
                                    })
                                    .limit(perPage)
                                    .skip(perPage * temppage)
                                    .sort({
                                        "likes": -1
                                    })
                                    .then(docs => {
                                        if (docs.length) {
                                            Article.count({})
                                                .then(number => {
                                                    res.status(200).json({
                                                        status: true,
                                                        message: `contents list by likes and ${quick_category_title}`,
                                                        total_articles: total_count,
                                                        total_page: max_page,
                                                        content: docs
                                                    });
                                                });
                                        }
                                    })                                   
                            }
                        } else {
                            res.status(404).json({
                                status: false,
                                message: `There are no results matching your Category title ${quick_category_title}`
                            });
                        }
                    })
                    .catch( err => {
                        res.status(500).json({
                            status:false,
                            error:err.message
                        });
                    });
              break;

            case "trending":
                Article.count({
                        quick_category_title
                    })
                    .then(number => {
                        if (number) {
                            total_count = number;
                            var perPage = 10;
                            var max_page = Math.ceil(total_count / perPage);

                            if (page_req > max_page || page_req < 1) {
                                return res.status(404).json({
                                    status: false,
                                    message: "Please send the valid page number",
                                    max_page:max_page 
                                });
                            } else {
                                var page = Math.max(1, page_req);
                                var temppage = page - 1;
                                Article.find({
                                        quick_category_title
                                    })
                                    .limit(perPage)
                                    .skip(perPage * temppage)
                                    .sort({
                                        "likes": -1
                                    })
                                    .then(docs => {
                                        if (docs.length) {
                                            Article.count({})
                                                .then(number => {
                                                    res.status(200).json({
                                                        status: true,
                                                        message: `contents list by likes and ${quick_category_title}`,
                                                        total_articles: total_count,
                                                        total_page: max_page,
                                                        content: docs
                                                    });
                                                });
                                        }
                                    })                                
                            }
                        } else {
                            res.status(404).json({
                                status: false,
                                message: `There are no results matching your Category title ${quick_category_title}`
                            });
                        }
                    })
                    .catch( err => {
                    res.status(500).json({
                        status:false,
                        error:err.message
                    });
                });
                break;

            case "latest":
                Article.count({
                        quick_category_title
                    })
                    .then(number => {
                        if (number) {
                            total_count = number;
                            var perPage = 10;
                            var max_page = Math.ceil(total_count / perPage);

                            if (page_req > max_page || page_req < 1) {
                                return res.status(404).json({
                                    status: false,
                                    message: "Please send the valid page number",
                                    max_page:max_page 
                                });
                            } else {
                                var page = Math.max(1, page_req);
                                var temppage = page - 1;
                                Article.find({
                                        quick_category_title
                                    })
                                    .limit(perPage)
                                    .skip(perPage * temppage)
                                    .sort({
                                        "likes": -1
                                    })
                                    .then(docs => {
                                        if (docs.length) {
                                            Article.count({})
                                                .then(number => {
                                                    res.status(200).json({
                                                        status: true,
                                                        message: `contents list by likes and ${quick_category_title}`,
                                                        total_articles: total_count,
                                                        total_page: max_page,
                                                        content: docs
                                                    });
                                                });
                                        }
                                    })                                
                            }
                        } else {
                            res.status(404).json({
                                status: false,
                                message: `There are no results matching your Category title ${quick_category_title}`
                            });
                        }
                    })
                    .catch( err => {
                        res.status(500).json({
                            status:false,
                            error:err.message
                        });
                    });
                break;
            case "both":
                Article.count({
                        quick_category_title
                    })
                    .then(number => {
                        if (number) {
                            total_count = number;
                            var perPage = 10;
                            var max_page = Math.ceil(total_count / perPage);

                            if (page_req > max_page || page_req < 1) {
                                return res.status(404).json({
                                    status: false,
                                    message: "Please send the valid page number",
                                    max_page:max_page 
                                });
                            } else {
                                var page = Math.max(1, page_req);
                                var temppage = page - 1;
                                Article.find({
                                        quick_category_title
                                    })
                                    .limit(perPage)
                                    .skip(perPage * temppage)
                                    .sort({
                                        "trend_graph": -1,
                                        "likes": -1
                                    })
                                    .then(docs => {
                                        if (docs.length) {
                                            Article.count({})
                                                .then(number => {
                                                    res.status(200).json({
                                                        status: true,
                                                        message: `contents list by likes and trending and ${quick_category_title}`,
                                                        total_articles: total_count,
                                                        total_page: max_page,
                                                        content: docs
                                                    });
                                                });
                                        }
                                    })                                  
                            }
                        } else {
                            res.status(404).json({
                                status: false,
                                message: `There are no results matching your Category title ${quick_category_title}`
                            });
                        }
                    })
                    .catch( err => {
                        res.status(500).json({
                            status:false,
                            error:err.message
                        });
                   });
                break;

            default:
                res.status(404).json({
                    status: false,
                    message: `No Data Found with sort type ${sort_type}`
                });

        }
    },



    /*
     * Handle get request for category data
     * 1. On the basis of category type and content-type
  */

    sortArticleCategoryContentType(req, res, next) {

        var quick_category_title = req.params.category_title;
        var content_type = req.params.content_type;
        var page_req = req.params.page;
        var total_count;

        Article.count({
                quick_category_title,
                content_type
            })
            .then((number) => {

                if (number) {
                    total_count = number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if (page_req > max_page || page_req < 1) {

                        return res.status(404).json({
                            status: false,
                            message: "Please send the valid page number",
                            max_page:max_page 
                        });
                    } else {
                        var page = Math.max(1, page_req);
                        var temppage = page - 1;
                        Article.find({
                                quick_category_title,
                                content_type
                            })
                            .limit(perPage)
                            .skip(perPage * temppage)
                            .then(docs => {
                                if (docs.length) {
                                    res.status(200).json({
                                        status: true,
                                        message: `Articles list of ${quick_category_title} and ${content_type}`,
                                        total_articles: docs.length,
                                        content: docs
                                    });
                                } else {
                                    res.status(404).json({
                                        status: false,
                                        message: `There are no results matching your Category title ${quick_category_title} and ${content_type}`
                                    });
                                }
                            })                        
                    }
                } else {
                    res.status(404).json({
                        status: false,
                        message: `No Data Found with Category Title ${quick_category_title} and ${content_type}`
                    });
                }
            })
            .catch( err => {
                res.status(500).json({
                    status:false,
                    error:err.message
                });
            });
    },


    /*
     * Handle get request for category data
     * 1. On the basis of category type  and sort type and content-type
  */

    sortFilterCategoryContentType(req,res,next){
      
      var quick_category_title = req.params.category_title;
      var content_type = req.params.content_type;
      var sort_type  = req.params.sort_type;
      var page_req = req.params.page;
      var total_count;
      
      switch(sort_type){

      	case "likes":
      	    Article.count({
                quick_category_title,
                content_type
            })
            .then((number) => {
                if (number) {
                    total_count = number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if (page_req > max_page || page_req < 1) {

                        return res.status(404).json({
                            status: false,
                            message: "Please send the valid page number",
                            max_page:max_page 
                        });
                    } else {
                        var page = Math.max(1, page_req);
                        var temppage = page - 1;
                        Article.find({
                                quick_category_title,
                                content_type
                            })
                            .limit(perPage)
                            .skip(perPage * temppage)
                            .sort({"likes":-1})
                            .then(docs => {
                                if (docs.length) {
                                    res.status(200).json({
                                        status: true,
                                        message: `Articles list of ${quick_category_title} and ${content_type} and sorted by ${sort_type}`,
                                        total_articles: docs.length,
                                        content: docs
                                    });
                                } else {
                                    res.status(404).json({
                                        status: false,
                                        message: `There are no results matching your Category title ${quick_category_title} and ${content_type} and sorted by ${sort_type}`
                                    });
                                }
                            })                  
                    }
                } else {
                    res.status(404).json({
                        status: false,
                        message: `No Data Found with Category Title ${quick_category_title} and ${content_type}`
                    });
                }
            })
            .catch( err => {
                res.status(500).json({
                    status:false,
                    error:err.message
                });
            });
      	 break;
      	case  "trending":
      	     Article.count({
                quick_category_title,
                content_type
             })
            .then((number) => {

                if (number) {
                    total_count = number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if (page_req > max_page || page_req < 1) {

                        return res.status(404).json({
                            status: false,
                            message: "Please send the valid page number",
                            max_page:max_page 
                        });
                    } else {
                        var page = Math.max(1, page_req);
                        var temppage = page - 1;
                        Article.find({
                                quick_category_title,
                                content_type
                            })
                            .limit(perPage)
                            .skip(perPage * temppage)
                            .sort({"trend_graph":-1})
                            .then(docs => {
                                if (docs.length) {
                                    res.status(200).json({
                                        status: true,
                                        message: `Articles list of ${quick_category_title} and ${content_type} and sorted by ${sort_type}`,
                                        total_articles: docs.length,
                                        content: docs
                                    });
                                } else {
                                    res.status(404).json({
                                        status: false,
                                        message: `There are no results matching your Category title ${quick_category_title} and ${content_type} and sorted by ${sort_type}`
                                    });
                                }
                            })                      
                    }
                } else {
                    res.status(404).json({
                        status: false,
                        message: `No Data Found with Category Title ${quick_category_title} and ${content_type}`
                    });
                }
            })
            .catch( err => {
                res.status(500).json({
                    status:false,
                    error:err.message
                });
            });
      	 break; 
      	case  "latest":
      	      Article.count({
                quick_category_title,
                content_type
            })
            .then((number) => {

                if (number) {
                    total_count = number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if (page_req > max_page || page_req < 1) {

                        return res.status(404).json({
                            status: false,
                            message: "Please send the valid page number",
                            max_page:max_page 
                        });
                    } else {
                        var page = Math.max(1, page_req);
                        var temppage = page - 1;
                        Article.find({
                                quick_category_title,
                                content_type
                            })
                            .limit(perPage)
                            .skip(perPage * temppage)
                            .sort({"_id":-1})
                            .then(docs => {
                                if (docs.length) {
                                    res.status(200).json({
                                        status: true,
                                        message: `Articles list of ${quick_category_title} and ${content_type} and sorted by ${sort_type}`,
                                        total_articles: docs.length,
                                        content: docs
                                    });
                                } else {
                                    res.status(404).json({
                                        status: false,
                                        message: `There are no results matching your Category title ${quick_category_title} and ${content_type} and sorted by ${sort_type}`
                                    });
                                }
                            })                  
                    }
                } else {
                    res.status(404).json({
                        status: false,
                        message: `No Data Found with Category Title ${quick_category_title} and ${content_type}`
                    });
                }
            })
            .catch( err => {
                res.status(500).json({
                    status:false,
                    error:err.message
                });
            });

      	 break;

      	case "both":
      	     Article.count({
                quick_category_title,
                content_type
            })
            .then((number) => {

                if (number) {
                    total_count = number;
                    var perPage = 10;
                    var max_page = Math.ceil(total_count / perPage);

                    if (page_req > max_page || page_req < 1) {

                        return res.status(404).json({
                            status: false,
                            message: "Please send the valid page number",
                            max_page:max_page 
                        });
                    } else {
                        var page = Math.max(1, page_req);
                        var temppage = page - 1;
                        Article.find({
                                quick_category_title,
                                content_type
                            })
                            .limit(perPage)
                            .skip(perPage * temppage)
                            .sort({"trend_graph":-1, "likes":-1})
                            .then(docs => {
                                if (docs.length) {
                                    res.status(200).json({
                                        status: true,
                                        message: `Articles list of ${quick_category_title} and ${content_type} and sorted by ${sort_type}`,
                                        total_articles: docs.length,
                                        content: docs
                                    });
                                } else {
                                    res.status(404).json({
                                        status: false,
                                        message: `There are no results matching your Category title ${quick_category_title} and ${content_type} and sorted by ${sort_type}`
                                    });
                                }
                            })                        
                    }
                } else {
                    res.status(404).json({
                        status: false,
                        message: `No Data Found with Category Title ${quick_category_title} and ${content_type}`
                    });
                }
            })
            .catch( err => {
                res.status(500).json({
                    status:false,
                    error:err.message
                });
            });
      	 break ;
      	default:
      	  res.status(404).json({
              status:false,
              message:`No Data found of Sort Type ${sort_type}`
          });    
      }

    }

}