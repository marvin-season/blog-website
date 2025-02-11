---
slug: echart
title: echart
authors: [marvin-season]
tags: []
---

## echart-react

对于绘制图表，提供合适的 options 给 echart 即可，但是往往需要显示的数据从接口获取，需要将图表的数据和样式分离。

假设有如下封装好的组件：

```js
<EchartReact options={options} {...{ others }}></EchartReact>
```
### 基本配置
**一个基本的折线图配置**

```js
// 图表的基本配置
export const baseOption = {
  grid: {
    top: 8,
    left: 20,
    bottom: 18,
    right: 40,
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    formatter: "{b}: {c}",
    backgroundColor: "#FFFFFF",
    borderColor: "#F6F9FF",
    textStyle: {
      color: "#344054",
      fontSize: 12,
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
    axisLine: {
      show: true,
      lineStyle: {
        color: "#9CA3AF",
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      // interval: 0,
      // rotate: 30,
      formatter: function (value: any, index: number) {
        let formatValue = value;
        formatValue = moment(value).format("MMM D, YYYY");
        return formatValue;
      },
      padding: [6, 0, 0, 0],
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      symbol: "arrow",
      lineStyle: {
        color: "#9CA3AF",
        // ...
      },
    },
    axisLabel: {
      show: true,
      padding: [0, 16, 0, 0],
    },
  },
  series: [
    {
      name: "demo",
      data: [],
      type: "line",
      symbolSize: 4,
      itemStyle: {
        color: "auto",
        borderGap: "round",
      },
      lineStyle: {
        color: "#276DDC",
        width: 1,
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(234, 242, 255, 0.6)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(234, 242, 255, 0.2)", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      emphasis: {
        focus: "series",
      },
    },
  ],
};
```

如果只需要一个图表，将 data 赋值为接口返回的结果即可，如果有多个图表（相同类型，描述不同主题），则可以定义一个数组：
### 图表数据类型约束
```ts
interface EchartData {
    options: 'any option of echart'
    ...{
        attr: 'another attr of your chart'
    }
}

const echartDataArray: EchartData[] = []
```
### 图表数据与预定义
预定义好各个图表的样式，除了数据在后续操作中注入：

```ts
const echartDataArray: EchartData[] = [
    {
        options: merge(cloneDeep(baseOption), {
            series: [
                {
                    itemStyle: {
                        color: '#10B981',
                    },
                }
            ]
            // ...
        )
    }
]

```

渲染 chart 之前需要将各个主题的数据塞到数组对应的 data 中,需要注意合并数据的操作
`lodash.merge`这个方法会忽略 undefined 等空值的合并，且数组合并存在重复元素的 bug，所以手写 merge 函数比较合适

### 合适的合并数据方法

```ts
export const merge = (target: any, source: any) => {
  Object.keys(source).forEach((key) => {
    if (Array.isArray(source[key])) {
      // TODO: 数组需要迭代递归， 这里目前直接替换
      target[key] = source[key];
    } else if (typeof source[key] === "object") {
      target[key] = merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  });
  return target;
};
```
### 对齐数据
在我们拿到接口数据之后，就可以将数据缝合到之前预定义的 EchartDataArray 中

```ts
echartDataArray.forEach((item, index) => {
  const { options, value } = getEChartData(data, item);

  // 合并属性
  const mergedOptions = merge(cloneDeep(item.options), options);

  newData.push({
    ...item,
    options: mergedOptions,
    value,
  });
});
```

接口数据和预定义的数据之间需要做映射，以便于正确缝合数据

```tsx
export const getEChartData = (data: any, item: AnalyseEchartProps, isRight: boolean) => {
  const options = {
    xAxis: {
      data: [],
    },
    series: [{ data: [] }],
  };
  let value: JSX.Element = <></>;

  switch (item.id) {
    case 'ChartA': 
        value = <></>
        options.xAxis.data = ['xxx']
        break;
    case 'ChartB': break;
    case 'ChartC': break;
    default break
  }
  return { options, value }
```

:::tip
+ 对齐数据需要预定义数据映射

```js
// 图表字段映射（前端后端） => 用于数据转换,哪个字段是图表数据
export const EchartFieldMap = {
  MessageNumber: 'allMsgCount',
  ActiveUsersNumber: 'activeUserCount',
  AvgInteractiveNumber: 'averageSessionCount',
  TokenSpeed: 'tokensPerSecond',
  FeeCost: 'tokenCosts',
};
// 统计图表中的某个key的映射 => 具体图表数据取哪个值
export const EchartKeyMap = {
  allMsgCount: ['conversation_count'],
  activeUserCount: ['terminal_count'],
  averageSessionCount: ['interactions'],
  tokensPerSecond: ['tps'],
  tokenCosts: ['token_count', 'total_price'],
};
```

+ 获取、转换接口数据
    useQuery 提供了一个select回调，可以用来处理数据，例如： useEchartsData({}, transform, () =>{}), 传入transform函数来处理数据

```ts
export const useEchartsData = (
  params: any,
  select?: (data: any) => any,
  onSuccess?: (data: any) => void,
) => {

  return useQuery({
    queryKey: ['echartsData', params],
    queryFn: async () => {
      const response = await request('/chart', {
        params,
      });
      return response.data;
    },
    select,
    onSuccess,
  });
};
```

+ transform处理函数
```ts
const transform = (data: any) => {
    const targetData = cloneDeep(data);

    Object.keys(EchartKeyMap).forEach((key: string) => {
        EchartKeyMap[key].forEach((someKey: string) => {
            // 自定义添加一些图表显示的额外数据
            targetData[key + '_' + someKey] = 'someValue'
        })
    })
}

```
:::

### recap
总结一下有以下几点：
+ 数据和样式分离
+ 做好数据映射 => 前端前置开发
