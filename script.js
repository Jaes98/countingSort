window.addEventListener("load", start);

const arr = [1, 4, 1, 2, 7, 5, 2];
const originalArr = [...arr];
let delayValue = document.getElementById("speedSlider").value;

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
    speedValue.textContent = `Animation speed (ms): ${this.value}`;
    console.log(delayValue);
  });

  console.log("Original array is: ", arr);

  // Display the unsorted array as bars
  displayArrayAsBars(arr, "arrayDisplay");

  // **Initialize the counting array with zeros**
  const max = Math.max(...arr);
  const countArr = Array(max + 1).fill(0);

  // **Display the counting array as boxes**
  displayArrayAsBoxes(countArr, "countingArrayDisplay");

  displayArrayAsBoxes(arr, "originalArrayDisplay");
}

async function handleStartClicked() {
  console.log("Start clicked, the algorithm magic starts now...");
  await countingSort(arr);
}

function handleResetClicked() {
  console.log("Reset clicked, resetting visuals and starting over...");

  // Reset the array to its original state
  arr.splice(0, arr.length, ...arr);

  // Clear the displays
  document.querySelector("#arrayDisplay").innerHTML = "";
  document.querySelector("#countingArrayDisplay").innerHTML = "";
  document.querySelector("#steps").innerHTML = "";

  console.log("Original array is: ", originalArr);
  // Redisplay the unsorted array visually
  displayArrayAsBars(originalArr, "arrayDisplay");

  // **Reinitialize and display the counting array with zeros**
  const max = Math.max(...arr);
  const countArr = Array(max + 1).fill(0);
  displayArrayAsBoxes(countArr, "countingArrayDisplay");
}

async function countingSort(arr) {
  const max = Math.max(...arr);
  const countArr = Array(max + 1).fill(0);

  // Display the original unsorted array
  visualizeStep([...arr], "Original array", "original", -1);
  await delayDuration(delayValue);

  // Step 1: Count occurrences
  for (let i = 0; i < arr.length; i++) {
    countArr[arr[i]]++;
    visualizeStep([...countArr], `Counting occurrences of ${arr[i]}`, "counting", arr[i]);
    await delayDuration(delayValue);
  }

  // Step 2: Build the sorted array and update the original array
  let index = 0;
  for (let i = 0; i < countArr.length; i++) {
    while (countArr[i] > 0) {
      arr[index] = i;
      index++;
      countArr[i]--;
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
  } else if (type === "sorting") {
    displayArrayAsBars(array, "arrayDisplay", highlightIndex);
  } else if (type === "original") {
    displayArrayAsBars(array, "arrayDisplay", highlightIndex);
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
    bar.style.backgroundColor = index === highlightIndex ? "#FF4949" : "#6b5b95";

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
