const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("bridge", {
  profiles: () => ipcRenderer.invoke("Profiles"),
  status: () => ipcRenderer.invoke("status"),
  activeUser: () => ipcRenderer.invoke("activeUser"),
  activeUserDetails: () => ipcRenderer.invoke("activeUserDetails"),
  getSettings: () => ipcRenderer.invoke("getSettings"),

  setSettings: (settings) => ipcRenderer.send("setSettings", settings),
  changeStatus: (status) => ipcRenderer.send("changeStatus", status),
  changeActive: (id) => ipcRenderer.send("activeUser", id),
  createUser: () => ipcRenderer.send("CreateUser"),
  setUserSettings: (formdata) => ipcRenderer.send("setUser", formdata),
  openSettings: () => ipcRenderer.send("openSettings"),
  openSystemSettings: () => ipcRenderer.send("openSystemSettings"),
  deleteUser: () => ipcRenderer.send("DeleteUser"),
  questResponse: (data) => ipcRenderer.send("questResponse", data),
});
