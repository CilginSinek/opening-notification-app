document.addEventListener("DOMContentLoaded", async () => {
  const myform = document.getElementById("settingsForm");
  const datas = await window.bridge.getSettings();
  console.log(datas)

  if (datas !== undefined) {
    document.getElementById("Mail").value = datas.mail;
    document.getElementById("App_pass").value = datas.pass;
  }

  myform.addEventListener("submit", async (e) => {
    e.preventDefault();
    const mail = document.getElementById("Mail").value,
      pass = document.getElementById("App_pass").value;
    const settingsData = { mail, pass };

    //* send settings to api
    await window.bridge.setSettings(settingsData);
  });
});
