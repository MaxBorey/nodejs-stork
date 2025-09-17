import { calcDaysUntilDue, getCurrentWeek, getBabyState, getMomState } from "../services/weeks.js";

const LAST_WEEK = 42;

export const getPublicWeekInfo = async (req, res) => {
    try {
        const week = 1;
        const daysUntilDue = calcDaysUntilDue(week);

        const baby = await getBabyState(week);

        const momTip = baby.momDailyTips[Math.floor(Math.random() * baby.momDailyTips.length)];

        res.json({
            week,
            daysUntilDue,
            baby: {
                size: baby.babySize,
                weight: baby.babyWeight,
                activity: baby.babyActivity,
                development: baby.babyDevelopment,
                image: baby.image,
            },
            momTip

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPrivateWeekInfo = async (req, res) => {
    try {
        const { dueDate } = req.user;
        const numWeek = getCurrentWeek(dueDate);

        if (!numWeek) {
            return res.status(400).json({
                message: 'Due date is required for week calculation',
            });
        }

        const daysUntilDue = calcDaysUntilDue(numWeek, dueDate);
        const baby = await getBabyState(numWeek);

        const momTip = baby.momDailyTips[Math.floor(Math.random() * baby.momDailyTips.length)];

        res.json({
            week: numWeek,
            daysUntilDue,
            baby: {
                size: baby.babySize,
                weight: baby.babyWeight,
                activity: baby.babyActivity,
                development: baby.babyDevelopment,
                image: baby.image,
            },
            momTip
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBabyDetails = async (req, res) => {
    try {
        const week = Math.min(Math.max(parseInt(req.params.week, 10), 1), LAST_WEEK);

        const baby = await getBabyState(week);

        if (!baby) {
            return res.status(404).json({ message: 'Baby state not found' });
        }

        res.json({
            week,
            analogy: baby.analogy,
            size: baby.babySize,
            weight: baby.babyWeight,
            activity: baby.babyActivity,
            development: baby.babyDevelopment,
            fact: baby.interestingFact,
            momDailyTips: baby.momDailyTips,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMomDetails = async (req, res) => {
    try {
        const week = Math.min(Math.max(parseInt(req.params.week, 10), 1), LAST_WEEK);
        const mom = await getMomState(week);

        if (!mom) {
            return res.status(404).json({ message: 'Mom state not found' });
        }

        res.json({
            week,
            feelings: mom.feelings,
            comfortTips: mom.comfortTips,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};