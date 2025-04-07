/**
 * @param {number[]} nums
 */
const removeDuplicates = function(nums) {
    let slow = 1, fast = 2;
    while (fast <= nums.length - 1) {
        if (nums[fast] !== nums[slow - 1]) {
            slow++;
            nums[slow] = nums[fast];
        }
        fast++;
    }

    return nums;

};

console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4]));