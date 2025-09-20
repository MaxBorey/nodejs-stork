import { DiarieEntriesCollection, EmotionCollection } from '../db/models/diaries.js';

export const createDiaryEntry = async (payload) => {
  const { title, description, date, userId, emotions } = payload;

  const diaryEntry = await DiarieEntriesCollection.create({
    title,
    description,
    date,
    userId,
    emotions,
  });

  const populatedDiaryEntry = await diaryEntry.populate('emotions', 'title');

  return populatedDiaryEntry;
};

export const getDiaryEntries = async (userId) => {
  const populatedDiaryEntries = await DiarieEntriesCollection.find({
    userId,
  }).populate('emotions', 'title');

  return populatedDiaryEntries;
};

export const updateDiaryEntry = async ({ userId, payload, entryId }) => {
  const populatedDiaryEntry = await DiarieEntriesCollection.findOneAndUpdate(
    { userId, _id: entryId },
    payload,
    { new: true },
  ).populate('emotions', 'title');

  return populatedDiaryEntry;
};

export const deleteDiaryEntry = async ({entryId, userId}) => {
    const diaryEntry = await DiarieEntriesCollection.findByIdAndDelete({
        _id: entryId, userId
    });

    return diaryEntry;
};

export const getEmotions = async () => {
    const emotions = await EmotionCollection.find({}, "title");

  return emotions;
};
