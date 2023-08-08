const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  const dbFilePath = path.join(__dirname, "../db.json");
  // get note
  app.get("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
    res.json(notes);
  });
  // post note
  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    const notes = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));

    newNote.id = Math.random().toString(36).substr(2, 9);
    notes.push(newNote);

    fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2));
    res.json(newNote);
  });
  // delete note
  app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    let notes = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));

    notes = notes.filter((note) => note.id !== noteId);

    fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2));
    res.json({ message: "Note deleted successfully" });
  });
};
