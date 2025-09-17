import { BabyState } from "../db/models/babyState.js";
import { MomState } from "../db/models/momState.js";

const LAST_WEEK = 42;
const ONE_DAY = 1000 * 60 * 60 * 24;

export const calcDaysUntilDue = (week, dueDate) => {
    const today = new Date();
    if (dueDate) {
        const due = new Date(dueDate);
        if (!isNaN(due)) {
            const diff = Math.ceil((due - today) / ONE_DAY);
            return diff > 0 ? diff : 0;
        }
    }
    return Math.max(0, (LAST_WEEK - week) * 7);
};

export const getCurrentWeek = (dueDate) => {
    if (!dueDate) return null;

    const due = new Date(dueDate);
    if (isNaN(due)) return null;

    const conceptionDate = new Date(due.getTime() - 280 * ONE_DAY);
    const diffDays = Math.floor((Date.now() - conceptionDate.getTime()) / ONE_DAY);
    const week = Math.floor(diffDays / 7) + 1;

    return week < 1 ? 1 : week > LAST_WEEK ? LAST_WEEK : week;
};

export const getBabyState = async (week) => {
    return await BabyState.findOne({ weekNumber: week });
};

export const getMomState = async (week) => {
    return await MomState.findOne({ weekNumber: week });
};