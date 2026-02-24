import axios from "axios";

class IdeaApi {
  constructor() {
    this._apiUrl = `http://localhost:5000/api/ideas`;
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  }
}

export default new IdeaApi();
