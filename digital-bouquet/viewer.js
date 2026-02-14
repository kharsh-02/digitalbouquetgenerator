// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const flowersDiv = document.getElementById('flowers');
const messageP = document.getElementById('display-message');
const errorDiv = document.getElementById('error');
const bouquetDisplay = document.getElementById('bouquet-display');

async function loadBouquet() {
    if (!id) {
        showError();
        return;
    }

    try {
        const response = await fetch(`/api/get-bouquet?id=${id}`);
        if (!response.ok) throw new Error('Not found');

        const data = await response.json();

        // Display flowers
        flowersDiv.innerHTML = '';
        data.flowers.forEach(flower => {
            const span = document.createElement('span');
            span.textContent = flower.type;
            span.style.color = flower.color;
            span.style.fontSize = '3rem';
            span.style.margin = '0 5px';
            flowersDiv.appendChild(span);
        });

        messageP.textContent = data.message;
    } catch (error) {
        showError();
    }
}

function showError() {
    bouquetDisplay.classList.add('hidden');
    errorDiv.classList.remove('hidden');
}

loadBouquet();