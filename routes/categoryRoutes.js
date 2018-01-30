import express   from 'express';
import categoryController  from '../controllers/categoryController';

// Creating router instance of express router 
      const router = express.Router();


//Category ShowCase Routes 


/*  
 * Route to get all Categories 
*/ 
   router.route('/categories')
         .get(
            categoryController.getCategories
            )

/*  
 * Route to get all articles with category type
*/ 

   router.route('/categories/:category_title/:page([0-9]+)')
         .get(
         	categoryController.getArticlesCategoryType  
         	)

/*  
 * Route to get all articles with category type and content type 
*/ 

   router.route('/categories/:category_title/:content_type/:page([0-9]+)')
         .get(
         	categoryController.sortArticleCategoryContentType  
         	)

/*  
 * Route to get all articles with category type and content type and sort type
*/  

   router.route('/categories/:category_title/:content_type/:sort_type/:page([0-9]+)')
         .get(
         	categoryController.sortFilterCategoryContentType  
         	)




module.exports = router;