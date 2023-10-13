const { BrowserWindow } = require("electron");
const { v4: uuidv4 } = require("uuid");
const {getData, setData} = require("../models/store");

const exampleUser = {
  name: "example",
  mail: "example@gmail.com",
  openerPic: false,
  QuestCheck: false,
  Quest: "",
  QuestAnswer: "",
};

exports.CreateUser = () => {
  const profiles = getData("Profiles");
  const newData = { ...exampleUser, id: uuidv4() };
  let newProfiles;
  if (profiles) {
    newProfiles = [...profiles, newData];
  } else {
    newProfiles = [newData];
  }
  setData("selectedProfileId", newData.id);
  setData("Profiles", newProfiles);
  setData("status", false);
  BrowserWindow.getAllWindows().forEach((win) => {
    win.webContents.reload();
  });
};

exports.DeleteUser = () => {
  const activeUserId = getData("selectedProfileId");
  const profiles = getData("Profiles");
  const newProfiles = profiles.filter((item) => item.id !== activeUserId);
  setData("selectedProfileId", newProfiles[0].id);
  setData("Profiles", newProfiles);
  setData("status", false);
  BrowserWindow.getAllWindows().forEach((win) => {
    win.webContents.reload();
  });
};
