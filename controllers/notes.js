const Notes = require("../models/Notes");

exports.getAll = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user._id });
    if (!notes || notes.length === 0) {
      return res.status(200).send({ msg: "You have no notes", notes: [] });
    }
    res.status(200).send({ msg: "All your notes", notes });
  } catch (error) {
    res.status(400).send({ msg: "Fail to get notes" });
  }
};

module.exports.addNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      res.status(400).send({ msg: "Please fill all the fields" });
    }
    const newNote = new Notes({ user: req.user._id, title, content, category });
    await newNote.save();
    res.status(200).send({ msg: "Note add successfully...", newNote });
  } catch (error) {
    res.status(400).send({ msg: "Note can not added!!!" });
  }
};
exports.getNote = async (req, res) => {
  try {
    const note = await Notes.findOne({ _id: req.params.id });
    if (!note) {
      res.status(404).send({ msg: "Note not found" });
    } else {
      res.status(200).send({ msg: "The note is:", note });
    }
  } catch (error) {
    res.status(400).send({ msg: "Fail" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const note = await Notes.findById(req.params.id);
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).send("You can't do this action");
    }
    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;
      await note.save();
      res.status(200).send({ msg: "Note Updated successfully...", note });
    }
  } catch (error) {
    res.status(400).send({ msg: "Not Updated!!!" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (note) {
      if (note.user.toString() !== req.user._id.toString()) {
        return res.status(401).send("You can't do this action");
      }

      await Notes.deleteOne({ _id: req.params.id });

      res.status(200).send({ msg: "Note deleted successfully..." });
    } else {
      res.status(404).send({ msg: "Note not found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Not deleted!!!" });
  }
};
