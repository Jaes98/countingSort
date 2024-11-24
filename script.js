window.addEventListener("load", start);

const arr = [1, 4, 1, 2, 7, 5, 2, 4, 8];
const originalArray = [...arr];
let delayValue = document.getElementById("speedSlider").value;

// To visually display the counting of occurrences of values, an array is created and filled with 0s
// with a length of the maximum value in the original array + 1
const max = Math.max(...arr);
let countArr = Array(max + 1).fill(0);

// Used to stop the ongoing animation if reset button is clicked
let resetFlag = false;

function start() {
  console.log("JS running");

  const startButton = document.getElementById("start_button");
  const resetButton = document.getElementById("reset_button");
  const speedSlider = document.getElementById("speedSlider");
  const speedValue = document.getElementById("speedValue");

  startButton.addEventListener("click", handleStartClicked);
  resetButton.addEventListener("click", handleResetClicked);

  speedSlider.addEventListener("input", function () {
    delayValue = this.value;
    speedValue.textContent = `Animation speed (ms): ${delayValue}`;
  });

  displayArrayAsBars(arr, "arrayDisplay");
  displayArrayAsBoxes(countArr, "countingArrayDisplay");
  displayIndexLabels(countArr.length, "countingArrayIndexDisplay");
  displayArrayAsBoxes(arr, "originalArrayDisplay");
}

async function countingSort(arr) {
  resetFlag = false;

  // Step 1: Count occurrences of values in the original array
  for (let i = 0; i < arr.length; i++) {
    if (resetFlag) return; // If reset button is clicked, exit the function

    // Highlight the current element in the original array
    visualizeStep([...arr], `Counting occurrences of ${arr[i]}`, "originalCounting", i);
    await delayDuration(delayValue);

    // Increment the count and highlight the value in the counting array
    countArr[arr[i]]++;
    visualizeStep([...countArr], `Incrementing count of ${arr[i]}`, "counting", arr[i]);
    await delayDuration(delayValue);
  }

  // Step 2: Build the sorted array and update the original array
  let index = 0;
  for (let i = 0; i < countArr.length; i++) {
    while (countArr[i] > 0) {
      if (resetFlag) return;
      arr[index] = i;
      index++;

      // Decrement the count and highlight the value in the counting array
      countArr[i]--;
      visualizeStep([...countArr], `Decrementing count of ${i}`, "counting", i);
      await delayDuration(delayValue);

      // Place value in the sorted array and highlight the element
      visualizeStep([...arr], `Placing ${i} in array`, "sorting", index - 1);
      await delayDuration(delayValue);
    }
  }

  visualizeStep([...arr], "Sorting complete", "sorting", -1);
  visualizeStep([...countArr], "Counting complete", "counting", -1);
}

async function handleStartClicked() {
  await countingSort(arr);
}

function handleResetClicked() {
  resetFlag = true;

  arr.splice(0, arr.length, ...originalArray);

  countArr = new Array(Math.max(...originalArray) + 1).fill(0);

  clearDisplays();

  displayArrayAsBars(originalArray, "arrayDisplay");
  displayArrayAsBoxes(countArr, "countingArrayDisplay");
  displayIndexLabels(countArr.length, "countingArrayIndexDisplay");
}

function delayDuration(ms) {
  // Delays the sorting algorithm based on ms value
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function visualizeStep(array, message, type, highlightIndex) {
  if (resetFlag) return;

  if (type === "counting") {
    displayArrayAsBoxes(array, "countingArrayDisplay", highlightIndex);
    displayIndexLabels(array.length, "countingArrayIndexDisplay");
  } else if (type === "sorting") {
    displayArrayAsBars(array, "arrayDisplay", highlightIndex);
  } else if (type === "originalCounting") {
    displayArrayAsBars(array, "arrayDisplay", highlightIndex);
  } else if (type === "original") {
    displayArrayAsBars(array, "arrayDisplay", -1);
  }
  document.getElementById("steps").innerHTML = message;
}

function clearContainer(containerId) {
  const clearedContainer = document.getElementById(containerId);
  clearedContainer.innerHTML = "";
  return clearedContainer;
}

function clearDisplays() {
  document.getElementById("arrayDisplay").innerHTML = "";
  document.getElementById("countingArrayDisplay").innerHTML = "";
  document.getElementById("steps").innerHTML = "";
}

function displayArrayAsBars(array, containerId, highlightIndex) {
  const barContainer = clearContainer(containerId);

  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 20}px`;
    bar.style.backgroundColor = index === highlightIndex ? "#FF4949" : "#2e63e9";

    const label = document.createElement("label");
    label.classList.add("bar-label");
    label.innerHTML = value;
    bar.appendChild(label);

    barContainer.appendChild(bar);
  });
}

function displayArrayAsBoxes(array, containerId, highlightIndex) {
  const boxContainer = clearContainer(containerId);

  array.forEach((value, index) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.style.backgroundColor = index === highlightIndex ? "#FF4949" : "#f0f0f0";

    const label = document.createElement("label");
    label.classList.add("box-label");
    label.innerHTML = value;
    box.appendChild(label);

    boxContainer.appendChild(box);
  });
}

function displayIndexLabels(length, containerId) {
  const labelContainer = clearContainer(containerId);

  for (let i = 0; i < length; i++) {
    const label = document.createElement("div");
    label.classList.add("index-label");
    label.innerHTML = i;
    labelContainer.appendChild(label);
  }
}
