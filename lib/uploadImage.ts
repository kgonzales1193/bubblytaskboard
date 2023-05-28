import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    "6470df0b71a6056117de",
    ID.unique(),
    file
  );
  return fileUploaded;
};

export default uploadImage;
