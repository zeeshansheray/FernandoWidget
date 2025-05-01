
let betAmount = "";
let betType = "";
let boxChecked = false;
let selectedRace = 0;
let numberOfColumns = 0;
const colorPairs = [
{ backgroundColor: "#FF0000", color: "#FFFFFF" },
{ backgroundColor: "#FFFFFF", color: "#000000" },
{ backgroundColor: "#0000FF", color: "#FFFFFF" },
{ backgroundColor: "#FFD700", color: "#000000" },
{ backgroundColor: "#008000", color: "#FFFFFF" },
{ backgroundColor: "#000000", color: "#FFD700" },
{ backgroundColor: "#FFA500", color: "#000000" },
{ backgroundColor: "#FF69B4", color: "#000000" },
{ backgroundColor: "#40E0D0", color: "#000000" },
{ backgroundColor: "#800080", color: "#FFFFFF" },
{ backgroundColor: "#808080", color: "#FF0000" },
{ backgroundColor: "#32CD32", color: "#000000" },
{ backgroundColor: "#8B4513", color: "#FFFFFF" },
{ backgroundColor: "#800000", color: "#FFD700" },
{ backgroundColor: "#C3B091", color: "#000000" },
{ backgroundColor: "#87CEEB", color: "#FF0000" },
{ backgroundColor: "#000080", color: "#FFFFFF" },
{ backgroundColor: "#228B22", color: "#FFD700" },
{ backgroundColor: "#191970", color: "#FF0000" },
{ backgroundColor: "#FF00FF", color: "#FFD700" },
{ backgroundColor: "#9370DB", color: "#000080" },
    { color: "#16A085", backgroundColor: "#E74C3C" },
    { color: "#F1C40F", backgroundColor: "#34495E" },
    { color: "#2980B9", backgroundColor: "#F1C40F" },
];

function toggleRaceInput() {
    betType = document.getElementById("betType").value;
    updateBoxCheckboxState();
}

function onChangeBetAmount() {
    betAmount = document.getElementById("betAmount").value;
}

function updateHorseSelection() {
    const horseSelectionDiv = document.getElementById("horseSelection");
    const horseList = document.getElementById("horseList");
    let isRace = false;

    if (!betType || !betAmount) {
        horseSelectionDiv.style.display = "none";
        return;
    }

    // Determine the number of columns based on the selected bet type
    switch (betType) {
        case "Exacta":
            numberOfColumns = 2;
            break;
        case "Daily Double":
            numberOfColumns = 2;
            isRace = true;
            break;
        case "Trifecta":
            numberOfColumns = 3;
            break;
        case "Pick 3":
            numberOfColumns = 3;
            isRace = true;
            break;
        case "Superfecta":
            numberOfColumns = 4;
            break;
        case "Pick 4":
            numberOfColumns = 4;
            isRace = true;
            break;
        case "Pentafecta":
            numberOfColumns = 5;
            break;
        case "Pick 5":
            numberOfColumns = 5;
            isRace = true;
            break;
        case "Pick 6":
            numberOfColumns = 6;
            isRace = true;
            break;
        default:
            numberOfColumns = 0;
    }

    // Clear any existing horse selections
    horseList.innerHTML = "";

    // Show or hide the horse selection section based on the number of columns
    if (numberOfColumns > 0) {
        horseSelectionDiv.style.display = "block";

        // Generate columns with 24 horse options each
        for (let i = 1; i <= numberOfColumns; i++) {
            const columnDiv = document.createElement("li");
            columnDiv.classList.add("col-md-2", "single-column", "col-12");

            // Create accordion for each race
            columnDiv.innerHTML = `
        <div>
                <div class="d-flex align-items-center space-between " style="padding-left: 4px;">
                    <div>
                        <h2 class="race-titles" id="heading${i}">
                            Race ${i}
                        </h2>
                        <p class="picksList" id="picksList${i}">Please select your picks </p>
                    </div>
                    <button type="button" data-bs-toggle="modal" onclick="setSelectedRaceFunc(${i})" data-bs-target="#exampleModal" data-race-index="${i}" class="editPicks" id='editPicks'>Edit Picks</button>
                </div>
                <div class="input-container">
                    ${generateHorseOptions(i, numberOfColumns)}
                </div>
        </div>
    `;
            horseList.appendChild(columnDiv);
        }
    } else {
        horseSelectionDiv.style.display = "none";
    }

    // Event listeners for checkbox changes
    const checkboxes = document.querySelectorAll('.cloth-checkbox input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const clothCheckbox = this.closest(".cloth-checkbox");
            if (this.checked) {
                clothCheckbox.classList.add("checked");
            } else {
                clothCheckbox.classList.remove("checked");
            }
        });
    });
}


