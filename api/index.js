const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/users');

router.use(async (req, res, next) => {
    const auth = req.header('Authorization');
    if (!auth) { // nothing to see here
        next();
    } else {

        try {

            const token = req.header('Authorization').split(' ')[1];
            const verifiedToken = jwt.verify(token, process.env["JWT_SECRET"]);

            const user = await getUserById(verifiedToken.id);

            req.user = user;
            next();

        } catch (error) {

            console.error(error);
            next(error);
        }
    }
})




// GET /api/health
router.get('/health', async (req, res, next) => {
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
router.use('/activities', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
router.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
router.use('/routine_activities', routineActivitiesRouter);

module.exports = router;
