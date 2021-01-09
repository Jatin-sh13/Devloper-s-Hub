const express = require('express')
const authmiddle = require('../middleware/authmiddle')
const User = require('../models/user')
const Post = require('../models/post')
const { body, validationResult } = require('express-validator');
const router = express.Router()
// Create Post
router.post('/', [authmiddle, [
    body('text', 'Please Add Text').not().isEmpty(),
]], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).send(error)
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const { name, avatar } = user
        const { text } = req.body
        const newPost = {
            text, name, avatar, user: req.user.id,
        }
        const post = new Post(newPost)
        await post.save()
        res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})
//Get post by id
router.get('/:id', authmiddle, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).send("Post Not found")
        }
        res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server Error")
    }
})
router.delete('/:id', authmiddle, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const checkid1 = req.user.id
        const checkid2 = post.user
        if (checkid2.toString() !== checkid1) {
            return res.status(404).send("User Not Authorised")
        } //isme checking ho rhi hai ki jo user post ko delete kar rha hai vo uska post hai ya nhi
        await post.remove()
        res.json("Post Deleted")
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})
//Post Like
router.put('/like/:id', authmiddle, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        //checking if the post is being liked already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post is already liked' })
        }
        post.likes.unshift({ user: req.user.id })
        await post.save()
        res.json(post.likes)
    } catch (error) {
        console.log(error)
        return res.status(400).send('server error')
    }
})
//Post Delete
router.put('/unlike/:id', authmiddle, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        //checking if the post is being liked already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post Not Yet Liked' })
        }
        //if post liked then remove like from array and unlike the post 
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json(post.likes)
    } catch (error) {
        console.log(error)
        return res.status(400).send('server error')
    }
})
//Add comment
router.post('/comment/:id', [authmiddle, [
    body('text', 'Please Add Text').not().isEmpty(),
]], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).send(error)
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)
        const { name, avatar } = user
        const { text } = req.body
        const newPost = {
            text, name, avatar, user: req.user.id,
        }
        post.comments.unshift(newPost)
        await post.save()
        res.json(post.comments)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})
//Delete Comment
router.delete('/comment/:id/:comment_id', authmiddle, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Pull out comment
        const comment = post.comments.find(
            comment => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }
        // Check user
        const CommentUser = comment.user
        if (CommentUser.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
        );

        await post.save();

        return res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});
module.exports = router
