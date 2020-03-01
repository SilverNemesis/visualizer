export function shuffle(data, initialize, update) {
  initialize();
  const n = data.length;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    _swap(data, i, j);
    update([i, data[i], j, data[j]]);
  }
}

export function reverse(data, initialize, update) {
  initialize();
  const n = data.length;
  for (let i = 0; i < n / 2; i++) {
    const j = n - i - 1;
    _swap(data, i, j);
    update([i, data[i], j, data[j]]);
  }
}

export function bubbleSort(data, initialize, update) {
  initialize();
  const n = data.length - 1;
  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < n - i; j++) {
      if (data[j] > data[j + 1]) {
        _swap(data, j, j + 1);
        update([j, data[j], j + 1, data[j + 1]]);
        count++;
      }
    }
    if (count === 0) {
      break;
    }
  }
}

export function insertionSort(data, initialize, update) {
  initialize();
  const n = data.length;
  for (let i = 1; i < n; i++) {
    const key = data[i];
    let j = i - 1;
    while (j >= 0 && data[j] > key) {
      data[j + 1] = data[j];
      update([j + 1, data[j + 1]]);
      j = j - 1;
    }
    data[j + 1] = key;
    update([j + 1, data[j + 1]]);
  }
}

export function mergeSortInPlace(data, initialize, update) {
  initialize();
  const sort = (data, l, r) => {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);
      sort(data, l, m);
      sort(data, m + 1, r);
      merge(data, l, m, r);
    }
  }
  const merge = (data, start, mid, end) => {
    if (data[mid] < data[mid + 1]) {
      return;
    }
    let start2 = mid + 1;
    while (start <= mid && start2 <= end) {
      if (data[start] <= data[start2]) {
        start++;
      }
      else {
        const value = data[start2];
        let index = start2;
        while (index !== start) {
          data[index] = data[index - 1];
          update([index, data[index]]);
          index--;
        }
        data[start] = value;
        update([start, data[start]]);
        start++;
        mid++;
        start2++;
      }
    }
  }
  sort(data, 0, data.length - 1);
}

export function mergeSort(data, initialize, update) {
  initialize();
  const aux = new Array(data.size);
  const sort = (data, l, r) => {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);
      sort(data, l, m);
      sort(data, m + 1, r);
      merge(data, l, m, r);
    }
  }
  const merge = (data, start, mid, end) => {
    if (data[mid] < data[mid + 1]) {
      return;
    }
    const n = end - start + 1
    for (let i = 0; i < n; i++) {
      aux[i] = data[i + start]
    }
    const n1 = mid - start + 1;
    const n2 = end - start + 1;
    let i = 0;
    let j = n1;
    let k = start;
    while (i < n1 && j < n2) {
      if (aux[i] <= aux[j]) {
        data[k] = aux[i];
        update([k, data[k]]);
        i++;
      }
      else {
        data[k] = aux[j];
        update([k, data[k]]);
        j++;
      }
      k++;
    }
    while (i < n1) {
      data[k] = aux[i];
      update([k, data[k]]);
      i++;
      k++;
    }
    while (j < n2) {
      data[k] = aux[j];
      update([k, data[k]]);
      j++;
      k++;
    }
  }
  sort(data, 0, data.length - 1);
}

export function quickSort(data, initialize, update) {
  initialize();
  const partition = (data, low, high) => {
    if (high - low > 2) {
      const mid = Math.floor(low + (high - low) / 2);
      if (data[low] < data[mid] && data[mid] < data[high]) {
        _swap(data, mid, high);
        update([mid, data[mid], high, data[high]]);
      }
      else if (data[low] > data[mid] && data[mid] > data[high]) {
        _swap(data, mid, high);
        update([mid, data[mid], high, data[high]]);
      }
    }
    const pivot = data[high];
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
      if (data[j] < pivot) {
        i++;
        _swap(data, i, j);
        update([i, data[i], j, data[j]]);
      }
    }
    _swap(data, i + 1, high);
    update([i + 1, data[i + 1], high, data[high]]);
    return (i + 1);
  }
  const sort = async (data, low, high) => {
    if (low < high) {
      const mid = partition(data, low, high);
      sort(data, low, mid - 1);
      sort(data, mid + 1, high);
    }
  }
  sort(data, 0, data.length - 1);
}

function _swap(data, i, j) {
  const t = data[i];
  data[i] = data[j];
  data[j] = t;
}
