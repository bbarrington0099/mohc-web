import { ContentPanel } from "./ContentPanel.js";

export class ContactPanel extends ContentPanel {
	static platformPanelCount = 0;

	#platformName;
	#platformHandle;
	#platformLink;
	#platformLogoPath;
	#platformInvitationText;
	#platformPanelNumber;

	constructor(
		parentNode,
		platformName,
		platformHandle,
		platformLink,
		platformLogoPath,
		platformInvitationText
	) {
		super(parentNode, "contact-panel-container");
		this.#platformName = platformName;
		this.#platformHandle = platformHandle;
		this.#platformLink = platformLink;
		this.#platformLogoPath = platformLogoPath;
		this.#platformInvitationText = platformInvitationText;
		this.#platformPanelNumber = ContactPanel.platformPanelCount++;
	}

	// OverRide
	generatePanel = () => {
		return `
            <div class="contentPanel, ${
				this.#platformPanelNumber % 2 == 0 ? "even-panel" : "odd-panel"
			}">
                <div class="panelHeading">${this.#platformName}</div>
                <div class="contentContainer">${this.generateContent()}</div>"
            </div>
        `;
	};

	generateContent = () => {
		return `
            <div class="textImagePanel">
                <div class="platformInformation">
                    <div class="platformHandle"><a href="${this.#platformLink}">${this.#platformHandle}</a></div>
                    <div class="platformInvitation">${
						this.#platformInvitationText
					}</div>
                </div>
                <div class="platformLogo"><img src="${
					this.#platformLogoPath
				}" alt="${this.#platformName} Logo"></div>
            </div>`;
	};
}
