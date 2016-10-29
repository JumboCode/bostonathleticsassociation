import sys

def  firstUniqueChar(input):
    my_char = ''
    for char1 in range(len(input)):
        my_char = input[char1]
        for char2 in range(char1, len(input)):
            is_unique = True
            if input[char1] != input[char2] and is_unique == True:
                if char2 == len(input): #found unique char
                    return input[char1]
                elif input[char1] == input[char2]:
                    is_unique = False

def main():
    input = sys.argv[1]
    print firstUniqueChar(input)
    pass

if __name__ == '__main__':
    main()
