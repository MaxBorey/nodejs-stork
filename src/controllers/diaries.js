import { createDiaryNote } from "../services/diaries.js";

export const createDiaryNoteController = async (req, res) => {
    const data = req.body;
    const diaryNote = await createDiaryNote({ ...data, userId: req.user._id });


    res.status(201).json({
    status: 201,
    message: 'Successfully created a Note!',
    data: diaryNote,
  });
};
