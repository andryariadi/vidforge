import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export async function uploadToFirebaseStorage(file: Buffer | Blob, filePath: string, contentType: string): Promise<string> {
  try {
    // Referensi ke lokasi file di Firebase Storage
    const fileRef = ref(storage, filePath);

    // Unggah file
    const snapshot = await uploadBytes(fileRef, file, { contentType });

    // Dapatkan URL untuk file yang diunggah
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("File uploaded successfully:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    throw error;
  }
}
