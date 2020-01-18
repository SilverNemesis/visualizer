class Vector {
  swap(data, i, j) {
    const t = data[i];
    data[i] = data[j];
    data[j] = t;
  }

  shuffle(data, update, done) {
    const n = data.length;
    for (let i = n - 1; i >= 0; i--) {
      this.swap(data, i, Math.floor(Math.random() * i));
      update(data);
    }
    done();
  }

  reverse(data, update, done) {
    const n = data.length;
    for (let i = 0; i < n / 2; i++) {
      this.swap(data, i, n - i - 1);
      update(data);
    }
    done();
  }

  bubbleSort(data, update, done) {
    const n = data.length - 1;
    for (let i = 0; i < n; i++) {
      let count = 0;
      for (let j = 0; j < n - i; j++) {
        if (data[j] > data[j + 1]) {
          this.swap(data, j, j + 1);
          update(data);
          count++;
        }
      }
      if (count === 0) {
        break;
      }
    }
    done();
  }

  insertionSort(data, update, done) {
    const n = data.length;
    for (let i = 1; i < n; i++) {
      const key = data[i];
      let j = i - 1;
      while (j >= 0 && data[j] > key) {
        data[j + 1] = data[j];
        update(data);
        j = j - 1;
      }
      data[j + 1] = key;
      update(data);
    }
    done();
  }

  mergeSort(data, update, done) {
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
            update(data);
            index--;
          }
          data[start] = value;
          update(data);
          start++;
          mid++;
          start2++;
        }
      }
    }
    sort(data, 0, data.length - 1);
    done();
  }

  quickSort(data, update, done) {
    const partition = (data, low, high) => {
      if (high - low > 2) {
        const mid = Math.floor(low + (high - low) / 2);
        if (data[low] < data[mid] && data[mid] < data[high]) {
          this.swap(data, mid, high);
          update(data);
        }
        else if (data[low] > data[mid] && data[mid] > data[high]) {
          this.swap(data, mid, high);
          update(data);
        }
      }
      const pivot = data[high];
      let i = (low - 1);
      for (let j = low; j <= high - 1; j++) {
        if (data[j] < pivot) {
          i++;
          this.swap(data, i, j);
          update(data);
        }
      }
      this.swap(data, i + 1, high);
      update(data);
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
    done();
  }
}

export default Vector;
