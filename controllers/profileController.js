const _ = require('lodash')
const { Profile } = require("../models/profile")


module.exports.getProfile = async (req, res) => {

    const userId = req.user._id;
    const profile = await Profile.findOne({ user: userId });
    return res.status(200).send(profile)

}


// setProfile function ta diye ami eki sathe create o korbo update o korbo 

module.exports.setProfile = async (req, res) => {
    // jode profile thake na thake tahle cretae hbe r jode thake thake tahle seta update hbe 
    const userId = req.user._id;

    const userProfile = _.pick(req.body, ["phone", "address1", "address2", "city", "state", "postcode", "country"])

    // userProfile a ekta new property set korbo property tar name hbe holo user and er value hbe holo ei userId

    userProfile["user"] = userId;

    let profile = await Profile.findOne({ user: userId });

    if (profile) {
        // jode profiel thake tahle profile update korbo

        await Profile.updateOne({ user: userId }, userProfile)
    }
    else {
        profile = new Profile(userProfile);
        await profile.save();

    }

    // r jode profile na thake tahle profiel create korbo
}