const mongoose = require('mongoose');
const { Schema } = mongoose;
const CommentSchema = new Schema(
  {
    nickname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    contentId: {
      type: String,
    },
    //commentuser:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    comment: {
      type: String,
      required: true,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
    //commentId 버츄얼 생성
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CommentSchema.virtual('commentId').get(function () {
    return this._id.toHexString();
});
CommentSchema.set('toJSON', {
    virtuals: true,
});




module.exports = mongoose.model('Comment', CommentSchema);
