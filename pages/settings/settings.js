document.addEventListener("DOMContentLoaded",async ()=>{
    const myform = document.getElementById("settingsForm");
    const datas = await window.bridge.getSettings();

    if(datas){
        document.getElementById("service_id").value = datas.service_id;
        document.getElementById("template_id").value =datas.template_id;
        document.getElementById("public_id").value = datas.public_id;
    }

    myform.addEventListener("submit",async ()=>{
        const service_id = document.getElementById("service_id"),
            template_id = document.getElementById("template_id"),
            public_id = document.getElementById("public_id");
        const settingsData = { service_id, template_id, public_id }

        //* send settings to api 
        await window.bridge.setSettings(settingsData);
    })
})