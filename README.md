# Nodejs_bometric_api
# Code Readme

This repository contains code for creating and verifying users using biometric authentication. The code is written in Node.js and uses MongoDB as the database.

## Prerequisites

Before running this code, make sure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running the following command:

```shell
npm install
```

## Usage

### Creating a User

To create a user, use the `createUser` function. This function checks if the provided username is already taken and creates a new user if it is available. The created user is then returned in the response.

Example:

```javascript
const User = require('../models/user.model');

const createUser = async (req, res) => {
  try {
    // Checking for existing User
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    const user = await User.create();
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    if (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};
```

### Verifying a User by Biometric Authentication

To verify a user using biometric authentication, use the `verifyUserBybiometric` function. This function takes the user ID and fingerprint image as input and performs a fingerprint verification process. It compares the captured fingerprint image with the stored fingerprint image of the user and determines whether the verification is successful based on a match score threshold.

Example:

```javascript
const User = require('../models/user.model');
const { FingerprintDevice } = require('@digitalpersona/devices');

const verifyUserBybiometric = async (req, res) => {
  const { userId, fingerprintImage } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Perform fingerprint verification with the captured image and the stored image
    const device = new FingerprintDevice();
    const matchScore = device.match(fingerprintImage, user.fingerprintImage);

    // Determine verification result based on match score threshold
    const matchThreshold = 60; // Adjust the threshold as per your needs
    const isVerified = matchScore >= matchThreshold;

    res.status.json({ isVerified });
  } catch (error) {
    console.log(error);
    if (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};
```

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please submit a pull request.