function setSelectedRaceFunc(race) {
    selectedRace = race;
}

function generateHorseOptions(raceIndex, totalRaces) {
    let horseOptionsHtml = "";
    for (let i = 1; i <= 24; i++) {
        console.log('i ', i)
        horseOptionsHtml += `
    <li class="middle">
        <div class="cloth-checkbox">
            <span class="serif program-number cloth-1" style="background-color: ${colorPairs[i-1]?.backgroundColor}; color: ${colorPairs[i-1]?.color};">
            ${i}
            </span>
            <input class="horseCheckbox" className="horseCheckbox" type="checkbox" value="${raceIndex}_${i}" onchange="calculateBetCost(${raceIndex}, ${i}, ${totalRaces});"> 
            <span class="checked"></span>
            </input>
        </div>
    </li>
  `;
    }
    return horseOptionsHtml;
}


function updateBoxCheckboxState() {
    console.log('hiii')
    const boxCheckbox = document.getElementById("box");
    const boxLabel = document.querySelector("label[for='box']");

    // Enable "Box" checkbox for Exacta, Trifecta, Superfecta, and Pentafecta
    if (["Exacta", "Trifecta", "Superfecta", "Pentafecta"].includes(betType)) {
        document.getElementById('checkboxBox').style.display = "block";  // Enable the checkbox
        boxCheckbox.disabled = false;  // Enable the checkbox
        boxLabel.style.color = ''; // Reset label color
    } else {
        boxCheckbox.disabled = true;  // Disable the checkbox
        boxCheckbox.checked = false;  // Uncheck the checkbox if disabled
        document.getElementById('checkboxBox').style.display = "none";  // Enable the checkbox
        boxLabel.style.color = 'gray'; // Optionally change the label color to gray
        boxChecked = false;
    }

    // Call to update the horse selection and the bet cost when the bet type changes
    updateHorseSelection();
}

// Call updateBoxCheckboxState when the page loads and when the bet type is selected
window.onload = function () {
    document.getElementById("betType").addEventListener("change", toggleRaceInput);
    updateBoxCheckboxState();  // Ensure the checkbox state is correctly set when the page loads
};

function onBoxChange() {
    boxChecked = document.getElementById("box").checked;
    // Perform any additional actions based on the checkbox status
    if (boxChecked) {
        document.getElementById('box').classList.add('checked');
        boxChecked = true;
    } else {
        document.getElementById('box').classList.remove('checked');
        boxChecked = false;
    }
}

window.onload = function () {
    document
        .getElementById("betType")
        .addEventListener("change", updateHorseSelection);
    document
        .getElementById("betAmount")
        .addEventListener("change", updateHorseSelection);


};

window.addEventListener("resize", function () {
    if (isMobile()) {
        console.log("Mobile view detected!");
    }
});

function isMobile() {
    return window.innerWidth <= 768;
}


