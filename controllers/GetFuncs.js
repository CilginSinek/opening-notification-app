const { getData } = require("../models/store");

exports.getProfile = () => {
  return getData("Profiles");
};

exports.getStatus = () => {
  return getData("status");
};

exports.getSelectedId = () => {
  return getData("selectedProfileId");
};

exports.getSettings = () => {
  return getData("settings");
};

exports.getActiveUserDetails = () => {
  const profiles = getData("Profiles");
  const ActiveUserId = getData("selectedProfileId");
  if (profiles.length === 0) {
    return null;
  } else {
    const selectedUser = profiles.filter((item) => item.id === ActiveUserId);
    return selectedUser[0];
  }
};