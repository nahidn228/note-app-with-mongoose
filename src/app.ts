import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();
app.use(express.json());

const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["personal", "work", "study", "other"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "gray" },
  },
});
const Note = model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  // Approach 1 creating a data
  // const myNote = new Note({
  //   title: "Learning Express",
  //   content: "I am learning Mongoose with TS and Express",
  //   tags: {
  //     label: "Database",
  //   },
  // });
  // await myNote.save();

  // approach - 2
  console.log(body);

  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "note created successfully",
    note,
  });
});
app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "note created successfully",
    notes,
  });
});
app.get("/note/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const notes = await Note.findById(id);

  res.status(201).json({
    success: true,
    message: "note created successfully",
    notes,
  });
});
app.patch("/note/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const updateBody = req.body;

  const notes = await Note.findByIdAndUpdate(noteId, updateBody);

  res.status(201).json({
    success: true,
    message: "note update successfully",
    notes,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app");
});

export default app;
