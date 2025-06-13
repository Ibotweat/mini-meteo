class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        dico = {}
        for i in range(len(nums)):
            if target - nums[i] in dico:
                return [i, dico[target - nums[i]]]
            else:
                dico[nums[i]] = i
            

