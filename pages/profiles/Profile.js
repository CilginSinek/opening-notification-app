window.addEventListener("DOMContentLoaded", async () => {
  const profiles = await window.bridge.profiles();
  const form = document.getElementById("form");
  const QuestCheck = document.getElementById("QuestCheck");
  const CreateButton = document.getElementById("create");
  const DeleteButton = document.getElementById("delete");
  let checkValue;

  CreateButton.onclick = async () => {
    document.querySelector("select").remove()
    await window.bridge.createUser();
    LoadProfiles(
      await window.bridge.profiles(),
      await window.bridge.activeUser()
    );
    const ActiveUserObj = await window.bridge.activeUserDetails();
    reactiveForm(ActiveUserObj, checkValue);
  };

  DeleteButton.onclick = async () => {
    const profiles = await window.bridge.profiles();
    if (profiles.length > 1) {
      document.querySelector("select").remove()
      await window.bridge.deleteUser();
      LoadProfiles(
        await window.bridge.profiles(),
        await window.bridge.activeUser()
      );
      const ActiveUserObj = await window.bridge.activeUserDetails();
      reactiveForm(ActiveUserObj, checkValue);
    }
  };

  QuestCheck.addEventListener("click", (e) => {
    if (!checkValue) {
      document.getElementById("Quest").setAttribute("required", "");
      document.getElementById("QuestAnswer").setAttribute("required", "");

      document.getElementById("QuestDiv").style.display = "flex";
      document.getElementById("QuestAnswerDiv").style.display = "flex";
      checkValue = !checkValue;
    } else {
      document.getElementById("Quest").removeAttribute("required");
      document.getElementById("QuestAnswer").removeAttribute("required");

      document.getElementById("QuestDiv").style.display = "none";
      document.getElementById("QuestAnswerDiv").style.display = "none";
      checkValue = !checkValue;
    }
  });

  form.addEventListener("submit", async (e) => {
    const id = await window.bridge.activeUser();
    const formdata = getUserObject(id);
    console.log(formdata);
    await window.bridge.setUserSettings(formdata);
  });
  if (profiles) {
    LoadProfiles(profiles, await window.bridge.activeUser());
    const ActiveUserObj = await window.bridge.activeUserDetails();
    reactiveForm(ActiveUserObj, checkValue);
  } else {
    await window.bridge.createUser();
    LoadProfiles(await window.bridge.profiles(), await window.bridge.activeUser());
    const ActiveUserObj = await window.bridge.activeUserDetails();
    reactiveForm(ActiveUserObj, checkValue);
  }
});

function LoadProfiles(profiles, selected) {
  //* Konteynir
  const profileBody = document.querySelector(".profiles-body");

  //* Profile varsa
  if (profiles) {
    const select = document.createElement("select");
    profileBody.appendChild(select);

    //* Eger yeni element secilirse formu ona gore refresh et
    select.onchange = async(e)=>{
      //? Active User idsi degisti, Form Degerleri duzenlendi
      await window.bridge.changeActive(e.target.value);
      const selectedObj = profiles.filter((item) => item.id === e.target.value);
      reactiveForm(selectedObj[0]);
    }
    //* listemi olusturuyorum
    profiles.map((item) => {
      const option = document.createElement("option");

      option.innerText = item.name;
      option.value = item.id;
      select.appendChild(option);
    });

    //* Baslangicta Selected Useri duzgun vermesi icin
    //* append ettikten ve optionlari olusturduktan sonra deger atiyorum
    select.value = selected
  }
}

function reactiveForm(ActiveUser, checkValue) {
  document.getElementById("name").value = ActiveUser.name;
  document.getElementById("mail").value = ActiveUser.mail;
  document.getElementById("openerPic").checked = ActiveUser.openerPic ===true;
  document.getElementById("QuestCheck").checked = ActiveUser.QuestCheck ===true;
  document.getElementById("Quest").value = ActiveUser.Quest;
  document.getElementById("QuestAnswer").value = ActiveUser.QuestAnswer || "";
  if (ActiveUser.QuestCheck === "true") {
    document.getElementById("Quest").setAttribute("required", "");
    document.getElementById("QuestAnswer").setAttribute("required", "");

    document.getElementById("QuestAnswer").style.display = "flex";
    document.getElementById("Quest").style.display = "flex";
    checkValue = true;
  } else {
    document.getElementById("Quest").removeAttribute("required");
    document.getElementById("QuestAnswer").removeAttribute("required");

    document.getElementById("QuestAnswerDiv").style.display = "none";
    document.getElementById("QuestDiv").style.display = "none";
    checkValue = false;
  }
}
function getUserObject(id) {
  return {
    id: id,
    name: document.getElementById("name").value,
    mail: document.getElementById("mail").value,
    openerPic: document.getElementById("openerPic").checked,
    QuestCheck: document.getElementById("QuestCheck").checked,
    Quest: document.getElementById("Quest").value,
    QuestAnswer: document.getElementById("QuestAnswer").value,
  };
}
