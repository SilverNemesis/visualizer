class Sort {
  constructor() {
    this.shuffle = this.shuffle.bind(this);
    this.reverse = this.reverse.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.insertionSort = this.insertionSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
  }

  shuffle(data, initialize, update) {
    initialize();
    const n = data.length;
    for (let i = n - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * i);
      this._swap(data, i, j);
      update([i, data[i], j, data[j]]);
    }
  }

  reverse(data, initialize, update) {
    initialize();
    const n = data.length;
    for (let i = 0; i < n / 2; i++) {
      const j = n - i - 1;
      this._swap(data, i, j);
      update([i, data[i], j, data[j]]);
    }
  }

  bubbleSort(data, initialize, update) {
    initialize();
    const n = data.length - 1;
    for (let i = 0; i < n; i++) {
      let count = 0;
      for (let j = 0; j < n - i; j++) {
        if (data[j] > data[j + 1]) {
          this._swap(data, j, j + 1);
          update([j, data[j], j + 1, data[j + 1]]);
          count++;
        }
      }
      if (count === 0) {
        break;
      }
    }
  }

  insertionSort(data, initialize, update) {
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

  mergeSort(data, initialize, update) {
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
      let start2 = mid + 1;
      if (data[mid] <= data[start2]) {
        return;
      }
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

  quickSort(data, initialize, update) {
    initialize();
    const partition = (data, low, high) => {
      if (high - low > 2) {
        const mid = Math.floor(low + (high - low) / 2);
        if (data[low] < data[mid] && data[mid] < data[high]) {
          this._swap(data, mid, high);
          update([mid, data[mid], high, data[high]]);
        }
        else if (data[low] > data[mid] && data[mid] > data[high]) {
          this._swap(data, mid, high);
          update([mid, data[mid], high, data[high]]);
        }
      }
      const pivot = data[high];
      let i = (low - 1);
      for (let j = low; j <= high - 1; j++) {
        if (data[j] < pivot) {
          i++;
          this._swap(data, i, j);
          update([i, data[i], j, data[j]]);
        }
      }
      this._swap(data, i + 1, high);
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

  _swap(data, i, j) {
    const t = data[i];
    data[i] = data[j];
    data[j] = t;
  }
}

export default Sort;
