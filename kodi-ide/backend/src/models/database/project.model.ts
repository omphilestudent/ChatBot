import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  owner: Schema.Types.ObjectId;
  files: Array<{
    path: string;
    content: string;
    language: string;
    lastModified: Date;
    kodiFingerprint: string;
  }>;
  structure: {
    directories: string[];
    fileTree: object;
  };
  learningPath: {
    completedConcepts: string[];
    suggestedNext: string[];
    progress: number;
  };
  settings: {
    aiAssistanceLevel: 'beginner' | 'intermediate' | 'advanced';
    learningReminders: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  files: [{
    path: String,
    content: String,
    language: String,
    lastModified: Date,
    kodiFingerprint: String
  }],
  structure: {
    directories: [String],
    fileTree: Schema.Types.Mixed
  },
  learningPath: {
    completedConcepts: [String],
    suggestedNext: [String],
    progress: Number
  },
  settings: {
    aiAssistanceLevel: { type: String, default: 'intermediate' },
    learningReminders: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

export const Project = model<IProject>('Project', projectSchema);
