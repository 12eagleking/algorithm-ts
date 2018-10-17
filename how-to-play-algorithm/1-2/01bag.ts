/**
 * 0-1背包问题
 */

// 每件物品的数据结构
interface Obj {
  weight: number;
  price: number;
  status: number; // 0:未选中；1：已选中；2：不可能选中
}

// 背包问题数据结构
interface KnapsackProblem {
  objs: Obj[];
  totalC: number;
}

// 策略函数 函数类型
interface SelectPolicy {
  (obj: Obj[], c: number): number;
}

/**
 * 贪婪策略
 */

 // （1）根据物品价值选择，每次都选价值最高的物品

 // （2）根据物品重量选择，每次都选重量最轻的物品

 // （3）定义一个价值密度概念，每次选择都选价值密度最高的物品

function greedyAlgo(problem: KnapsackProblem, spFunc: SelectPolicy): void {
  let index: number;
  let ntc = 0;

  while((index = spFunc(problem.objs, problem.totalC - ntc)) != -1) {
    if (ntc + problem.objs[index].weight <= problem.totalC) {
      problem.objs[index].status = 1;
      ntc += problem.objs[index].weight;
    } else {
      problem.objs[index].status = 2;
    }
  }

  printResult(problem.objs);
}

function printResult(objs: Obj[]): void {
  let totalWeght = 0;
  let totalPrice = 0;

  let consoleNum = 0;
  objs.forEach((obj, index) => {
    if (obj.status === 1) {
      if (consoleNum === 0) {
        console.log('选择装入背包的物品编号依次是', index + 1);
      } else {
        console.log('、', index + 1);
      }

      totalWeght += obj.weight;
      totalPrice += obj.price;

      consoleNum++;
    }
  });

  console.log(`，此时包中物品的总重量是 ${totalWeght}，总价值是 ${totalPrice}。`);
}

let chooseFunc1: SelectPolicy;

/**
 * （1）根据物品价值选择，每次都选价值最高的物品
 */
chooseFunc1 = function(objs: Obj[], c: number) {
  let index = -1; // -1 表示背包容量已满
  let mp = 0;
  for (let i = 0; i < objs.length; i++) {
    if ((objs[i].status === 0) && (objs[i].price > mp) && (objs[i].weight <= c)) {
      mp = objs[i].price;
      index = i;
    }
  }

  return index;
}

let problem: KnapsackProblem = {
  totalC: 150,
  objs: [
    {
      weight: 35,
      price: 10,
      status: 0,
    },
    {
      weight: 30,
      price: 40,
      status: 0,
    },
    {
      weight: 60,
      price: 30,
      status: 0,
    },
    {
      weight: 50,
      price: 50,
      status: 0,
    },
    {
      weight: 40,
      price: 35,
      status: 0,
    },
    {
      weight: 10,
      price: 40,
      status: 0,
    },
    {
      weight: 25,
      price: 30,
      status: 0,
    },
  ]
} 

greedyAlgo(problem, chooseFunc1);