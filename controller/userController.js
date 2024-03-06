import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body); // req.body ke under hi sara data jata hai jb hm add user pr click krte hai

    // creates a new object (userData) based on the data submitted via an HTTP request, allowing for handling and manipulation of that data within the application.

    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }

    const saveData = await userData.save();

    res.status(200).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();

    //     it means you're querying the MongoDB database for documents represented by the User model, and you're waiting for the result to be returned before proceeding with further execution.

    // The userData variable will hold the result of the User.find() operation, which could be an array of documents (if found) or an empty array if no documents match the query.

    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }

    res.status(200).json(userData);
  } catch {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not found" });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    
    // updates a document in the database with the specified id using the data provided in req.body. It then waits for the update operation to complete and returns the updated document, which is stored in the updatedData variable for further processing in your application.

    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User does not exist" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error });
  }
};
