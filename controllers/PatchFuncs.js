const { BrowserWindow } = require("electron");
const { getData, setData } = require("../models/store");

exports.setStatus = (e, data) => {
  setData("status", data);
};

exports.setActiveUser = (e, data) => {
  setData("selectedProfileId", data);
  setData("status", false);
  if (BrowserWindow.getAllWindows().length !== 1) {
    BrowserWindow.getAllWindows().forEach((win) => {
      if (BrowserWindow.getFocusedWindow.id !== win.id) {
        win.webContents.reload();
      }
    });
  }
};

exports.setUser = (e, data) => {
  const profiles = getData("Profiles");
  const newProfiles = profiles.map((item) => {
    if (item.id === data.id) {
      return data;
    } else {
      return item;
    }
  });
  setData("Profiles", newProfiles);
  setData("status", false);
  BrowserWindow.getAllWindows().forEach((win) => {
    win.webContents.reload();
  });
};

exports.setSettings = (e, data) => {
  setData("settings", data);
  setData("status", false);
  BrowserWindow.getFocusedWindow().close();
  BrowserWindow.getAllWindows().forEach((win) => {
    win.webContents.reload();
  });
};