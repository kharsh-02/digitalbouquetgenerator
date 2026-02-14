// Store selected flowers
let bouquet = [];

// DOM elements
const flowerType = document.getElementById('flower-type');
const flowerColor = document.getElementById('flower-color');
const addBtn = document.getElementById('add-flower');
const flowerList = document.getElementById('flower-list');
const messageInput = document.getElementById('message');
const createBtn = document.getElementById('create-bouquet');
const resultDiv = document.getElementById('result-link');
const shareLink = document.getElementById('share-link');
const copyBtn = document.getElementById('copy-link');

// Add flower to bouquet
addBtn.addEventListener('click', () => {
    const type = flowerType.options[flowerType.selectedIndex].text; // emoji
    const color = flowerColor.value;
    // Store flower object
    bouquet.push({ type, color });
    renderBouquet();
});

// Render bouquet preview
function renderBouquet() {
    flowerList.innerHTML = '';
    bouquet.forEach((flower, index) => {
        const flowerDiv = document.createElement('div');
        flowerDiv.className = 'flower-item';
        flowerDiv.style.color = flower.color;
        flowerDiv.textContent = flower.type;
        flowerDiv.setAttribute('data-index', index);
        // Optional: add remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✖';
        removeBtn.style.fontSize = '0.8rem';
        removeBtn.style.padding = '2px 6px';
        removeBtn.style.marginLeft = '5px';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            bouquet.splice(index, 1);
            renderBouquet();
        });
        flowerDiv.appendChild(removeBtn);
        flowerList.appendChild(flowerDiv);
    });
}

// Create bouquet (POST to API)
createBtn.addEventListener('click', async () => {
    const message = messageInput.value.trim() || 'For you 💕';
    if (bouquet.length === 0) {
        alert('Add at least one flower!');
        return;
    }

    try {
        const response = await fetch('/api/create-bouquet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                flowers: bouquet,
                message: message
            })
        });

        if (!response.ok) throw new Error('Failed to create bouquet');

        const data = await response.json();
        const link = `${window.location.origin}/bouquet.html?id=${data.id}`;
        shareLink.value = link;
        resultDiv.classList.remove('hidden');
    } catch (error) {
        alert('Something went wrong. Please try again.');
        console.error(error);
    }
});

// Copy link to clipboard
copyBtn.addEventListener('click', () => {
    shareLink.select();
    document.execCommand('copy');
    alert('Link copied!');
});