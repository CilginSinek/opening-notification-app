const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Tray,
  Notification,
} = require("electron");
const path = require("path");
const Store = require("electron-store");
const { v4: uuidv4 } = require("uuid");
const NodeWebcam = require("node-webcam");
const sgMail = require("@sendgrid/mail");

const msg = {
  to: "",
  from: "",
  subject: "",
  text: "",
  html: ""
};

//! Store schema
const schema = {
  status: {
    type: "boolean",
    default: false,
  },
  Profiles: {
    type: "array",
  },
  selectedProfileId: {
    type: "string",
  },
  settings: {
    type: "object",
  },
};

//! Pic Options
const opts = {
  width: 300,
  height: 200,
  quality: 1,
  frames: 1,
  delay: 0,
  saveShots: false,
  output: "png",
  device: false,
  callbackReturn: "base64",
  verbose: false,
};

//! About Page
app.setAboutPanelOptions({
  applicationName: "Opening Notification App",
  applicationVersion: "version: 0.0.1",
  authors: ["CilginSinek"],
  version: "0.0.1",
});

//! Tray Context Menu
const contextMenu = Menu.buildFromTemplate([
  {
    label: "Show App",
    click: () => {
      createWindow();
      tray.destroy();
    },
  },
  { label: "Quit", click: () => app.quit() },
]);

//!Top menu template
const mainMenuTemplate = [
  {
    label: "Configirations",
    submenu: [
      {
        label: "Profiles",
        click: () => {
          createProfilesWindow();
        },
      },
      {
        label: "System Settings",
        click: () => {
          createSettingsWindow();
        },
      },
    ],
  },
  {
    label: "Informations",
    submenu: [
      {
        label: "App Repo",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://github.com/CilginSinek");
        },
      },
      {
        label: "about",
        role: "about",
      },
    ],
  },
  {
    label: "Tools",
    submenu: [
      {
        label: "Dev Tools",
        role: "toggleDevTools",
      },
      {
        label: "Reload",
        role: "reload",
      },
      {
        label: "Force Reload",
        role: "forceReload",
      },
    ],
  },
];

const mainmenu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(mainmenu);

const store = new Store({ schema });

//! Windows
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "icon/icon.png"),
    width: 340,
    height: 555,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contentSecurityPolicy:
        "default-src 'self' style-src 'self' 'unsafe-inline';",
    },
  });

  mainWindow.loadFile(path.join(__dirname, "pages/index/index.html"));
  return mainWindow;
};

const createProfilesWindow = () => {
  const settingsWindow = new BrowserWindow({
    icon: path.join(__dirname, "icon/icon.png"),
    width: 465,
    height: 570,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contentSecurityPolicy: "script-src 'self' 'unsafe-inline';",
    },
    // autoHideMenuBar: true,
  });

  settingsWindow.loadFile(path.join(__dirname, "pages/profiles/Profiles.html"));
};

const createSettingsWindow = () => {
  const settings = new BrowserWindow({
    icon: path.join(__dirname, "icon/icon.png"),
    width: 300,
    height: 325,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contentSecurityPolicy: "script-src 'self' 'unsafe-inline';",
    },
    autoHideMenuBar: true,
  });

  settings.loadFile(path.join(__dirname, "pages/settings/settings.html"));
};
const createQuestWindow = () => {
  const settings = new BrowserWindow({
    icon: path.join(__dirname, "icon/icon.png"),
    width: 465,
    height: 190,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contentSecurityPolicy: "script-src 'self' 'unsafe-inline';",
    },
    autoHideMenuBar: true,
  });

  settings.loadFile(path.join(__dirname, "pages/quest/quest.html"));
};

//? Start with Windows Open
// app.setLoginItemSettings({
//   openAtLogin: true,
// });