document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("exampleModal");
    modal.addEventListener("show.bs.modal", function () {
        document.querySelectorAll('.editPicks').forEach(button => {
            button.addEventListener('click', function () {
                const raceIndex = parseInt(this.getAttribute("data-race-index"));
                const modalBody = document.querySelector("#exampleModal .modal-body");
                modalBody.setAttribute("data-race-index", raceIndex);
                generateModalHorseSelection();  // Generate horse options for this race
            });
        });
    });

    modal.addEventListener("hidden.bs.modal", function () {
        generateModalHorseSelection();
    });
});


function generateModalHorseSelection() {
const modalBody = document.querySelector("#exampleModal .modal-body");
modalBody.innerHTML = ""; // Clear previous content

const raceIndex = selectedRace;

let horseOptionsHtml = `
<div style="display: flex; gap: 20px;">
    <ul class="no-bullet col-6" style="padding-right: 12px !important;">`;

for (let i = 1; i <= 24; i++) {
const isSelected = selectedHorses[raceIndex] && selectedHorses[raceIndex].includes(i);
const checkedAttribute = isSelected ? 'checked' : '';

// Start a new column when reaching horse #13
if (i === 13) {
    horseOptionsHtml += `</ul><ul class="no-bullet col-6" style="padding-left: 12px !important;">`;
}

horseOptionsHtml += `
    <li class="col-12">
        <div class="cloth-checkbox">
            <span class="serif program-number cloth-1"
                  style="background-color: ${colorPairs[i-1]?.backgroundColor}; 
                         color: ${colorPairs[i-1]?.color};">
                ${i}
            </span>
            <input class="horseCheckbox" type="checkbox" value="${raceIndex}_${i}" ${checkedAttribute} 
                   onchange="onHorseSelect(${raceIndex}, ${i})">
            <span class="checked"></span>
        </div>
    </li>
`;
}

horseOptionsHtml += `</ul></div>`; // Close the last column and container div
modalBody.innerHTML = horseOptionsHtml;
}

function updateYourPicks(raceIndex ,horseNumber) {

    console.log('selectedHorses ', selectedHorses)
    for (let raceIndex in selectedHorses) {
        if (!boxChecked && (raceIndex == raceIndex)) {
        let yourPicksDiv = document.getElementById(`picksList${raceIndex}`);
        yourPicksDiv.innerHTML = ''; // Clear current picks
            let picksHtml = `<div class="race-picks"> `;
            selectedHorses[raceIndex].forEach(horseNumber => {
                picksHtml += ` ${horseNumber} `;
            });

            picksHtml += `</div>`;
            yourPicksDiv.innerHTML += picksHtml;
        }
        else {
            yourPicksDiv = document.getElementById(`picksList${raceIndex}`);
            yourPicksDiv.innerHTML = ''; // Cle
            console.log('zee s', raceIndex)
            let picksHtml = `<div class="race-picks"> `;
            selectedHorses[raceIndex].forEach(horseNumber => {
                picksHtml += ` ${horseNumber} `;
            });

            picksHtml += `</div>`;
            yourPicksDiv.innerHTML += picksHtml;
        }
        ///Start from hereeee!! when box is selected the below texxt is not updating the modal  
        //value is however updating!! 
    }
}

let selectedHorses = {};  // Object to store selected horses for each race



function onHorseSelect(raceIndex, horseNumber) {
    if (!selectedHorses[raceIndex]) {
        selectedHorses[raceIndex] = [];
    }

    const horseIndex = selectedHorses[raceIndex].indexOf(horseNumber);

    if (boxChecked) {
        for (let i = 1; i <= numberOfColumns; i++) {
            if (!selectedHorses[i]) {
                selectedHorses[i] = [];
            }

            if (horseIndex === -1) {
                // Select the horse for all races
                if (!selectedHorses[i].includes(horseNumber)) {
                    selectedHorses[i].push(horseNumber);
                }
            } else {
                // Deselect the horse for all races
                const index = selectedHorses[i].indexOf(horseNumber);
                if (index !== -1) {
                    selectedHorses[i].splice(index, 1);
                }
            }
        }
    } else {
        if (horseIndex === -1) {
            selectedHorses[raceIndex].push(horseNumber);
        } else {
            selectedHorses[raceIndex].splice(horseIndex, 1);
        }
    }

    updateYourPicks(raceIndex ,horseNumber);
    updateModalCheckboxes();
    calculateBetCost(raceIndex, horseNumber, numberOfColumns);
}

