import { DiarieNotesCollection } from "../db/models/diaries.js";

export const createDiaryNote = async (payload) => {
    const { title, description, date, userId, emotions } = payload;

    const diaryNote = await DiarieNotesCollection.create({
        title,
        description,
        date,
        userId,
        emotions
    });

     const populatedDiaryNote = await diaryNote.populate("emotions", "title");

    return populatedDiaryNote;
};
