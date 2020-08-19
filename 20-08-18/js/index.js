// Commented the solutions found here:
// https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array

// Made a gist:
// https://gist.github.com/emdecr/7f72b69cbcf911df21f28193a520b5dd

// Approach 1
var names = ["Mike", "Matt", "Nancy", "Adam", "Jenny", "Nancy", "Carl"];

// Use .map to return an array of objects with two keys (count, name)
// Use .reduce to get an object with total count for each unique Name { Mike: 1 ... }
var unique = names
  .map(name => {
    return {
      count: 1,
      name: name
    };
  })
  // [ { count:1, name:"Mike"} ... ]
  .reduce((a, b) => {
    // Check the value where the key is b.name
    // Doesn't exist? Okay, then 0 and add the count value for the currentValue
    // Exists? Okay, get the value, then add it to the count value for the currentValue
    // Return the key=>value pair
    a[b.name] = (a[b.name] || 0) + b.count;
    return a;
  }, {});
// { Mike:1, Matt:1, Nancy:2, Adam:1, Jenny:1, Carl:1 }

// Use Object.keys to return an array of the keys found in unique
// Use .filter to go through Object.keys array
// For each item check if in the unique array at that key the value is > 1
// ie. if the Name is found more than once/is a duplicate
// If it is > 1, add that Name to the duplicates array
var duplicates = Object.keys(unique).filter(a => unique[a] > 1);

console.log(duplicates); // [ 'Nancy' ]

// Approach 2
const namesArray = ["Mike", "Matt", "Nancy", "Adam", "Jenny", "Nancy", "Carl"];

// Creates a function (fxn) that accepts an argument (names)
// .reduce() is called on names (namesArray) and returns an object/associative array
const count = names =>
  names.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {});

console.log(count(names)); // { Mike: 1, Matt: 1, Nancy: 2, Adam: 1, Jenny: 1, Carl: 1 }

// Create a higher order fxn (a fxn that can accept a fxn and return a fxn)
const duplicates = namesCount =>
  Object.keys(namesCount).filter(a => namesCount[a] > 1);

// The value of 'count' (an object) is passed to duplicates fxn
// So 'count' goes through the exact same steps as before (Lines 26-30)
console.log(duplicates(count(namesArray))); // [ 'Nancy' ]
