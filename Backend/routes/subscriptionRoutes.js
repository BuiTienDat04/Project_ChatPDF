
const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const { ensureAuthenticated } = require('../middlewares/auth');


router.get('/me', ensureAuthenticated, async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
             return res.status(401).json({ message: 'User not authenticated.' });
        }

        const subscriptions = await Subscription.find({ user: req.user._id })
                                                .sort({ startDate: -1 })
                                                .select('-__v');

        res.status(200).json(subscriptions);
    } catch (error) {
        console.error('Error fetching subscription history:', error);
        res.status(500).json({ message: 'Server error loading subscription history' });
    }
});


router.get('/users-with-subscription-status', ensureAuthenticated, async (req, res) => {
    try {
        const users = await User.find({}).select('-password -__v');

        const usersWithStatus = [];

        for (const user of users) {
            const activeSubscriptions = await Subscription.find({
                user: user._id,
                status: 'active',
                endDate: { $gt: new Date() }
            }).sort({ endDate: -1 });

            let currentSubscription = null;
            if (activeSubscriptions.length > 0) {
                const latestSub = activeSubscriptions[0];

                currentSubscription = {
                    _id: latestSub._id,
                    packageName: latestSub.packageName,
                    durationMonths: latestSub.durationMonths,
                    startDate: latestSub.startDate,
                    endDate: latestSub.endDate,
                    price: latestSub.price,
                    status: latestSub.status
                };
            }

            usersWithStatus.push({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                picture: user.picture,
                statusOnline: user.statusOnline,
                currentSubscription: currentSubscription
            });
        }

        res.status(200).json(usersWithStatus);

    } catch (error) {
        console.error('Error fetching users with subscription status:', error);
        res.status(500).json({ message: 'Server error loading users with subscription status' });
    }
});


router.get('/:userId/subscriptions', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.params.userId;

        const subscriptions = await Subscription.find({ user: userId })
                                                 .sort({ startDate: -1 })
                                                 .select('-__v');

        res.status(200).json(subscriptions);

    } catch (error) {
        console.error('Error fetching subscription history for user:', req.params.userId, error);
        res.status(500).json({ message: 'Server error loading user subscription history.' });
    }
});


module.exports = router;