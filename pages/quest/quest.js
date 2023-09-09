window.addEventListener("DOMContentLoaded",async()=>{
    const ActiveUser = await window.bridge.activeUserDetails()
    document.querySelector("label").innerText = ActiveUser.Quest
    const form = document.getElementById("form")

    form.addEventListener("submit",async()=>{
        const userAnswer = document.getElementById("Quest").value
        await window.bridge.questResponse({...ActiveUser, result:ActiveUser.QuestAnswer === userAnswer})
    })
})