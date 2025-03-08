// import {Client, Account} from 'appwrite';

// export const client = new Client();

// client
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint')
//     .setProject("67cb40b4000f4de5fb71")


// export const account = new Account(client);

// export {ID} from 'appwrite'

import { Client, Account, Databases , Storage } from 'appwrite';

export const API_ENDPOINT = 'https://cloud.appwrite.io/v1';
export const PROJECT_ID = '67cb40b4000f4de5fb71';
export const DATABASE_ID = '67cb457d0023ee962892';
export const COLLECTION_ID = '67cb459c001bd4a8e42a';
export const COLLECTION_ID1 = '67cb5212000c1dad7b3f';
export const BUCKET_ID = '67cb8f6d001bd371a845';


export const Events= 'Eventid';
export const currentEvent= 'currentevent';


const client = new Client()
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;




