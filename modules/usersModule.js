"use strict";

const { getCollection, toObjectId } = require("./dbModule.js");

const entity = "users";

async function addUser(email, username, password, isAdmin = false) {
  try {
    const collection = await getCollection(entity);
    const existUsername = await collection.findOne({ username });
    const existUserEmail = await collection.findOne({ email });
    if (existUsername) {
      throw new Error("The username is already exist😢");
    } else if (existUserEmail) {
      throw new Error("The email is already taken😢");
    }
    await collection.insertOne({ username, password, email, isAdmin });
    console.log(`User "${username}" have been added successfully`);
  } catch (error) {
    console.log(error);
  }
}

async function getUserByUsername(username) {
  try {
    const collection = await getCollection(entity);
    const user = await collection.findOne({ username });
    if (!user) throw new Error("User not found😢");
    const { password, ...restUserDetails } = user;
    return restUserDetails;
  } catch (error) {
    console.log(error);
  }
}

async function updatePassword(username, newPassword) {
  try {
    const collection = await getCollection(entity);
    await collection.updateOne(
      { username: username },
      { $set: { password: newPassword } }
    );
    console.log(`User "${username}" have been changed password successfully`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addUser, getUserByUsername, updatePassword };
