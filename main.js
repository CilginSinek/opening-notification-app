const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Tray,
  Notification,
} = require("electron");
const path = require("path");
const {
  getProfile,
  getStatus,
  getSelectedId,
  getActiveUserDetails,
  getSettings,
} = require("./controllers/GetFuncs");
const {
  setStatus,
  setActiveUser,
  setUser,
  setSettings,
} = require("./controllers/PatchFuncs");
const { CreateUser, DeleteUser } = require("./controllers/AddDeleteFuncs");
const { snapPhoto, SendMail } = require("./controllers/util");

let tray = null;

let verify = false;

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
    autoHideMenuBar: true,
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
    autoHideMenuBar: true,
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
  const questWindow = new BrowserWindow({
    icon: path.join(__dirname, "icon/icon.png"),
    width: 465,
    height: 190,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contentSecurityPolicy: "script-src 'self' 'unsafe-inline';",
    },
    autoHideMenuBar: true,
  });
  questWindow.on("closed", async () => {
    if (verify) {
      const activeUser = getActiveUserDetails();
      if (activeUser.openerPic === true) {
        snapPhoto();
      } else {
        await SendMail().catch((error) => {
          const notification = new Notification({
            title: "Error",
            body: error,
          });
          if (error.response) {
            console.error(error.response.body);
          }
        });
      }
    }
  });

  questWindow.loadFile(path.join(__dirname, "pages/quest/quest.html"));
};
//!start Func
const startFunc = async () => {
  if (getStatus()) {
    const selected = getActiveUserDetails();
    if (selected.QuestCheck === true) {
      verify = true;
      createQuestWindow();
    } else {
      if (selected.openerPic === true) {
        snapPhoto();
      } else {
        await SendMail().catch((error) => {
          const notification = new Notification({
            title: "Error",
            body: error,
          });
          if (error.response) {
            console.error(error.response.body);
          }
        });
      }
      tray = new Tray(path.join(__dirname, "icon/icon.png"));
      tray.setContextMenu(contextMenu);
    }
  } else {
    createWindow();
  }
};

//? Start with Windows Open
app.setLoginItemSettings({
  openAtLogin: true,
});

app.whenReady().then(() => {
  startFunc();

  ////! Funcs
  //* Get Profile List
  ipcMain.handle("Profiles", getProfile);
  //* Get status
  ipcMain.handle("status", getStatus);
  //* Get Active User
  ipcMain.handle("activeUser", getSelectedId);
  //* Get Active User Details
  ipcMain.handle("activeUserDetails", getActiveUserDetails);
  //* Get Settings
  ipcMain.handle("getSettings", getSettings);

  //* Change Status
  ipcMain.on("changeStatus", setStatus);
  //* Change Active User
  ipcMain.on("activeUser", setActiveUser);
  //* Change User Settings
  ipcMain.on("setUser", setUser);
  //* Change Settings
  ipcMain.on("setSettings", setSettings);

  //* Create New User
  ipcMain.on("CreateUser", CreateUser);
  //* Delete User
  ipcMain.on("DeleteUser", DeleteUser);

  //* Open Profile Settings
  ipcMain.on("openSettings", () => createProfilesWindow());
  //* Open System Settings
  ipcMain.on("openSystemSettings", () => createSettingsWindow());
  //* Quest Response
  ipcMain.on("questResponse", async (e, data) => {
    if (!data.result) {
      if (data.openerPic === true) {
        snapPhoto();
      } else {
        await SendMail().catch((error) => {
          const notification = new Notification({
            title: "Error",
            body: error,
          });
          if (error.response) {
            console.error(error.response.body);
          }
        });
      }
      verify = false;
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
