import axios from "axios";

class IdeaApi {
  constructor() {
    this._apiUrl = `http://localhost:5000/api/ideas`;
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  }

  createIdea(data) {
    return axios.post(this._apiUrl, data);
  }

  updateIdea(id, data) {
    return axios.patch(`${this._apiUrl}/${id}`, data);
  }

  deleteIdea(id) {
    return axios.delete(`${this._apiUrl}/${id}`);
  }
}

export default new IdeaApi();
