window.addEventListener("load", start);

const arr = [1, 4, 1, 2, 7, 5, 2];

function start() {
  console.log("JS running");

 const unsortedArrayElement = document.querySelector("#unsortedArray");
 const sortedArrayElement = document.querySelector("#sortedArray");

    unsortedArrayElement.innerHTML = arr;
    sortedArrayElement.innerHTML = countingSort(arr);

  console.log("Original array is: ", arr);
  console.log("Sorted array is: ", countingSort(arr));

}

function countingSort(arr) {
  const max = Math.max(...arr);
  const countArr = Array(max + 1);
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (!countArr[arr[i]]) {
      countArr[arr[i]] = 0;
    }

    countArr[arr[i]]++;
  }

  for (let i = 0; i < countArr.length; i++) {
    while (countArr[i] > 0) {
      result.push(i);
      countArr[i]--;
    }
  }

  return result;
}
