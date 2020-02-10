import { mockGetPhotoResponse } from "./mockGetPhotoResponse";

const get = () => {
  return Promise.resolve({ data: mockGetPhotoResponse });
};

exports.get = get;
