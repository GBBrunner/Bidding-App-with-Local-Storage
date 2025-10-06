
let maxBid = 0;
let display = "";
let bidHistory = [];

const bidHistoryDiv = document.getElementById("bidHistory");
const maxBidderDiv = document.getElementById("maxBidder");

// Load saved data on page load
window.onload = function () {
    const storedBidHistory = localStorage.getItem("bidHistory");
    const storedMaxBid = localStorage.getItem("maxBid");

    if (storedBidHistory) {
        bidHistory = JSON.parse(storedBidHistory);
    }
    if (storedMaxBid) {
        maxBid = parseFloat(storedMaxBid);
    }

    renderBids();
};

function submitBid() {
    const fullName = document.getElementById("fullName").value;
    const bidInput = parseFloat(document.getElementById("bidInput").value);

    if (!(bidInput > maxBid)) {
        alert("Your bid must be higher than the maximum bid.");
        return;
    }

    maxBid = bidInput;
    bidHistory.unshift({name: fullName, bid: bidInput, time: new Date().toLocaleString()});

    // Save to localStorage
    localStorage.setItem("bidHistory", JSON.stringify(bidHistory));
    localStorage.setItem("maxBid", maxBid);

    renderBids();
}

function renderBids() {
    bidHistoryDiv.innerHTML = "<p class='align-self-start fw-bold'>Bid History</p>";

    bidHistory.forEach(entry => {
        const p = document.createElement("p");
        display = `${entry.name}: $${entry.bid} (${entry.time})`;
        p.textContent = display;
        bidHistoryDiv.appendChild(p);
    });

    if (bidHistory.length > 0) {
        const latest = bidHistory[0];
        maxBidderDiv.innerHTML = `${latest.name} with $${latest.bid} on ${latest.time}`;
    } else {
        maxBidderDiv.innerHTML = "No bids yet.";
    }
}
function clearBids() {
    bidHistory = [];
    maxBid = 0;
    localStorage.removeItem("bidHistory");
    localStorage.removeItem("maxBid");
    renderBids();
}
