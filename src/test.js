// var arr = ["A", "B", "C"];

// console.log([...arr]);

// var prim = 2;

// obj1 = { name: "Andreas", alter: 18 };
// obj2 = { name: "Hannes", alter: 12 };
// obj3 = { name: "Kristin", alter: 10 };

// arr = [obj1, obj2, obj3];

// console.log(...arr);

// console.log(arr.map((e) => e.name).indexOf("Hanness"));

var obj1 = { name: "Andreas", alter: 18, mail: "a@a" };
var obj2 = { name: "Hannes", alter: 12, mail: "b@s" };
var obj3 = { name: "Kristin", alter: 10, mail: "c@c" };

var arr = [obj1, obj2, obj3];

var arr2 = arr.map((record) => record.mail);

var invalid = arr2.filter((mail) => !/^\S+@\S+$/.test(mail));

console.log(invalid);

if (invalid.length == 0) {
  console.log("huhu");
  console.log(invalid);
} else {
  console.log("mindestens einer nicht valide");
  console.log(invalid);
}
