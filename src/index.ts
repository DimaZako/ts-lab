const userName: string = "дмитро";
const age: number = 20;
const isStudent: boolean = true;

function hello(name: string, age: number, student: boolean): string {
  return `Привіт, ${name}! Тобі ${age} років. Статус: ${student ? "студент" : "не студент"}.`;
}

console.log(hello(userName, age, isStudent));
