// //Успадкування, поліморфізм
// abstract class Transport {
//   private model;
//   constructor(model: string) {
//     this.model = model;
//   }
//   abstract move(): void;
// }
// class Bus extends Transport {
//   constructor(model: string) {
//     super(model);
//   }

//   move(): void {
//     console.log("Bus move");
//   }
// }

// class Car extends Transport {
//   constructor(model: string) {
//     super(model);
//   }

//   move(): void {
//     console.log("Car move");
//   }
// }


// function drive(tr:Transport):void {
//     tr.move()
// }

// drive(new Car("mazda"))
// drive(new Bus("my bus")).
 
// enum Roles {
//   ADMIN=1,
//   MANAGER,
//   USER,
// }

// const role: Roles = Roles.MANAGER;

// console.log(Roles[role]);
//TODO: function
// let a:any = "hello"
// a = 10
// let a2:unknown 


import path from "node:path"
import FileWorker from "./utils/FileWorker.js"

const FILE_TO_PATH = path.join('logs','logs.txt')

FileWorker.path = FILE_TO_PATH; 
let content:string|undefined = await FileWorker.getContent()
await FileWorker.writeToFile(FILE_TO_PATH, content)
content = (await FileWorker.readFile(FILE_TO_PATH))?.toString('utf-8')
console.log(`Content from file:\n ${content}`)












// stdout.write("Enter content: ")
// stdin.on('data', (data:Buffer)=>{
//     console.log("Байти", data)
//     data.forEach((el:number)=>{
//         console.log(el.toString(10))
//     })
//     const content:string = data.toString('utf-8')
//     console.log("Контент", content)
//     writeToFile(FILE_TO_PATH, content).then(_=>{
//         process.exit()
//     })
// })

//fs.writeFileSync(FILE_TO_PATH, "Node")

// fs.writeFile(FILE_TO_PATH,"Node", ()=>{
//     console.log("Success")
// })