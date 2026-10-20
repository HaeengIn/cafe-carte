const profiles = document.querySelectorAll(".members-list a.profile");
const memberName = document.getElementById("memberName");

profiles.forEach((profile) => {
    profile.addEventListener("mouseenter", () => {
        memberName.textContent = profile.dataset.name;
        memberName.className = `member-name ${profile.dataset.en}`;
    });

    profile.addEventListener("mouseleave", () => {
        memberName.textContent = "";
        memberName.className = "member-name";
    });
});