/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = function(nums, val) {
    let fast = nums.length - 1;
    let slow = nums.length - 1;
    while (fast >= 0) {
        if (nums[fast] === val) {
            nums[fast] = nums[slow];
            slow--;
        }
        fast--;
    }

    return slow + 1
};

console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));