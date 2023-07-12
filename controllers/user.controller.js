// @ts-nocheck
const User = require('../models/user.model')
const {FingerprintDevice} = require('@digitalpersona/devices')


const createUser = async(req,res) =>{
    try {
        //Checking for existing User
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: 'Username is already taken' });
        }
        const user = await User.create()
        res.status(201).json({user})

        
    } catch (error) {
        console.log(error);
        if (error) {
            return res.status(500).json({ message: 'An error occurred' });
          }

    }
}



const verifyUserBybiometric = async(req, res)=>{
    const { userId, fingerprintImage } = req.body;

    try {
        const user = await User.findOne({userId})
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
            // Perform fingerprint verification with the captured image and the stored image
        const device = new FingerprintDevice();
        const matchScore = device.match(fingerprintImage, user.fingerprintImage);
    
    
        // Determine verification result based on match score threshold
        const matchThreshold = 60; // Adjust the threshold as per your needs
        const isVerified = matchScore >= matchThreshold;
    
        res.stajson({ isVerified });
        
    } catch (error) {
        console.log(error);
        if (error) {
            return res.status(500).json({ message: 'An error occurred' });
          }
    }
    


}


module.exports ={
    createUser,
    verifyUserBybiometric
}