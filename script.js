window.addEventListener("load", start);

const arr = [1, 4, 1, 2, 7, 5, 2, 4, 8];
const originalArr = [...arr];
let delayValue = document.getElementById("speedSlider").value;

// To visually display the counting of occurrences of values, an array is created and filled with 0s
// with a length of the maximum value in the original array + 1
const max = Math.max(...arr);
const countArr = Array(max + 1).fill(0);

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

function clearDisplays() {
  document.querySelector("#arrayDisplay").innerHTML = "";
  document.querySelector("#countingArrayDisplay").innerHTML = "";
  document.querySelector("#steps").innerHTML = "";
}

async function handleStartClicked() {
  await countingSort(arr);
}

function handleResetClicked() {
  // Reset the array to its original state
  arr.splice(0, arr.length, ...originalArr);

  clearDisplays();

  // Redisplay the unsorted array visually
  displayArrayAsBars(originalArr, "arrayDisplay");
  displayArrayAsBoxes(countArr, "countingArrayDisplay");
  displayIndexLabels(countArr.length, "countingArrayIndexDisplay");
}

async function countingSort(arr) {
  // Step 1: Count occurrences
  for (let i = 0; i < arr.length; i++) {
    // Highlight the current element in the original array
    visualizeStep([...arr], `Counting occurrences of ${arr[i]}`, "originalCounting", i);
    await delayDuration(delayValue);

    // Increment the count and visualize the counting array
    countArr[arr[i]]++;
    visualizeStep([...countArr], `Incrementing count of ${arr[i]}`, "counting", arr[i]);
    await delayDuration(delayValue);
  }

  // Step 2: Build the sorted array and update the original array
  let index = 0;
  for (let i = 0; i < countArr.length; i++) {
    while (countArr[i] > 0) {
      arr[index] = i;
      index++;

      // Decrement the count and visualize the updated counting array
      countArr[i]--;
      visualizeStep([...countArr], `Decrementing count of ${i}`, "counting", i);
      await delayDuration(delayValue);

      // Visualize the placement in the sorted array
      visualizeStep([...arr], `Placing ${i} in array`, "sorting", index - 1);
      await delayDuration(delayValue);
    }
  }

  // Final step to remove highlights
  visualizeStep([...arr], "Sorting complete", "sorting", -1);
  visualizeStep([...countArr], "Counting complete", "counting", -1);

  console.log("Sorted array is: ", arr);
}

function delayDuration(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function visualizeStep(array, message, type, highlightIndex) {
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
  document.querySelector("#steps").innerHTML = message;
}

function displayArrayAsBars(array, containerId, highlightIndex) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 20}px`;
    bar.style.backgroundColor = index === highlightIndex ? "#FF4949" : "#2e63e9";

    const label = document.createElement("label");
    label.classList.add("bar-label");
    label.innerHTML = value;
    bar.appendChild(label);

    container.appendChild(bar);
  });
}

function displayArrayAsBoxes(array, containerId, highlightIndex) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  array.forEach((value, index) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.style.backgroundColor = index === highlightIndex ? "#FF4949" : "#f0f0f0";

    const label = document.createElement("label");
    label.classList.add("box-label");
    label.innerHTML = value;
    box.appendChild(label);

    container.appendChild(box);
  });
}

function displayIndexLabels(length, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  for (let i = 0; i < length; i++) {
    const label = document.createElement("div");
    label.classList.add("index-label");
    label.innerHTML = i;
    container.appendChild(label);
  }
}
