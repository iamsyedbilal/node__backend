import IdeaApi from "../services/ideasApi";

class IdeaList {
  constructor() {
    this._ideaList = document.querySelector("#idea-list");
    this._ideas = [];
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("bussiness");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
    this.addEventListeners();
  }

  addEventListeners() {
    this._ideaList.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".delete");
      const editBtn = e.target.closest(".edit");

      if (deleteBtn) {
        const ideaId = deleteBtn.closest(".card").dataset.id;
        this.deleteIdea(ideaId);
      }

      if (editBtn) {
        const ideaId = editBtn.closest(".card").dataset.id;
        this.handleEdit(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeaApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from server
      const res = await IdeaApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You can not delete this resource");
    }
  }

  handleEdit(id) {
    const idea = this._ideas.find((idea) => idea._id === id);

    const newText = prompt("Update idea text:", idea.text);
    const newTag = prompt("Update tag:", idea.tag);
    const newUsername = prompt("Update username:", idea.username);

    if (!newText || !newTag || !newUsername) return;

    this.updateIdea(id, {
      text: newText,
      tag: newTag,
      username: newUsername,
    });
  }

  async updateIdea(id, data) {
    try {
      await IdeaApi.updateIdea(id, data);

      // update local array
      this._ideas = this._ideas.map((idea) =>
        idea._id === id ? { ...idea, ...data } : idea,
      );

      this.render();
    } catch (error) {
      console.error(error);
      alert("Failed to update idea");
    }
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }

  render() {
    this._ideaList.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        return `
       <div class="card" data-id="${idea._id}">
       <button class="edit"><i class="fas fa-edit"></i></button>
          <button class="delete"><i class="fas fa-times"></i></button>
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
      `;
      })
      .join("");
  }
}

export default IdeaList;
