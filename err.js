class Animal {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(this.name + ' is eating.');
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // 调用父类的构造函数
        this.breed = breed;
    }

    bark() {
        console.log(this.name + ' is barking.');
    }
}

const dog = new Dog('Buddy');
dog.eat(); // 输出：Buddy is eating.
// dog.bark(); // 输出：Buddy is barking.