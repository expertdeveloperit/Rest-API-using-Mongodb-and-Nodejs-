import express from 'express';
import ensureAuth from '../config/ensure-authenticated';
import bookmarkController from '../controllers/bookmarkListController';


// creating router instance of express router
const router = express.Router();

/* 
  Routes to handle add Post request for Bookmark 
*/

router.route('/addlist')
      .post(
      	 ensureAuth.authenticate,
      	 bookmarkController.addBookmarkList
      	)

/* 
  Routes to handle add Post request for Bookmark 
*/

router.route('/addbookmark')
      .put(
         ensureAuth.authenticate,
         bookmarkController.addBookmark
        )
/* 
  Routes to handle get request for all Bookmarks of user 
*/

router.route('/getlists')
      .get(
      	 ensureAuth.authenticate,
      	 bookmarkController.getUserBookmarksLists
      	)
/* 
  Routes to handle get request for single Bookmark 
*/

router.route('/bookmark/:id')
      .get(
      	  ensureAuth.authenticate,
      	  bookmarkController.getSingleBookmark
      	)
/* 
  Routes to handle delete request to remove list  
*/

router.route('/list/delete/:id')
      .delete(
      	  ensureAuth.authenticate,
      	  bookmarkController.deleteBookmarkList
      	)      

/* 
  Routes to handle delete request to remove Bookmark from list
*/

router.route('/bookmark/delete/:id')
      .delete(
          ensureAuth.authenticate,
          bookmarkController.deleteSingleBookmark
        ) 


module.exports = router ;      