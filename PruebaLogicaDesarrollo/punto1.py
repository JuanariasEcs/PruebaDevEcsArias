def have_common_substring(case):
    s1 = case[0]
    s2 = case[1]
    for char in s1:
        if char in s2:
            return "YES"
    return "NO"

def main():
    casesStrings = []
    cases = int(input())
    for i in range(cases):
        s1 = str(input())
        s2 = str(input())
        casesStrings.append([s1,s2])
        
    for case in casesStrings:
        print(have_common_substring(case))

main()
