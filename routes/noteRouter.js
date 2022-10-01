const router = require('express').Router();
const noteController = require('../controllers/noteController');
const requireAuth = require('../middlewares/requireAuth');
const validateId = require('../middlewares/validateId');

router.param('id', validateId);

//require authorizarion for all note routes
router.use(requireAuth);

//create note route
router.post('/', noteController.createNote);

//get all notes route
router.get('/', noteController.fetchAllNotes);

//get a single note route
router.get('/:id', noteController.fetchNoteWithId);

//update a note route
router.put('/:id', noteController.updateNoteWithId);

//delete a note route
router.delete('/:id', noteController.deleteNoteWithId);

module.exports = router;
