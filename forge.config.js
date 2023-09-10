module.exports = {
    packagerConfig: {
      name: 'Opening-Notification-App',
      platform: 'win32',
      arch: 'x64',
      icon: './icon/icon.ico',
    },
    makers: [
      {
        name: '@electron-forge/maker-squirrel',
        config: {
          name: 'Opening-Notification-App',
          setupIcon: './icon/icon.ico',
          authors: 'CilginSinek',
          description:'Electron application that notifies you that the computer is turned on'
        },
      },
      {
        name: '@electron-forge/maker-zip',
        platforms: ['win32'],
      },
    ],
  };