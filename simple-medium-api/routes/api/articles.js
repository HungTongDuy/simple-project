const mongoose = require('mongoose');
const router = require('express').Router();
const articleController = require('./../../controllers/articleController');
const multipart = require('connect-multiparty');
const multipartWare = multipart();

/**
*   POST add an article
*  body:
*  { 
*    "text": "<p>dgdgdgdgdgdgdg</p>",
*    "title": "dfgdgfgdg",
*    "claps": 0,
*    "description": "<p>dgdgdgdgdgdgdg</p>...",
*    "feature_img": "",
*    "__v": 0,
*    "author_id": "5b56d160a96e1f3e90e8f372"
* }
 */
router.post('/', multipartWare, articleController.addArticle);

/**
 * edit article
 */
router.put('/:id', multipartWare, articleController.editArticle);

/**
 * get all articles
 */
router.get('/', articleController.getAll);

/**
 * clap on an article
 */
router.post('/clap', articleController.clapArticle);

/**
*  POST comment on an article
*  body:
*  {	
*     "article_id": "5b56dcea97d92f5ea8ecd969",
*     "author_id": "5b56d160a96e1f3e90e8f372",
*     "comment": "Nice post!"
*  }
*/
router.post('/comment', articleController.commentArticle);

/**
 * get a particlular article to view
 */
router.get('/:id', articleController.getArticle);

/**
 * clap on an article
 */
router.post('/clap_comment', articleController.clapComment);

//router.get('/sequence', articleController.getSequence);

module.exports = router;