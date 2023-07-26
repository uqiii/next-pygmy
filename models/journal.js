import { Schema, model, models } from 'mongoose';

const JournalSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  thought: {
    type: String,
    required: [true, 'thought is required.'],
  },
  createdAt: {
    type: Date,
  }
});

const Journal = models.Prompt || model('Journal', JournalSchema);

export default Journal;