
# https://app.coderpad.io/C6EPCDQC

"""

 1. If the array is empty, return 0
 2. If the array's size is 1, return the first element
 3. If the array's size is 2, return the max of the two elements
 4. Starting from an interval of 2 (note: interval 1 is the adjacent element),
    find all elements in each interval group until the last possible interval that can be taken.
 5. Sum all elements in each interval group and return the maximum sum
    
"""

def get_maximum_non_adjacent(numbers = []):
    # Handle 
    total_length = len(numbers)
    if total_length == 0:
         return 0
    if total_length == 1:
         return numbers[0]
    if (total_length == 2):
        return max(numbers[0], numbers[1])
    
    interval_2_maximum = get_interval_max(2, total_length=total_length, numbers=numbers)
    interval_3_maximum = get_interval_max(3, total_length=total_length, numbers=numbers)
    return interval_2_maximum if interval_2_maximum>interval_3_maximum else interval_3_maximum
   


def get_interval_max(interval, total_length, numbers = []):
    maximum = 0
    i = 0
    while (i<interval): 
        accumulator = 0
        x = i 
        while (x<total_length):
            accumulator += numbers[x]
            x+=interval; 
        maximum = accumulator if accumulator > maximum else maximum
        i+=1
    return maximum
    


print(get_maximum_non_adjacent([6, 7, 9, 5, 2, 5, 3]))
# print(get_path_max(2,7,[6, 7, 9, 5, 2, 5, 3]))
# print([6,5,6,7])
# [4,1,2,7,5,3,1] Ans: 14