let tray = null;
app.whenReady().then(() => {
  // store.set("status",false)
  if (store.get("status")) {
    const profiles = store.get("Profiles");
    const selected = profiles.find(
      (item) => item.id === store.get("selectedProfileId")
    );
    if (selected.QuestCheck === true) {
      createQuestWindow();
    } else {
      const { api_key, from_mail } = store.get("settings");
      if (selected.openerPic === true) {
        NodeWebcam.capture("test_picture", opts, function (err, data) {
          if (err) {
            console.log(err);
            const notification = new Notification({
              title: "Error",
              body: err,
            });
          } else {
            sgMail.setApiKey(api_key);
            msg.from = from_mail;
            msg.to = selected.mail;
            msg.subject = "Notification App";
            msg.text = `Bilgisayariniz ${new Date()} tarihinde fotograftaki sahıs tarafindan acildi.`;
            msg.html = `<div><img src=${data} ></div>`;
            console.log(msg)
            sgMail
              .send(msg)
              .then((e) => {
                console.log(e);
              })
              .catch((error) => {
                console.log(error);
                if (error.response) {
                  console.error(error.response.body);
                }
              });
          }
        });
      } else {
        sgMail.setApiKey(api_key);
        msg.from = from_mail;
        msg.to = selected.mail;
        msg.subject = "Notification App";
        msg.text = `Bilgisayarınızı ${new Date()} tarihinde açıldı.`;
        msg.html = "";
        sgMail
          .send(msg)
          .then((e) => {
            console.log(e);
          })
          .catch((error) => {
            console.log(error);
            if (error.response) {
              console.error(error.response.body);
            }
            const notification = new Notification({
              title: "Error",
              body: error,
            });
          });
      }
      tray = new Tray(path.join(__dirname, "icon/icon.png"));
      tray.setContextMenu(contextMenu);
    }
  } else {
    createWindow();
  }

  ////! Funcs
  //* Get Profile List
  ipcMain.handle("Profiles", () => store.get("Profiles"));
  //* Get status
  ipcMain.handle("status", () => store.get("status"));
  //* Get Active User
  ipcMain.handle("activeUser", () => store.get("selectedProfileId"));
  //* Get Active User Details
  ipcMain.handle("activeUserDetails", () => {
    const profiles = store.get("Profiles");
    const ActiveUserId = store.get("selectedProfileId");
    const selectedUser = profiles.filter((item) => item.id === ActiveUserId);
    return selectedUser[0];
  });
  //* Get Settings
  ipcMain.handle("getSettings", () => store.get("settings"));

  //* Change Status
  ipcMain.on("changeStatus", (e, data) => store.set("status", data));
  //* Change Active User
  ipcMain.on("activeUser", (e, data) => {
    store.set("selectedProfileId", data);
    store.set("status", false);
    if (BrowserWindow.getAllWindows().length !== 1) {
      BrowserWindow.getAllWindows().forEach((win) => {
        if (BrowserWindow.getFocusedWindow.id !== win.id) {
          win.webContents.reload();
        }
      });
    }
  });
  //* Create New User
  ipcMain.on("CreateUser", () => {
    const profiles = store.get("Profiles");
    const newData = { ...exampleUser, id: uuidv4() };
    let newProfiles;
    if (profiles) {
      newProfiles = [...profiles, newData];
    } else {
      newProfiles = [newData];
    }
    store.set("selectedProfileId", newData.id);
    store.set("Profiles", newProfiles);
    store.set("status", false);
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.reload();
    });
  });
  //* Delete User
  ipcMain.on("DeleteUser", () => {
    const activeUserId = store.get("selectedProfileId");
    const profiles = store.get("Profiles");
    const newProfiles = profiles.filter((item) => item.id !== activeUserId);
    store.set("selectedProfileId", newProfiles[0].id);
    store.set("Profiles", newProfiles);
    store.set("status", false);
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.reload();
    });
  });

  //* Set User Settings
  ipcMain.on("setUser", (e, data) => {
    const profiles = store.get("Profiles");
    const newProfiles = profiles.map((item) => {
      if (item.id === data.id) {
        return data;
      } else {
        return item;
      }
    });
    store.set("Profiles", newProfiles);
    store.set("status", false);
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.reload();
    });
  });
  //* Open Profile Settings
  ipcMain.on("openSettings", () => createProfilesWindow());
  //* Open System Settings
  ipcMain.on("openSystemSettings", () => createSettingsWindow());
  //* Set Settings
  ipcMain.on("setSettings", (e, data) => {
    store.set("settings", data);
    store.set("status", false);
    BrowserWindow.getFocusedWindow().close();
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.reload();
    });
  });
  //* Quest Response
  ipcMain.on("questResponse", (e, data) => {
    if (!data.result) {
      const { api_key, from_mail } = store.get("settings");
      const selected = store
        .get("Profiles")
        .find((item) => item.id === store.get("selectedProfileId"));
      if (data.openerPic === true) {
        NodeWebcam.capture("test_picture", opts, function (err, data) {
          if (err) {
            console.log(err);
            const notification = new Notification({
              title: "Error",
              body: err,
            });
          } else {
            sgMail.setApiKey(api_key);
            msg.from = from_mail;
            msg.to = selected.mail;
            msg.subject = "Notification App";
            msg.text = `Bilgisayariniz ${new Date()} tarihinde fotograftaki sahıs tarafindan acildi.`;
            msg.html = `<div><img src=${data} ></div>`;
            console.log(msg)
            sgMail
              .send(msg)
              .then((e) => {
                console.log(e);
              })
              .catch((error) => {
                console.log(error);
                if (error.response) {
                  console.error(error.response.body);
                }
              });
          }
        });
      } else {
        sgMail.setApiKey(api_key);
        msg.from = from_mail;
        msg.to = selected.mail;
        msg.subject = "Notification App";
        msg.text = `Bilgisayarınızı ${new Date()} tarihinde açıldı.`;
        msg.html = "";
        sgMail
          .send(msg)
          .then((e) => {
            console.log(e);
          })
          .catch((error) => {
            console.log(error);
            if (error.response) {
              console.error(error.response.body);
            }
            const notification = new Notification({
              title: "Error",
              body: error,
            });
          });
      }
    }
    BrowserWindow.getFocusedWindow().close();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows()().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  tray = new Tray(path.join(__dirname, "icon/icon.png"));
  tray.setContextMenu(contextMenu);
});

const exampleUser = {
  name: "example",
  mail: "example@gmail.com",
  openerPic: false,
  QuestCheck: false,
  Quest: "",
  QuestAnswer: "",
};
