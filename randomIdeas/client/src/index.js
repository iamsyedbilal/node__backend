import "@fortawesome/fontawesome-free/css/all.css";
import "./css/style.css";
import Modal from "./components/Modal";
import IdeaForm from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";

const modal = new Modal();
const ideaForm = new IdeaForm();
const ideaList = new IdeaList();
ideaForm.render();
