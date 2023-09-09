document.addEventListener("DOMContentLoaded", async () => {
  const myform = document.getElementById("settingsForm");
  const datas = await window.bridge.getSettings();

  if (datas !== undefined) {
    document.getElementById("api_key").value = datas.api_key;
    document.getElementById("from_mail").value = datas.from_mail;
  }

  myform.addEventListener("submit", async (e) => {
    e.preventDefault();
    const api_key = document.getElementById("api_key").value,
      from_mail = document.getElementById("from_mail").value;
    const settingsData = { api_key, from_mail };

    //* send settings to api
    await window.bridge.setSettings(settingsData);
  });
});
