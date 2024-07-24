def rotLeft(a, d):
    n = len(a)
    d = d % n  
    return a[d:] + a[:d]

def main():
    n, d = map(int, input().split())
    a = list(map(int, input().split()))
    result = rotLeft(a, d)
    print(' '.join(map(str, result)))
    
main()
