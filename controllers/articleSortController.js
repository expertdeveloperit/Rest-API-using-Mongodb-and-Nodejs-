import Article from '../models/articleModel';

module.exports = {
  /*
     * Handle Get Request for Articles.
     * get Artciles with sort type ( likes, trending, latest, both(likes&trending)) 
  */
    sortArticleList(req, res, next) {

        var type = req.params.type;
        var page_req = req.params.page;
        var total_count;

        if (type === "likes") {

            Article.count({})
                .then((number) => {
                    if (number) {
                        total_count = number;
                        var perPage = 10;
                        var max_page = Math.ceil(total_count / perPage);

                        if (page_req > max_page || page_req < 1) {

                            return res.status(400).json({
                                status: false,
                                message: "Plase send the valid page number",
                                max_page: max_page
                            });
                        } else {
                            var page = Math.max(1, page_req);
                            var temppage = page - 1;
                            Article.find({})
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
                                                    message: "contents list by likes",
                                                    total_articles: total_count,
                                                    total_page: max_page,
                                                    content: docs
                                                });
                                            });
                                    } else {
                                        res.status(200).json({
                                            message: "No article Found"
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
                        res.status(200).json({
                            status: false,
                            message: `No Data Found with type ${type}`
                        });
                    }
                })
                .catch( err => {
                 res.status(500).json({
                    status:false,
                    error:err.message
                 });
            });

        } else if (type === "trending") {

            Article.count({})
                .then((number) => {
                    if (number) {
                        total_count = number;
                        var perPage = 10;
                        var max_page = Math.ceil(total_count / perPage);

                        if (page_req > max_page || page_req < 1) {

                            return res.status(400).json({
                                status: false,
                                message: "Plase send the valid page number",
                                max_page: max_page
                            });
                        } else {
                            var page = Math.max(1, page_req);
                            var temppage = page - 1;
                            Article.find({})
                                .limit(perPage)
                                .skip(perPage * temppage)
                                .sort({
                                    "trend_graph": -1
                                })
                                .then(docs => {
                                    if (docs.length) {
                                        Article.count({})
                                            .then(number => {
                                                res.status(200).json({
                                                    message: "contents list by Trending",
                                                    total_articles: total_count,
                                                    total_page: max_page,
                                                    content: docs
                                                });
                                            });
                                    } else {
                                        res.status(200).json({
                                            message: "No article Found"
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
                        res.status(200).json({
                            status: false,
                            message: `No Data Found with type ${type}`
                        });
                    }
                })
                .catch( err => {
                 res.status(500).json({
                    status:false,
                    error:err.message
                 });
            });
        } else if (type === "latest") {

            Article.count({})
                .then((number) => {
                    if (number) {
                        total_count = number;
                        var perPage = 10;
                        var max_page = Math.ceil(total_count / perPage);

                        if (page_req > max_page || page_req < 1) {

                            return res.status(400).json({
                                status: false,
                                message: "Plase send the valid page number",
                                max_page: max_page
                            });
                        } else {
                            var page = Math.max(1, page_req);
                            var temppage = page - 1;
                            Article.find({})
                                .limit(perPage)
                                .skip(perPage * temppage)
                                .sort({
                                    "_id": -1
                                })
                                .then(docs => {
                                    if (docs.length) {
                                        Article.count({})
                                            .then(number => {
                                                res.status(200).json({
                                                    message: "contents list by published time",
                                                    total_articles: total_count,
                                                    total_page: max_page,
                                                    content: docs
                                                });
                                            });
                                    } else {
                                        res.status(200).json({
                                            message: "No article Found"
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
                        res.status(200).json({
                            status: false,
                            message: `No Data Found with type ${type}`
                        });
                    }
                })
                .catch( err => {
                 res.status(500).json({
                    status:false,
                    error:err.message
                 });
            });
        } else if (type === "both") {

            Article.count({})
                .then((number) => {
                    if (number) {
                        total_count = number;
                        var perPage = 10;
                        var max_page = Math.ceil(total_count / perPage);

                        if (page_req > max_page || page_req < 1) {

                            return res.status(400).json({
                                status: false,
                                message: "Plase send the valid page number",
                                max_page: max_page
                            });
                        } else {
                            var page = Math.max(1, page_req);
                            var temppage = page - 1;
                            Article.find({})
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
                                                    message: `contents list by trend_graph and likes`,
                                                    total_articles: total_count,
                                                    total_page: max_page,
                                                    content: docs
                                                });
                                            });
                                    } else {
                                        res.status(200).json({
                                            message: "No article Found"
                                        });
                                    }
                                });
                        }
                    } else {
                        res.status(200).json({
                            status: false,
                            message: `No Data Found with type ${type}`
                        });
                    }
                });
        } else {
            res.status(400).json({
                status: false,
                message: "Please send a valid Sorting Type",
                sort_values: "likes trending latest etc"
            })
        }
    }

}