function updateModalCheckboxes() {
    document.querySelectorAll(".horseCheckbox").forEach((checkbox) => {
        const [raceIndex, horseNumber] = checkbox.value.split("_").map(Number);
        checkbox.checked = selectedHorses[raceIndex] && selectedHorses[raceIndex].includes(horseNumber);
    });
}


function calculateBetCost(raceIndex, horse, totalRaces) {
    let races = {};
    let totalCost = 0;
    let racesSelected = []
    let betType = document.getElementById('betType').value
    console.log('raceIndex ', raceIndex, "horse no : ", horse, "total race :", totalRaces);

    console.log('betType ', betType)
    let currentchecked = document.querySelectorAll(`input[value="${raceIndex}_${horse}"]`)[0].checked;

    console.log('currentchecked ', currentchecked)

    if (betType == "Exacta") {

        if (boxChecked) {
            for (let i = 1; i <= totalRaces; i++) {
                const inputElements = document.querySelectorAll(`input[value="${i}_${horse}"]`);
                if (currentchecked) {
                    console.log('inputElements ', inputElements)
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = true;
                        inputElements[0].parentNode.classList.add("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                }
                else {
                    console.log('inputElements ', inputElements)
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = false;
                        inputElements[0].parentNode.classList.remove("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                }
            }
        }

        const selectedHorses = document.querySelectorAll('input[className="horseCheckbox"]:checked');

        console.log('selectedHorses ', selectedHorses)
        selectedHorses.forEach((horse) => {
            const [raceIndex, horseNumber] = horse.value.split("_");
            if (!races[raceIndex]) {
                races[raceIndex] = new Set(); // Use a Set to ensure unique horse selections in each race
            }
            races[raceIndex].add(horseNumber);
        });

        // Filter out combinations where the same horse number appears in multiple races
        let uniqueCombinations = new Set();
        Object.values(races).forEach((horsesInRace) => {
            horsesInRace.forEach((horseNumber) => {
                // Check if the horse number already exists in another race
                let isUnique = true;
                for (let race in races) {
                    if (race !== Object.keys(races).find(key => races[key].has(horseNumber)) && races[race].has(horseNumber)) {
                        isUnique = false;
                        break;
                    }
                }

                if (isUnique) {
                    uniqueCombinations.add(horseNumber);
                }
            });
        });

        let combinationsAll = [];  // This will hold all the combinations

        // Generate all combinations of selected horses
        function generateCombinations(raceIndexes, currentCombination = [], index = 0) {
            if (index === raceIndexes.length) {
                combinationsAll.push([...currentCombination]);
                return;
            }

            let raceIndex = raceIndexes[index];
            races[raceIndex].forEach(horse => {
                currentCombination.push(horse);
                generateCombinations(raceIndexes, currentCombination, index + 1);
                currentCombination.pop();
            });
        }

        // Generate combinations for all selected races
        let raceIndexes = Object.keys(races);
        generateCombinations(raceIndexes);

        let filteredCombinations = [];
        let isBothRaceSelected = false;
        combinationsAll.forEach((combination) => {
            console.log('combination ', combination)
            if (combination?.length < 2) {
                isBothRaceSelected = false;
                return
            }
            if (combination[0] !== combination[1]) {
                filteredCombinations.push(combination);
                isBothRaceSelected = true;
            }
        })

        // Calculate total cost based on unique combinations
        totalCost = !isBothRaceSelected ? 0 : filteredCombinations.length * parseFloat(betAmount);
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `$${" " + totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    if (betType === "Trifecta") {

        if (boxChecked) {
            for (let i = 1; i <= totalRaces; i++) {
                const inputElements = document.querySelectorAll(`input[value="${i}_${horse}"]`);
                if (currentchecked) {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = true;
                        inputElements[0].parentNode.classList.add("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                } else {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = false;
                        inputElements[0].parentNode.classList.remove("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                }
            }
        }

        const selectedHorses = document.querySelectorAll('input[className="horseCheckbox"]:checked');
        const races = {}; // Use an object to track horse selections by race

        // Populate `races` with selected horses
        selectedHorses.forEach((horse) => {
            const [raceIndex, horseNumber] = horse.value.split("_");
            if (!races[raceIndex]) {
                races[raceIndex] = new Set(); // Ensure unique horse selections per race
            }
            races[raceIndex].add(horseNumber);
        });

        // Generate all unique combinations
        let combinationsAll = [];

        function generateUniqueCombinations(raceIndexes, currentCombination = [], index = 0) {
            if (index === raceIndexes.length) {
                // Check if the combination contains unique horses
                const uniqueHorses = new Set(currentCombination);
                if (uniqueHorses.size === currentCombination.length) {
                    combinationsAll.push([...currentCombination]);
                }
                return;
            }

            let raceIndex = raceIndexes[index];
            races[raceIndex].forEach(horse => {
                currentCombination.push(horse);
                generateUniqueCombinations(raceIndexes, currentCombination, index + 1);
                currentCombination.pop();
            });
        }

        let raceIndexes = Object.keys(races);
        generateUniqueCombinations(raceIndexes);

        // Filter combinations with at least two races selected
        let filteredCombinations = combinationsAll.filter(combination => combination.length >= 2);

        console.log('Filtered Unique Combinations:', filteredCombinations);

        // Calculate total cost
        let isBothRaceSelected = filteredCombinations.length > 0;
        totalCost = !isBothRaceSelected ? 0 : filteredCombinations.length * parseFloat(betAmount);

        // Display result
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `$${" " + totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    if (betType === "Superfecta") {

        if (boxChecked) {
            for (let i = 1; i <= totalRaces; i++) {
                const inputElements = document.querySelectorAll(`input[value="${i}_${horse}"]`);
                if (currentchecked) {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = true;
                        inputElements[0].parentNode.classList.add("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                } else {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = false;
                        inputElements[0].parentNode.classList.remove("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                }
            }
        }

        const selectedHorses = document.querySelectorAll('input[className="horseCheckbox"]:checked');
        const races = {}; // Use an object to track horse selections by race

        // Populate `races` with selected horses
        selectedHorses.forEach((horse) => {
            const [raceIndex, horseNumber] = horse.value.split("_");
            if (!races[raceIndex]) {
                races[raceIndex] = new Set(); // Ensure unique horse selections per race
            }
            races[raceIndex].add(horseNumber);
        });

        // Generate all unique combinations
        let combinationsAll = [];

        function generateUniqueCombinations(raceIndexes, currentCombination = [], index = 0) {
            if (index === raceIndexes.length) {
                // Check if the combination contains unique horses
                const uniqueHorses = new Set(currentCombination);
                if (uniqueHorses.size === currentCombination.length) {
                    combinationsAll.push([...currentCombination]);
                }
                return;
            }

            let raceIndex = raceIndexes[index];
            races[raceIndex].forEach(horse => {
                currentCombination.push(horse);
                generateUniqueCombinations(raceIndexes, currentCombination, index + 1);
                currentCombination.pop();
            });
        }

        let raceIndexes = Object.keys(races);
        generateUniqueCombinations(raceIndexes);

        // Filter combinations with at least two races selected
        let filteredCombinations = combinationsAll.filter(combination => combination.length >= 2);

        console.log('Filtered Unique Combinations:', filteredCombinations);

        // Calculate total cost
        let isBothRaceSelected = filteredCombinations.length > 0;
        totalCost = !isBothRaceSelected ? 0 : filteredCombinations.length * parseFloat(betAmount);

        // Display result
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `$${" " + totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    if (betType === "Pentafecta") {

        if (boxChecked) {
            for (let i = 1; i <= totalRaces; i++) {
                const inputElements = document.querySelectorAll(`input[value="${i}_${horse}"]`);
                if (currentchecked) {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = true;
                        inputElements[0].parentNode.classList.add("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                } else {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = false;
                        inputElements[0].parentNode.classList.remove("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                }
            }
        }

        const selectedHorses = document.querySelectorAll('input[className="horseCheckbox"]:checked');
        const races = {}; // Use an object to track horse selections by race

        // Populate `races` with selected horses
        selectedHorses.forEach((horse) => {
            const [raceIndex, horseNumber] = horse.value.split("_");
            if (!races[raceIndex]) {
                races[raceIndex] = new Set(); // Ensure unique horse selections per race
            }
            races[raceIndex].add(horseNumber);
        });

        // Generate all unique combinations
        let combinationsAll = [];

        function generateUniqueCombinations(raceIndexes, currentCombination = [], index = 0) {
            if (index === raceIndexes.length) {
                // Check if the combination contains unique horses
                const uniqueHorses = new Set(currentCombination);
                if (uniqueHorses.size === currentCombination.length) {
                    combinationsAll.push([...currentCombination]);
                }
                return;
            }

            let raceIndex = raceIndexes[index];
            races[raceIndex].forEach(horse => {
                currentCombination.push(horse);
                generateUniqueCombinations(raceIndexes, currentCombination, index + 1);
                currentCombination.pop();
            });
        }

        let raceIndexes = Object.keys(races);
        generateUniqueCombinations(raceIndexes);

        // Filter combinations with at least two races selected
        let filteredCombinations = combinationsAll.filter(combination => combination.length >= 2);

        console.log('Filtered Unique Combinations:', filteredCombinations);

        // Calculate total cost
        let isBothRaceSelected = filteredCombinations.length > 0;
        totalCost = !isBothRaceSelected ? 0 : filteredCombinations.length * parseFloat(betAmount);

        // Display result
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `$${" " + totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    if (betType === "Daily Double") {

        if (boxChecked) {
            for (let i = 1; i <= totalRaces; i++) {
                const inputElements = document.querySelectorAll(`input[value="${i}_${horse}"]`);
                if (currentchecked) {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = true;
                        inputElements[0].parentNode.classList.add("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                } else {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = false;
                        inputElements[0].parentNode.classList.remove("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                }
            }
        }

        const selectedHorses = document.querySelectorAll('input[className="horseCheckbox"]:checked');
        const races = {}; // Use an object to track horse selections by race

        // Populate `races` with selected horses
        selectedHorses.forEach((horse) => {
            const [raceIndex, horseNumber] = horse.value.split("_");
            if (!races[raceIndex]) {
                races[raceIndex] = new Set(); // Ensure unique horse selections per race
            }
            races[raceIndex].add(horseNumber);
        });

        // Ensure exactly two races are selected
        const raceIndexes = Object.keys(races).sort(); // Sort race indexes for consistent order
        if (raceIndexes.length !== 2) {
            console.warn("Daily Double requires exactly two races to be selected.");
            const resultElement = document.getElementById("result");
            resultElement.innerHTML = `$ 0.00`;
            return;
        }

        // Generate all unique combinations between the two races
        const [race1, race2] = raceIndexes;
        let combinationsAll = [];

        races[race1].forEach(horse1 => {
            races[race2].forEach(horse2 => {
                combinationsAll.push([horse1, horse2]);
            });
        });

        console.log('Filtered Unique Combinations:', combinationsAll);

        // Calculate total cost
        const totalCost = combinationsAll.length * parseFloat(betAmount);

        // Display result
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `$${" " + totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    if (betType === "Pick 3") {

        if (boxChecked) {
            for (let i = 1; i <= totalRaces; i++) {
                const inputElements = document.querySelectorAll(`input[value="${i}_${horse}"]`);
                if (currentchecked) {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = true;
                        inputElements[0].parentNode.classList.add("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                } else {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = false;
                        inputElements[0].parentNode.classList.remove("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                }
            }
        }

        const selectedHorses = document.querySelectorAll('input[className="horseCheckbox"]:checked');
        const races = {}; // Use an object to track horse selections by race

        // Populate `races` with selected horses
        selectedHorses.forEach((horse) => {
            const [raceIndex, horseNumber] = horse.value.split("_");
            if (!races[raceIndex]) {
                races[raceIndex] = new Set(); // Ensure unique horse selections per race
            }
            races[raceIndex].add(horseNumber);
        });

        // Ensure exactly three consecutive races are selected
        const raceIndexes = Object.keys(races).sort((a, b) => a - b); // Sort race indexes numerically
        if (raceIndexes.length !== 3 || (raceIndexes[2] - raceIndexes[0] !== 2)) {
            console.warn("Pick 3 requires exactly three consecutive races to be selected.");
            const resultElement = document.getElementById("result");
            resultElement.innerHTML = `$ 0.00`;
            return;
        }

        // Generate all unique combinations across the three races
        const [race1, race2, race3] = raceIndexes;
        let combinationsAll = [];

        races[race1].forEach(horse1 => {
            races[race2].forEach(horse2 => {
                races[race3].forEach(horse3 => {
                    combinationsAll.push([horse1, horse2, horse3]);
                });
            });
        });

        console.log('Filtered Unique Combinations:', combinationsAll);

        // Calculate total cost
        const totalCost = combinationsAll.length * parseFloat(betAmount);

        // Display result
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `$${" " + totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    if (betType === "Pick 4") {

        if (boxChecked) {
            for (let i = 1; i <= totalRaces; i++) {
                const inputElements = document.querySelectorAll(`input[value="${i}_${horse}"]`);
                if (currentchecked) {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = true;
                        inputElements[0].parentNode.classList.add("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                } else {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = false;
                        inputElements[0].parentNode.classList.remove("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                }
            }
        }

        const selectedHorses = document.querySelectorAll('input[className="horseCheckbox"]:checked');
        const races = {}; // Use an object to track horse selections by race

        // Populate `races` with selected horses
        selectedHorses.forEach((horse) => {
            const [raceIndex, horseNumber] = horse.value.split("_");
            if (!races[raceIndex]) {
                races[raceIndex] = new Set(); // Ensure unique horse selections per race
            }
            races[raceIndex].add(horseNumber);
        });

        // Ensure exactly four consecutive races are selected
        const raceIndexes = Object.keys(races).sort((a, b) => a - b); // Sort race indexes numerically
        if (raceIndexes.length !== 4 || (raceIndexes[3] - raceIndexes[0] !== 3)) {
            console.warn("Pick 4 requires exactly four consecutive races to be selected.");
            const resultElement = document.getElementById("result");
            resultElement.innerHTML = `$ 0.00`;
            return;
        }

        // Generate all unique combinations across the four races
        const [race1, race2, race3, race4] = raceIndexes;
        let combinationsAll = [];

        races[race1].forEach(horse1 => {
            races[race2].forEach(horse2 => {
                races[race3].forEach(horse3 => {
                    races[race4].forEach(horse4 => {
                        combinationsAll.push([horse1, horse2, horse3, horse4]);
                    });
                });
            });
        });

        console.log('Filtered Unique Combinations:', combinationsAll);

        // Calculate total cost
        const totalCost = combinationsAll.length * parseFloat(betAmount);

        // Display result
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `$${" " + totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }


    if (betType === "Pick 5") {

        if (boxChecked) {
            for (let i = 1; i <= totalRaces; i++) {
                const inputElements = document.querySelectorAll(`input[value="${i}_${horse}"]`);
                if (currentchecked) {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = true;
                        inputElements[0].parentNode.classList.add("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                } else {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = false;
                        inputElements[0].parentNode.classList.remove("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                }
            }
        }

        const selectedHorses = document.querySelectorAll('input[className="horseCheckbox"]:checked');
        const races = {}; // Use an object to track horse selections by race

        // Populate `races` with selected horses
        selectedHorses.forEach((horse) => {
            const [raceIndex, horseNumber] = horse.value.split("_");
            if (!races[raceIndex]) {
                races[raceIndex] = new Set(); // Ensure unique horse selections per race
            }
            races[raceIndex].add(horseNumber);
        });

        // Ensure exactly five consecutive races are selected
        const raceIndexes = Object.keys(races).sort((a, b) => a - b); // Sort race indexes numerically
        if (raceIndexes.length !== 5 || (raceIndexes[4] - raceIndexes[0] !== 4)) {
            console.warn("Pick 5 requires exactly five consecutive races to be selected.");
            const resultElement = document.getElementById("result");
            resultElement.innerHTML = `$ 0.00`;
            return;
        }

        // Generate all unique combinations across the five races
        const [race1, race2, race3, race4, race5] = raceIndexes;
        let combinationsAll = [];

        races[race1].forEach(horse1 => {
            races[race2].forEach(horse2 => {
                races[race3].forEach(horse3 => {
                    races[race4].forEach(horse4 => {
                        races[race5].forEach(horse5 => {
                            combinationsAll.push([horse1, horse2, horse3, horse4, horse5]);
                        });
                    });
                });
            });
        });

        console.log('Filtered Unique Combinations:', combinationsAll);

        // Calculate total cost
        const totalCost = combinationsAll.length * parseFloat(betAmount);

        // Display result
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `$${" " + totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    if (betType === "Pick 6") {

        if (boxChecked) {
            for (let i = 1; i <= totalRaces; i++) {
                const inputElements = document.querySelectorAll(`input[value="${i}_${horse}"]`);
                if (currentchecked) {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = true;
                        inputElements[0].parentNode.classList.add("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                } else {
                    if (inputElements[0]) { // Check if the element exists
                        inputElements[0].checked = false;
                        inputElements[0].parentNode.classList.remove("checked");
                    } else {
                        console.warn(`No input found for value "${i}_${horse}"`);
                    }
                }
            }
        }

        const selectedHorses = document.querySelectorAll('input[className="horseCheckbox"]:checked');
        const races = {}; // Use an object to track horse selections by race

        // Populate `races` with selected horses
        selectedHorses.forEach((horse) => {
            const [raceIndex, horseNumber] = horse.value.split("_");
            if (!races[raceIndex]) {
                races[raceIndex] = new Set(); // Ensure unique horse selections per race
            }
            races[raceIndex].add(horseNumber);
        });

        // Ensure exactly six consecutive races are selected
        const raceIndexes = Object.keys(races).sort((a, b) => a - b); // Sort race indexes numerically
        if (raceIndexes.length !== 6 || (raceIndexes[5] - raceIndexes[0] !== 5)) {
            console.warn("Pick 6 requires exactly six consecutive races to be selected.");
            const resultElement = document.getElementById("result");
            resultElement.innerHTML = `$ 0.00`;
            return;
        }

        // Generate all unique combinations across the six races
        const [race1, race2, race3, race4, race5, race6] = raceIndexes;
        let combinationsAll = [];

        races[race1].forEach(horse1 => {
            races[race2].forEach(horse2 => {
                races[race3].forEach(horse3 => {
                    races[race4].forEach(horse4 => {
                        races[race5].forEach(horse5 => {
                            races[race6].forEach(horse6 => {
                                combinationsAll.push([horse1, horse2, horse3, horse4, horse5, horse6]);
                            });
                        });
                    });
                });
            });
        });

        console.log('Filtered Unique Combinations:', combinationsAll);

        // Calculate total cost
        const totalCost = combinationsAll.length * parseFloat(betAmount);

        // Display result
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `$${" " + totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }


}
