import { createDiaryEntry, deleteDiaryEntry, getEmotions, updateDiaryEntry } from "../services/diaries.js";
import { getDiaryEntries } from "../services/diaries.js";
import createHttpError from 'http-errors';

export const createDiaryEntryController = async (req, res) => {
    const data = req.body;
    const diaryEntry = await createDiaryEntry({ ...data, userId: req.user._id });

    res.status(201).json({
    status: 201,
    message: 'Successfully created an Entry!',
    data: diaryEntry,
  });
};

export const getDiaryEntriesController = async (req, res) => {
    const userId = req.user._id;
    const diaryEntries = await getDiaryEntries(userId);

    res.status(200).json({
    status: 200,
    message: 'Successfully fetched diary entries!',
    data: diaryEntries,
  });
};

export const updateDiaryEntryController = async (req, res) => {
    const {entryId} = req.params;
    const diaryEntry = await updateDiaryEntry({entryId, payload: req.body, userId: req.user._id,});

    if (!diaryEntry) {
    throw createHttpError(404, 'Entry not found');
  }

    res.status(200).json({
    status: 200,
    message: 'Successfully patched diary entry!',
    data: diaryEntry,
  });
};

export const deleteDiaryEntryController = async (req, res, next) => {
    const {entryId} = req.params;
    const diaryEntry = await deleteDiaryEntry({entryId, userId: req.user._id,});

    if (!diaryEntry) {
    throw createHttpError(404, 'Entry not found');
  }

    res.status(204).send();
};


export const getEmotionsController = async (req, res) => {
    const userId = req.user._id;
    const emotions = await getEmotions(userId);

    res.status(200).json({
    status: 200,
    message: 'Successfully fetched emotions!',
    data: emotions,
  });
};
