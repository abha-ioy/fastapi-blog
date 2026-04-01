import math
class Human:

    def __init__(self, name: str | None = None, age: int | None = None):
        self.name = name
        self.age = age

    def changeAge(self, age):
        self.age = age

    def changeName(self, name):
        self.name = name

    def tellName(self) -> str:
        return self.name
    
    def tellAge(self) -> int:
        return self.age
    
class Shape():
    def __init__(self, radius=None, l=None):
        self.radius = radius
        self.l = l

    def area(self):
        if self.radius:
            return math.pi * (self.radius)**2

        return self.l**2

circle = Shape(radius=2)
square = Shape(l=2)

print(circle.area())
print(square.area())

human1 = Human()
print(f"Human1 is {human1.tellAge()} years old.")
print(f"Human1's name is {human1.tellName()}.")

