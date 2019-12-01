export class RandomGenerator {
    constructor() {
      // this.size = size;
    }

    static create() {
      return new RandomGenerator();
    }

    generateRandom(min, max) {
      const result = [];
      if (min > max) {
        return 0;
      } else if (min == max) {
        return 0;
      }
      for (let i = min; i < max; i++) {
        const possible = Math.floor(Math.random() + i);
        result.push(possible);
      }

      return result[Math.floor(Math.random() * result.length)];
    }

  generateArray(arraySize) {
      const result = [];
      for (let i = 0; i < arraySize; i++) {
      result.push(this.generateRandom(i, arraySize));
    }

      return result;
    }

    generateId(len) {
      let id = '';
      for (let i = 0; i < len; i++) {
      id += this.generateRandom(i, len);
    }

      return id;
    }

    generateIdUpdate(len = 16) {
        let id = '';
        for (let i = 0; i < len; i++) {
          id += this.generateRandom(0, 10);
        }

        return id;
      }
  }



   /*
  function out(obj) {
    console.log(obj);
  }


  function generateRandom(min, max = 10) {
    let result = [];
    if (min > max) {
      return 0;
    } else if (min == max) {
      return 0;
    }
    for (var i = min; i < max; i++) {
      let possible = Math.floor(Math.random() + i);
      result.push(possible);
    }

    return result[Math.floor(Math.random() * result.length)];
  }

  function generateArray(arraySize) {
    let result = [];
    for (var i = 0; i < arraySize; i++) {
      result.push(generateRandom(i, arraySize));
    }

    return result;
  }

  function generateId(len) {
    let id = "";
    for(var i=0;i<len;i++) {
      id += generateRandom(i, len)
    }

    return id;
  }


  */


