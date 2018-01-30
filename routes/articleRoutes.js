import express from 'express';
import articleController from '../controllers/articleController';
import articleSort from '../controllers/articleSortController';
import articleSort_Filter from '../controllers/articleFilterContentTypeController';
import category_filter from '../controllers/categoryController';
import userProfileController from "../controllers/userProfileController";
import ensureAuth from '../config/ensure-authenticated';
import videoArticleController from '../controllers/videoArticleController'

// Creating router instance of express router 
const router = express.Router();

/* 
   Creating Routes for Article Api
*/


/* 
  * Route to add  new  article
  * Route to get all articles count 
 */
router.route('/articles/draft')
      .post(
          ensureAuth.authenticate,
          articleController.saveAsDraft
      )

router.route('/articles')
      .get(
          articleController.getArticlesCount
      )

 /* 
   * Route to Save and publish article 
 */
router.route('/articles/publish')
      .post(
          ensureAuth.authenticate,
          articleController.saveAndPublish
      )  
 /* 
   * Route to update  single  article
   * Route to get a single article
 */

router.route('/article/:id')
      .put(
          ensureAuth.authenticate,
          articleController.updateArticle
        ) 
      .get(
          articleController.getSingleArticle
       ) 

 /* 
   * Route to get all drafts user craeted 
 */
 router.route('/drafts')
       .get(
          ensureAuth.authenticate,
          articleController.getDrafts
        ) 
 /* 
   * Route to get a single draft user craeted 
 */ 
 router.route('/draft/:id')
       .get(
          ensureAuth.authenticate,
          articleController.getSingleDraft
        )   

 /* 
  * Route to upload  image of article
 */

router.route("/article/upload/images")
      .post(
          // ensureAuth.authenticate,
          articleController.articleUploadImages
        )

 /* 
   * Route to upload  video of article
 */

router.route("/article/upload/videos")
      .post(
          ensureAuth.authenticate,
          articleController.articleUploadVideo
        ) 

/*
  Route to search article on youTube and vimeo
*/
router.route('/articlevideo/search')
   .post(
       ensureAuth.authenticate,
       videoArticleController.searchVideo) 

 /* 
   Route to add comments on article
 */
router.route('/comment')
    .get(
        ensureAuth.authenticate,
        userProfileController.getComments)
    .post(
        ensureAuth.authenticate,
        userProfileController.addComments
    )  

// Route to get all articles according to content type or sort type 

router.get('/articles/:type/:page([0-9]+)', function(req, res, next) {

    if (req.params.type === "likes" || req.params.type === "trending" ||
        req.params.type === "latest" || req.params.type === "both") {
        articleSort.sortArticleList(req, res, next)
    } else if (req.params.type === "video" || req.params.type === "image" || req.params.type === "lists") {
        articleController.getArticlesContentType(req, res, next)
    } else {
        res.status(400).json({
            status: false,
            message: `No Data Found For ${req.params.type}`
        });
    }
});

/* 
 * Route to get all artucles
 * According to Content type and Category type 
 * And sorted according to sort-type 
 */
router.get('/articles/:sort_type/:filter_type/:page([0-9]+)', function(req, res, next) {

    if (req.params.filter_type === "video" || req.params.filter_type === "image" ||
        req.params.filter_type === "lists" || req.params.filter_type === "both") {
        articleSort_Filter.sortArticleListType(req, res, next)
    } else {

        category_filter.sortArticleCategoryType(req, res, next)
    }

});

module.exports = router;