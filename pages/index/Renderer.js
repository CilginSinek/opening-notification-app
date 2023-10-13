window.addEventListener("DOMContentLoaded", async () => {
  //* fetch Datas
  const profiles = await window.bridge.profiles();
  const ActiveUserId = await window.bridge.activeUser();
  const status = await window.bridge.status();
  const Settings = await window.bridge.getSettings();

  //* if haven't settings show settings button
  if (Settings === undefined || Settings.mail === "" || Settings.pass === "") {
    const upper = document.querySelector(".upperContainer");
    const button = document.createElement("button");
    button.onclick = async () => {
      await window.bridge.openSystemSettings();
    };
    button.innerText = "Set System Settings";
    button.className = "btn systemsettings";
    upper.appendChild(button);
  }

  //* Loading Old Profiles
  LoadProfiles(profiles, ActiveUserId);
 
  //* status
  const startButton = document.querySelector(".bigCircle");
  StartButtonChange(status);

  //* start process
  startButton.addEventListener("click", async (e) => {
    const thisStatus = await window.bridge.status();
    if (!thisStatus) {
      //! starting
      if (
        profiles.length > 0 &&
        document.querySelector("select").value &&
        Settings !== undefined &&
        Settings.mail !== "" &&
        Settings.pass !== ""
      ) {
        console.log(document.querySelector("select").value);
        await window.bridge.changeStatus(!thisStatus);
        StartButtonChange(!thisStatus);
      }
    } else {
      // !stoping
      await window.bridge.changeStatus(!thisStatus);
      StartButtonChange(!thisStatus);
    }
  });
});

function LoadProfiles(profiles, selected) {
  const profileBody = document.querySelector(".profiles-body");

  if (profiles) {
    //* select area
    const select = document.createElement("select");
    select.onchange = async (e) => {
      await window.bridge.changeActive(e.target.value);
    };

    profileBody.appendChild(select);

    profiles.map((item) => {
      const option = document.createElement("option");

      option.innerText = item.name;
      option.setAttribute("id", item.id);
      option.value = item.id;
      select.appendChild(option);
    });
    select.value = selected ? selected : "";

    //*Edit Button

    const button = document.createElement("button");
    button.className = "btn edit";
    profileBody.appendChild(button);
    button.innerText = "Edit";

    button.onclick = async function () {
      await window.bridge.openSettings();
    };
  } else {
    const AddButton = document.createElement("button");
    AddButton.className = "btn AddProfileButton";
    AddButton.innerText = "Create New Profile";
    profileBody.appendChild(AddButton);
    AddButton.onclick = async () => {
      console.log("settings");
      await window.bridge.openSettings();
    };
  }
}
function StartButtonChange(status) {
  if (status) {
    document.querySelector(".bigCircle").style.backgroundColor = "green";
    document.querySelector(".circle").style.backgroundColor = "green";
    document.querySelector(".cubuk").style.borderColor = "green";
  } else {
    document.querySelector(".bigCircle").style.backgroundColor = "red";
    document.querySelector(".circle").style.backgroundColor = "red";
    document.querySelector(".cubuk").style.borderColor = "red";
  }
}
