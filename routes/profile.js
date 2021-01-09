const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const authmiddle = require('../middleware/authmiddle')
const User = require('../models/user')
const { body, validationResult } = require('express-validator');
const user = require('../models/user')
//@private route
//geting users profile
router.get("/", async (req, res) => {
    try {
        const profile = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profile)
    } catch (error) {
        console.log(error)
    }
})
router.get("/me", authmiddle, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: "there is no profile for this user" });
        }
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
//@private route
//Creating users profile
router.post('/', [authmiddle, [
    body('status', 'Please Add Status').not().isEmpty(),
    body('skills', 'Please Add Skills').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = req.body
    //Build Profile objecct 
    const ProfileFields = {}
    ProfileFields.user = req.user.id
    if (company) ProfileFields.company = company;
    if (website) ProfileFields.website = website;
    if (location) ProfileFields.location = location;
    if (status) ProfileFields.status = status;
    if (bio) ProfileFields.bio = bio;
    if (githubusername) ProfileFields.githubusername = githubusername;
    if (skills) {
        ProfileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    ProfileFields.social = {}
    if (youtube) ProfileFields.social.youtube = youtube;
    if (twitter) ProfileFields.social.twitter = twitter;
    if (facebook) ProfileFields.social.linkedin = linkedin;
    if (instagram) ProfileFields.social.instagram = instagram;
    try {
        let profile = await Profile.findOne({ user: req.user.id })
        //jab mai profile pe post req marunga mera token mujhe user ki
        //id return krega ussi id ko use krke db mai data save karunga
        if (profile) {
            //Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: ProfileFields }, { new: true }).populate('user', ['name', 'avatar'])
            return res.json(profile)
        }
        //create profile
        profile = new Profile(ProfileFields).populate('user', ['name', 'avatar'])
        await profile.save()
        console.log(profile)
        return res.json(profile)
    } catch (error) {
        res.status(500).send('Server Error')
    }
})
//Getting Profile by Id
router.get('/user/:user_id', authmiddle, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
        if (!profile) {
            res.json("Profile Not found")
        }
        res.json(profile)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})
router.delete('/', authmiddle, async (req, res) => {
    try {
        //Delete Profile
        const profile = await Profile.findOneAndRemove({ user: req.user.id })
        //Delete User
        const user = await User.findOneAndRemove({ _id: req.user.id })
        res.json('Deleted Successfully')
    } catch (error) {
        console.log(error)
        res.json("Server Error")
    }
})
//Adding Experience
router.put('/experience', [authmiddle, [
    body('title', 'Please Add title').not().isEmpty(),
    body('company', 'Please Add Company').not().isEmpty(),
    body('from', 'Please Add Location').not().isEmpty()
]], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.status(500).send(error)
    }
    const { title, company, location, from, to, current, description } = req.body;
    const newExp = {
        title, company, location, from, to, current, description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        profile.experience.push(newExp)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error)
        res.status(400).send('server error')
    }
})
//Delete Experiice
router.delete('/experience/:exp_id', authmiddle, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);
        console.log(removeIndex)
        profile.experience.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error)
        res.send('server Error')
    }
})
//Adding Education
router.put('/education', [authmiddle, [
    body('school', 'Please Add school').not().isEmpty(),
    body('degree', 'Please Add degree').not().isEmpty(),
    body('from', 'Please Add date').not().isEmpty(),
    body('fieldofstudy', 'Please Add fieldofstudy').not().isEmpty()

]], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.status(500).send(error)
    }
    const { school, degree, from, fieldofstudy, current, description, to } = req.body;
    const newExp = {
        school, degree, from, fieldofstudy, current, description, to
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        profile.education.push(newExp)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error)
        res.status(400).send('server error')
    }
})
//Delete Exducation
router.delete('/education/:edu_id', authmiddle, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const removeIndex = profile.education.map(item => item._id).indexOf(req.params.edu_id);
        console.log(removeIndex)
        profile.education.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error)
        res.send('server Error')
    }
})
module.exports = router
