import { databases, COLLECTION_ID1, DATABASE_ID } from "../../../appwrite/appwrite";

export const fetchJobListings = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID1);
    const jobs = response.documents.map((job, index) => ({
      id: index + 1,
      name: job.name,
      email: job.email,
      score: job.score,

      videoId: job.videoId,
      resumeid: job.resumeid,
      
    }));
    return jobs;
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return [];
  }
};

export let applicants = await fetchJobListings();
