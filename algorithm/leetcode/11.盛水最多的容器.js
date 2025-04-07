/**
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 返回容器可以储存的最大水量。
 * 说明：你不能倾斜容器。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 * 示例 2：
 *
 * 输入：height = [1,1]
 * 输出：1
 */

/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function(height) {
    let l = 0, r = height.length - 1;  // 初始化左右指针
    let ans = 0;  // 初始化最大水量

    while (l < r) {
        // 计算当前水量：较短的线段高度 * 宽度
        let water = Math.min(height[l], height[r]) * (r - l);

        // 更新最大水量
        ans = Math.max(ans, water);

        // 移动指针：始终移动较小的一边
        if (height[l] <= height[r]) {
            l++;  // 移动左指针
        } else {
            r--;  // 移动右指针
        }
    }

    return ans;  // 返回最大水量
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]));
