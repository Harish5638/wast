import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
  author: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

export interface ICommunityPost extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  imageUrl?: string;
  imageHint?: string;
  likes: number;
  comments: IComment[];
}

const CommentSchema = new Schema<IComment>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommunityPostSchema = new Schema<ICommunityPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    imageHint: { type: String },
    likes: { type: Number, default: 0 },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

export default mongoose.models.CommunityPost || mongoose.model<ICommunityPost>("CommunityPost", CommunityPostSchema);
