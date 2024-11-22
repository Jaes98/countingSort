window.addEventListener("load", start);

const arr = [1, 4, 1, 2, 7, 5, 2];

function start() {
  console.log("JS running");

  const startButton = document.getElementById("start_button");
  const restartButton = document.getElementById("restart_button");

  startButton.addEventListener("click", handleStartClicked);
  restartButton.addEventListener("click", handleRestartClicked);

  console.log("Original array is: ", arr);

  // Display the unsorted array as bars
  displayArrayAsBars(arr, "arrayDisplay");

  // **Initialize the counting array with zeros**
  const max = Math.max(...arr);
  const countArr = Array(max + 1).fill(0);

  // **Display the counting array as boxes**
  displayArrayAsBoxes(countArr, "countingArrayDisplay");
}

function handleStartClicked() {
  console.log("Start clicked, the algorithm magic starts now...");
  countingSort(arr);
}

function handleRestartClicked() {
  console.log("Restart clicked, resetting visuals and starting over...");

  // Reset the array to its original state
  const originalArray = [1, 4, 1, 2, 7, 5, 2];
  arr.splice(0, arr.length, ...originalArray);

  // Clear the displays
  document.querySelector("#arrayDisplay").innerHTML = "";
  document.querySelector("#countingArrayDisplay").innerHTML = "";
  document.querySelector("#steps").innerHTML = "";

  // Redisplay the unsorted array visually
  displayArrayAsBars(arr, "arrayDisplay");

  // **Reinitialize and display the counting array with zeros**
  const max = Math.max(...arr);
  const countArr = Array(max + 1).fill(0);
  displayArrayAsBoxes(countArr, "countingArrayDisplay");
}

function countingSort(arr) {
  const originalArr = [...arr]; // Store a copy of the original array
  const max = Math.max(...arr);
  const countArr = Array(max + 1).fill(0);
  let delay = 0;

  // Step 1: Count occurrences
  for (let i = 0; i < arr.length; i++) {
    countArr[arr[i]]++;
    visualizeStep([...countArr], `Counting occurrences of ${arr[i]}`, delay, "counting", arr[i]);
    delay += 1000;
  }

  // Step 2: Build the sorted array and update the original array
  let index = 0;
  for (let i = 0; i < countArr.length; i++) {
    while (countArr[i] > 0) {
      arr[index] = i;
      index++;
      countArr[i]--;
      visualizeStep([...arr], `Placing ${i} in array`, delay, "sorting", index - 1);
      delay += 1000;
    }
  }

  // Final step to remove highlights
  visualizeStep([...arr], "Sorting complete", delay, "sorting", -1);
  visualizeStep([...countArr], "Counting complete", delay, "counting", -1);

  visualizeStep([...originalArr], "Original array", delay, "original", -1);
  visualizeStep([...arr], "Sorted array", delay, "sorted", -1);

  console.log("Sorted array is: ", arr);

  return arr;
}

function visualizeStep(array, message, delay, type, highlightIndex) {
  setTimeout(() => {
    if (type === "counting") {
      displayArrayAsBoxes(array, "countingArrayDisplay", highlightIndex);
    } else if (type === "sorting") {
      displayArrayAsBars(array, "arrayDisplay", highlightIndex);
    } else if (type === "original") {
      displayArrayAsBoxes(array, "originalArrayDisplay", highlightIndex);
    } else if (type === "sorted") {
      displayArrayAsBars(array, "sortedArrayDisplay", highlightIndex);
    }
    document.querySelector("#steps").innerHTML = message;
  }, delay);
}

function displayArrayAsBars(array, containerId, highlightIndex) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 20}px`;
    bar.style.backgroundColor = index === highlightIndex ? "#FF4949" : "#6b5b95";
    bar.style.textAlign = "center";

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
