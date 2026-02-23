import Ideas from "../models/ideas.model.js";

// Get All Ideas
export async function getAllIdeas(req, res) {
  try {
    const ideas = await Ideas.find();
    if (ideas.length === 0) {
      return res.status(404).json({ success: false, message: "No Data Found" });
    }
    return res.status(200).json({
      success: true,
      length: ideas.length,
      data: ideas,
      message: "All data fetch",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Get A Ides
export async function getIdea(req, res) {
  try {
    const { id } = req.params;

    const idea = await Ideas.findById(id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    return res.status(200).json({
      length: idea.length,
      data: idea,
      message: "data fetch",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Add an Idea
export async function createIdea(req, res) {
  try {
    const { text, tag, username } = req.body;

    if (!text || !tag || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const idea = await Ideas.create({
      text,
      tag,
      username,
    });

    return res.status(201).json({
      success: true,
      data: idea,
      message: "Idea is created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Update Idea
export async function updateIdes(req, res) {
  try {
    const { id } = req.params;

    const { text, tag, username } = req.body;

    if (!text || !tag || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const idea = await Ideas.findByIdAndUpdate(
      id,
      {
        text,
        tag,
        username,
      },
      { new: true, runValidators: true },
    );

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: idea,
      message: "Idea updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Delete Idea

export async function deleteIdea(req, res) {
  try {
    const { id } = req.params;

    const idea = await Ideas.findByIdAndDelete(id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Idea delete successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
