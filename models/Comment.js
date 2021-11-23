const mongoose = require('mongoose')
const Schema = mongoose.Schema
const faker = require('faker')

avatarImg = faker.image.animals()

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  username: {
    type: String,
    required: true
  },
  issueId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true

  },
  avatar: {
    type: String,
    default: avatarImg
  }
})

module.exports = mongoose.model("Comment", commentSchema)