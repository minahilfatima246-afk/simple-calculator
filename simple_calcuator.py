print("Simple Calculator")

num1 = float(input("enter first number:"))
operator = input("eneter operator (+,-,*,/):")
num2 = float(input("enter second number:"))
if operator == "+":
    result = num1 + num2
elif operator == "-":
    resut = num1-num2
elif operator == "*":
    result = num1 * num2
elif operator == "/":
    if num2 != 0:
        result = num1/num2
    else:
        result = "cannot divide by zero"
else:
        result= "invaild operator"
print("result:", result)
