const { GoogleAuth } = require('google-auth-library');
const { Datastore } = require('@google-cloud/datastore');
const path = require('path');


// Construct the relative path to the JSON key file
const keyFilePath = path.join(__dirname, 'resolute-client-420805-b76218d69ac6.json');


// Authenticate with Google Cloud Datastore API
async function authenticate() {
    const auth = new GoogleAuth({
        keyFile: keyFilePath,
        scopes: 'https://www.googleapis.com/auth/datastore',
    });


    try {
        const client = await auth.getClient();
        return client;
    } catch (error) {
        console.error('Authentication failed:', error);
        return null;
    }
}


// Update emotion in Cloud Datastore
async function updateEmotion(date, rating) {
    const client = await authenticate();
    if (!client) {
        console.error('Failed to authenticate.');
        return;
    }


    const datastore = new Datastore({ projectId: 'resolute-client-420805', auth: client });


    const kind = 'Emotion'; // Change this to your entity kind
    const entityKey = datastore.key(kind);


    const entity = {
        key: entityKey,
        data: {
            date: date,
            rating: rating
        },
    };


    try {
        await datastore.save(entity);
        console.log('Emotion updated successfully:', entity);
        return entity;
    } catch (error) {
        console.error('Error updating emotion:', error);
        return null;
    }
}


module.exports = {
    updateEmotion
};










