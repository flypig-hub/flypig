const mongoose = require('mongoose');


/*const gettime = new Date();
const utcNow = gettime.getTime() + gettime.getTimezoneOffset() * 60 * 1000;
const koreaTimeDiff = 9 * 60 * 60 * 1000;
const krtime = new Date(utcNow + koreaTimeDiff);
*/
const CommentSchema = mongoose.Schema(
  {
    nickname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    updateAt: {
        type : Date,
        default : Date.now
    },

    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contents",
      required: true,
    },
  }
  /*{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }*/
);

CommentSchema.virtual('commentId').get(function () {
    return this._id.toHexString();
});
CommentSchema.set('toJSON', {
    virtuals: true,
});




module.exports = mongoose.model('Comment', CommentSchema);
