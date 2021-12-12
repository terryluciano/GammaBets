const viewBackground = document.getElementById("popup-menu-background");
const allViews = document.getElementById("all-cf-views");
const listingArea = document.getElementById("coinflip-listing-area");

const winnerBlack = ["/static/images/coins/endblack1.gif", "/static/images/coins/endblack2.gif", "/static/images/coins/endblack3.gif", "/static/images/coins/endblack4.gif"]
const winnerRed = ["/static/images/coins/endred1.gif", "/static/images/coins/endred2.gif", "/static/images/coins/endred3.gif", "/static/images/coins/endred4.gif"];

viewBackground.addEventListener("click", (event) => {
    viewBackground.style.display = "none";

    checkForOpenView();
});

function checkForOpenView() {

    let getMenus = allViews.querySelectorAll(".view-menu");

    for (let i = 0; i < getMenus.length; i++) {
        if (getMenus[i].style.display == "") {
            getMenus[i].style.display = "none";
        }
    }
}

export async function updateTimer(game) {
    document
        .querySelector(`[data-view-id="${game.gameID}"]`)
        .getElementsByClassName(
            "view-middle-section"
        )[0].firstElementChild.textContent =
        "Waiting for Player... " + game.timer;
}

// remove join butotn on listing and view menu
export async function removeJoinButton(game) {
    let targetListing = document
        .getElementById(game.gameID)
        .querySelector(".join-button");

    if (targetListing.style.display != "none") {
        targetListing.style.display = "none";
    }
}

// run when second player cancels trade on coinflip
export async function tradeCanceled(game) {
    // show join button on listing
    let joinButton = document.getElementById(game.gameID).querySelector(".join-button");

    joinButton.style.display = "";

    // reset view menu
    let viewMenu = document.querySelector(`[data-view-id="${game.gameID}"]`);

    // reset timer
    let timer = viewMenu.querySelector(".view-coin-seciton-p");

    timer.textContent = "Waiting for Player...";

    let playerTwoContainer = viewMenu.querySelector(".player-two-section")

    // reset Picture, name, and value
    if(game.playerOneSide == "red") {

        let picture = playerTwoContainer.querySelector(".black-player-profile-picture");
        picture.src = "/static/images/user/defaultProfile.png"

        playerTwoContainer.querySelector(".view-player-name").textContent = "Waiting..."
    }

    else {
        let picture = playerTwoContainer.querySelector(".red-player-profile-picture");
		picture.src = "/static/images/user/defaultProfile.png";

        playerTwoContainer.querySelector(".view-player-name").textContent = "Waiting...";
    }
}

export async function playerJoined(gameID, pTwoSide, playerTwoPic, playerTwoName) {

    let viewMenu = document.querySelector(`[data-view-id="${gameID}"]`);
    let findContainer = viewMenu.querySelector(".player-two-section");

    // if red
    if (pTwoSide == "red") {

        // red player
        findContainer.querySelector(".red-player-profile-picture").src = playerTwoPic;

    }
    
    // if black
    else {

        // black player
        findContainer.querySelector(".black-player-profile-picture").src = playerTwoPic;
    }

    findContainer.querySelector(".view-player-name").textContent = playerTwoName;
}

// run when player 2 accepts the coinflip trade
export async function playerTwoAcceptedTrade(game) {

    let viewMenu = document.querySelector(`[data-view-id="${gameID}"]`);

    // checks if it was already rendered
    if (viewMenu.querySelector(".view-both-player-skins").querySelector(".player-two-section").hasAttribute("data-waiting") == false) {
        // change the player 2 total value
        let pTwoTotal;
        game.playerTwoSkinValues.forEach(val => {
            pTwoTotal += val;
        })

        pTwoTotal = (pTwoTotal / 100).toFixed(2)

        viewMenu.querySelector(".player-two-section").querySelector(".view-player-value").textContent = "$" + pTwoTotal

        let classSlot;

        if (game.playerTwoSide == "red") {
            classSlot = ".red-player-skin-slot";
        }

        else {
            classSlot = ".black-player-skin-slot";
        }

        let playerSkinsSide = viewMenu.querySelector(".view-both-player-skins").querySelector(".player-two-section");

        for (let i = 0; i < game.playerTwoSkins.length; i++) {
            let slot = document.createElement("div");
            slot.className = classSlot;

            let slotSkinImg = document.createElement("img");
            slotSkinImg.src = game.playerTwoSkinPictures[i];
            slotSkinImg.alt = "N/A";
            slotSkinImg.className = "view-slot-img";

            let slotSkinValue = document.createElement("p");
            slotSkinValue.textContent =
                "$" + (game.playerTwoSkinValues[i] / 100).toFixed(2);
            slotSkinValue.className = "view-slot-value";

            slot.appendChild(slotSkinImg);
            slot.appendChild(slotSkinValue);

            playerSkinsSide.appendChild(slot);
        }

        playerSkinsSide.setAttribute("data-waiting", true)
    }
}

export async function removeGameLisiting(game) {

    if (listingArea.contains(document.getElementById(`${game.gameID}`))) {
        let node = document.getElementById(`${game.gameID}`);
        console.log(node);

        node.parentElement.removeChild(node);
    }

}

export async function showAnimationAndWinner(game) {

    // get the view menu
    let viewMenu = document.querySelector(`[data-view-id="${game.gameID}"]`);

    // get middle container
    let coinContainer = viewMenu.querySelector(".view-coin-section");
    coinContainer.innerHTML = "";

    // create animation gif container
    let animationContainer = document.createElement("img");
    animationContainer.className = "coin-animation"

    let winnerSide;
    let srcGif;

    if (game.winner == game.playerOneId) {
        // should return either red or black
        winnerSide = game.playerOneSide;

    }

    else {

    }

    if (winnerSide == 'red') {
        srcGif = winnerRed[Math.floor(Math.random()*winnerRed.length)];
    }

    else {
        srcGif = winnerBlack[Math.floor(Math.random()*winnerBlack.length)];
    }

    animationContainer.src = srcGif;

    coinContainer.appendChild(animationContainer);

}
