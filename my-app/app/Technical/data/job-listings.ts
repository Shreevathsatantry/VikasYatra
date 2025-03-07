import { databases, COLLECTION_ID, DATABASE_ID } from "../../../appwrite/appwrite";

export const fetchJobListings = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    const jobs = response.documents.map((job, index) => ({
      id: index + 1,
      title: job.title,
      company: job.company,
      description: job.description,
      location: job.location,
      salary: job.salary,
      skills: job.skills,
      postedDate: "08-03-25", // Current date
      applicants: job.applicants || 0,
      status: job.status || "Active",
    }));
    return jobs;
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return [];
  }
};

export let jobListings = await fetchJobListings();
