var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});
reader.on('close', () => {
  const w = Number(lines[0].split(' ')[1]);
  const h = Number(lines[0].split(' ')[0]);
  const que = createQue(lines);
  
  getMaxPoint(que, w, h);
});

const createQue = (inputArr) => {
    const que = [];
    for (let i = 1; i < inputArr.length; i++) {
        const arr = inputArr[i].split(' ');
        que.push(arr);
    }
    return que;
};

const getTargetPoint = (que, wIndex, hIndex) => {
    return Number(que[hIndex][wIndex]);
};

const getMaxPoint = (que, w, h) => {
    let maxPoint = 0;
    for (let i = 0; i < w; i++) {
        const point = getTargetPoint(que, i, 0) +  getChildPoint(que, i, 1, w- 1, h - 1);
        maxPoint = maxPoint < point ? point : maxPoint;
    }
    console.log(maxPoint);
}

const getChildPoint = (que, wIndex, hIndex, maxWIndex, maxHIndex) => {
    if (maxHIndex < hIndex) {
        return 0;
    }
    
    let childPoint = 0;
    // 左下
    if (wIndex > 0) {
        let leftChildPoint = getTargetPoint(que, wIndex - 1, hIndex);
        leftChildPoint += getChildPoint(que, wIndex - 1, hIndex + 1, maxWIndex, maxHIndex);
        childPoint = childPoint < leftChildPoint ? leftChildPoint : childPoint;
    }
    
    // 真下
    let underChildPoint = getTargetPoint(que, wIndex, hIndex);
    underChildPoint += getChildPoint(que, wIndex, hIndex + 1, maxWIndex, maxHIndex);
    childPoint = childPoint < underChildPoint ? underChildPoint : childPoint;
    
    // 右下
    if (wIndex < maxWIndex) {
        let rightChildPoint = getTargetPoint(que, wIndex + 1, hIndex);
        rightChildPoint += getChildPoint(que, wIndex + 1, hIndex + 1, maxWIndex, maxHIndex);
        childPoint = childPoint < rightChildPoint ? rightChildPoint : childPoint;
    }
    
    return childPoint;
};
