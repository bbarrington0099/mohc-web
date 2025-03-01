import { ContactPanel } from "../../classes/html_elements/panels/ContactPanel.js"

const frameContainer = document.getElementById("connect-frame-container");

const panels = [
    new ContactPanel(
        frameContainer,
        "test",
        "mohc",
        "www.platform",
        "badimageurl.png",
        "follow us"
    )
]

const loadPanels = () => {
    panels.forEach(panel => {
        console.log(panel.generateContent());
        panel.injectPanel();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadPanels();
});