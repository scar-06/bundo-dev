import { getClientBaseUrl, network, ResProps } from "@/lib/common";

interface UploadSingleSchema {
  name: string;
  file: File;
}
interface UploadSingleSchemaRes {
  status: string;
  urls: string;
}
interface UploadMultipleSchema {
  files: File[];
}

interface UploadMultipleSchemaRes {
  status: string;
  urls: string[];
}
export const handleUploadSingle = async (
  data: UploadSingleSchema,
): Promise<ResProps<UploadSingleSchemaRes>> => {
  const formdata = new FormData();
  formdata.append("file", data.file);
  const URL = `${getClientBaseUrl()}/media/upload-image-single`;
  const reqBody = { body: formdata };
  return network.post<UploadSingleSchemaRes>(URL, reqBody);
};

export const handleUploadMultiple = async (data: UploadMultipleSchema) => {
  const formdata = new FormData();
  data.files.forEach((file) => {
    formdata.append("files", file);
  });
  const URL = `${getClientBaseUrl()}/media/upload-image-multiple`;
  const reqBody = {
    body: formdata,
  };
  return network.post<UploadMultipleSchemaRes>(URL, reqBody);
};

export const deleteImageSingle = async (s3Path: string): Promise<void> => {
  try {
    const imagePath: string = Buffer.from(s3Path).toString("base64");
    const URL = `${getClientBaseUrl()}/media/delete-image-single/${imagePath}`;
    const response = await fetch(URL, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the image");
    }
    return;
  } catch (error) {
    throw new Error("Error deleting the image:");
  }
};
