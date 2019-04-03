# This function takes in a number and squares it 
def square(x):
  result = x*x # change this line to complete the function
  
  return result

# This function takes in a number and cubes it
def cube(x):
  result = x*x*x # change this line to complete the function
  
  return result
  
# This function takes in two numbers and adds them together
def add(a, b):
  result = a + b # change this line to complete the function
  
  return result
  
# This function takes in two numbers and returns the first one minus the second
def minus(a, b):
  result = a - b # change this line to complete the function
  
  return result

minus(5, 7) # -2
minus(5, 2) # 3
  
# Provided simple test() function used in main() to print
# what each function returns vs. what it's supposed to return.
def test(got, expected):
  if got == expected:
    prefix = ' Passed '
    return print(prefix)
  else:
    prefix = '  Failed '
  print(f'{prefix} got: {repr(got)} expected: {repr(expected)}' )
  
# main function tests all the functions against expected values
def main():
  print
  print("square")
  test( square(5), 25)
  test( square(0), 0)
  test( square(-1), 1)
  test( square(10), 100)
  
  print
  print("cube")
  test( cube(2), 8)
  test( cube(-1), -1)
  test( cube(0), 0)
  test( cube(5), 125)
  
  print
  print("add")
  test( add(5, 5), 10)
  test( add(5, -5), 0)
  test( add(3, -5), -2)
  test( add(-5, -5), -10)
  
  print
  print("minus")
  test( minus(25, 20), 5)
  test( minus(5, 5), 0)
  test( minus(5, -5), 10)
  test( minus(-10, -5), -5)

if __name__ == '__main__':
    main()