import type { WeekData } from '../types'

export const week3Data: WeekData = {
  weekKey: 'week3',
  weekNumber: 3,
  title: 'JAVASCRIPT',
  subtitle: 'Manipulation',

  topics: [
    {
      title: "Scope (Block vs Function)",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "Scope defines where a variable is accessible. Variables declared with let/const are block-scoped (only inside {...}). Variables declared with var are function-scoped. I'll avoid global leaks by limiting variable scope."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Scope determines where a variable or function is visible. Block scope limits to the nearest { ... } (used by <code>let</code>/<code>const</code>), while function scope limits to the function body (used by <code>var</code>).</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example </h2>

          <!-- editable example area: textarea + run + copy -->
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <div class="mb-3">
              <textarea class="js-playground-input w-full h-28 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
function testScope() {
  if (true) {
    var a = "function-scoped var";
    let b = "block-scoped let";
    const c = "block-scoped const";
  }
  console.log(a); // works: function-scoped
  console.log(typeof b); // undefined / ReferenceError depends on environment
  console.log(typeof c); // undefined / ReferenceError depends on environment
}
testScope();
              </textarea>
            </div>

            
          </div>

          

        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Scoping prevents accidental overwrites and global pollution — crucial for predictable functions and modular code. Using <code>let</code>/<code>const</code> avoids many <code>var</code>-related bugs.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between function scope and block scope?</li>
            <li>Why prefer <code>let</code>/<code>const</code> over <code>var</code>?</li>
            <li>How do closures interact with scope?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_scope" target="_blank">MDN — Function scope</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/closure" target="_blank">javascript.info — Closures & Scope</a></li>
            <li><a class="text-blue-300" href="https://2ality.com/2015/09/es6-scoping.html" target="_blank">2ality — ES6 scoping</a></li>
            <li><a class="text-blue-300" href="https://www.geeksforgeeks.org/var-let-and-const-in-javascript/" target="_blank">GeeksforGeeks — var/let/const</a></li>
          </ul>
        </section>
      </div>
    `
    },


    {
      title: "Hoisting",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "Hoisting is JavaScript's compile-time behavior that moves declarations (not initializations) to the top of their scope. Functions and var declarations behave differently from let/const — I know when to rely on hoisting and when to avoid it."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Hoisting means declarations are processed before code runs. For <code>var</code>, the declaration is hoisted (value is undefined until assigned). For <code>let</code>/<code>const</code>, they are in a temporal dead zone until their declaration executes.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example </h2>

          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-28 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Try this — press Run
console.log(foo); // undefined (declaration hoisted)
var foo = 1;

console.log(bar); // ReferenceError (TDZ for let/const)
let bar = 2;

function sayHi() { console.log("hi from hoisted function"); }
sayHi(); // functions are hoisted entirely
            </textarea>

            
          </div>

        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Common pitfalls</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Relying on hoisting for code order — makes code harder to read.</li>
            <li>Expecting <code>let</code>/<code>const</code> to behave like <code>var</code> — they don't.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Explain why <code>typeof undeclaredVar</code> does not throw but accessing <code>let</code> before declaration does.</li>
            <li>When are function declarations hoisted vs function expressions?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" target="_blank">MDN — Hoisting</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/variables#hoisting" target="_blank">javascript.info — Hoisting</a></li>
            <li><a class="text-blue-300" href="https://2ality.com/2013/10/temporal-dead-zone.html" target="_blank">2ality — Temporal Dead Zone</a></li>
            <li><a class="text-blue-300" href="https://www.geeksforgeeks.org/hoisting-in-javascript/" target="_blank">GeeksforGeeks — Hoisting</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Closures",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "A closure gives a function access to its outer function's scope, even after the outer function has returned. I use them for data encapsulation and creating stateful functions, like counters or memoization caches."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A closure is the combination of a function and the lexical environment within which that function was declared. It 'remembers' the variables from its creation context.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
function createCounter() {
  let count = 0; // This variable is 'closed over'

  return function() { // This inner function is a closure
    count++;
    console.log(count);
  };
}

const counterA = createCounter();
const counterB = createCounter();

console.log("Counter A:");
counterA(); // 1
counterA(); // 2

console.log("Counter B:");
counterB(); // 1 (has its own separate scope)
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Closures are a cornerstone of JavaScript. They enable powerful patterns like private methods, currying, and are fundamental to how callbacks and asynchronous operations work. Understanding them is key to avoiding common bugs, like the classic loop-and-setTimeout issue.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How can closures cause memory leaks?</li>
            <li>What is the difference between a closure and lexical scope?</li>
            <li>Can you show me an example of a module pattern using closures?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" target="_blank">MDN — Closures</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/closure" target="_blank">javascript.info — Closures</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/javascript-closures-for-beginners/" target="_blank">freeCodeCamp — A Beginner's Guide to Closures</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "The 'this' Keyword",
      difficulty: "Intermediate → Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "The value of 'this' is determined by how a function is called. I'm aware of the four main binding rules: method invocation, function invocation, 'new' binding, and explicit binding. I prefer arrow functions for callbacks to retain the lexical 'this'."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>this</code> keyword is a reference to the context of an execution. Its value changes depending on whether the function is called as an object method (<code>this</code> is the object), a standalone function (<code>this</code> is the global object or <code>undefined</code> in strict mode), or an arrow function (<code>this</code> is from the surrounding scope).</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const person = {
  name: 'Alex',
  greet() {
    console.log(\`Method call: \${this.name}\`);
  },
  waitAndGreet() {
    setTimeout(() => {
      // Arrow function uses 'this' from waitAndGreet's scope
      console.log(\`Arrow fn in setTimeout: \${this.name}\`);
    }, 100);
  }
};

person.greet(); // 'this' refers to the 'person' object

const standaloneGreet = person.greet;
standaloneGreet(); // 'this' is undefined (in strict mode) or window

person.waitAndGreet();
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Incorrectly using <code>this</code> is a major source of bugs, especially in object methods, event handlers, and callbacks. Knowing how to predict and control its value (with arrow functions, <code>.bind()</code>, <code>.call()</code>, or <code>.apply()</code>) is critical for writing robust object-oriented and event-driven code.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between <code>call</code>, <code>apply</code>, and <code>bind</code>?</li>
            <li>Why would you not use an arrow function for an object method?</li>
            <li>How does the <code>new</code> keyword affect <code>this</code>?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" target="_blank">MDN — The 'this' keyword</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/object-methods" target="_blank">javascript.info — Object methods, "this"</a></li>
            <li><a class="text-blue-300" href="https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md" target="_blank">YDKJS — 'this' All Makes Sense Now!</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Pass by Value vs Pass by Reference",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "JavaScript passes primitive types by value and object types by reference (or more accurately, by 'copy of a reference'). I'm careful to avoid unintended side effects by not mutating objects passed as arguments unless it's the function's explicit purpose."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>When you pass a primitive (<code>String</code>, <code>Number</code>, <code>Boolean</code>) to a function, you pass a copy of its value. When you pass an object (<code>Object</code>, <code>Array</code>), you pass a reference that points to the same object in memory.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Pass by Value (Primitives)
let num = 10;
function changeValue(val) {
  val = 20; // Modifies the local copy
}
changeValue(num);
console.log(num); // 10 (original is unchanged)

// Pass by Reference (Objects)
let person = { name: 'Bob' };
function changeReference(obj) {
  obj.name = 'Charlie'; // Modifies the original object
}
changeReference(person);
console.log(person.name); // 'Charlie' (original is mutated)
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Mutating an object inside a function can cause hard-to-trace bugs elsewhere in your application, as other parts of the code using that same object will be affected. Prefer pure functions that return new objects instead of modifying existing ones (immutability).</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How can you create a safe copy of an object to modify inside a function?</li>
            <li>What is the difference between a shallow copy and a deep copy?</li>
            <li>If a function reassigns an object argument (e.g., <code>obj = { new: 'object' }</code>), does it affect the original variable? Why not?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://www.javascripttutorial.net/javascript-pass-by-value/" target="_blank">JavaScript Tutorial — Pass-by-value</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/javascript-pass-by-value-and-pass-by-reference/" target="_blank">freeCodeCamp — Pass by Value & Reference</a></li>
            <li><a class="text-blue-300" href="https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language" target="_blank">Stack Overflow — Detailed Discussion</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Destructuring (Arrays & Objects)",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use destructuring to unpack values from arrays or properties from objects into distinct variables. It makes the code more readable and concise, especially when working with function arguments or nested data structures."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Destructuring is a JavaScript expression that makes it possible to extract data from arrays or objects into their own variables using a syntax that mirrors the data structure.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Object Destructuring
const user = { id: 42, name: 'Alice', role: 'Admin' };
const { name, role } = user;
console.log(name); // 'Alice'
console.log(role); // 'Admin'

// Array Destructuring
const coordinates = [10, 20, 30];
const [x, y] = coordinates;
console.log(x); // 10
console.log(y); // 20

// With renaming and default values
const { name: userName, isActive = false } = user;
console.log(userName); // 'Alice'
console.log(isActive); // false
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Destructuring dramatically improves code ergonomics. It reduces the need for repetitive temporary variables (e.g., <code>const name = user.name;</code>) and leads to cleaner function signatures and data manipulation, especially when combined with other ES6 features like the rest/spread syntax.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How do you destructure nested objects?</li>
            <li>How can you use destructuring with the rest operator?</li>
            <li>When would you use destructuring in a function's parameter list?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" target="_blank">MDN — Destructuring assignment</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/destructuring-assignment" target="_blank">javascript.info — Destructuring assignment</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Spread Operator (...)",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use the spread operator to expand iterables like arrays or strings into individual elements. It's my go-to for creating shallow copies of arrays and objects, which is essential for maintaining immutability in state management."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The spread (<code>...</code>) syntax allows an iterable such as an array or string to be expanded in places where zero or more arguments or elements are expected. In an object literal, it copies properties from one object to another.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// In arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
console.log(arr2);

// In objects (for cloning/merging)
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
console.log(obj2);

// In function calls
const numbers = [9, 4, 7];
console.log(Math.max(...numbers)); // 9
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>The spread operator provides a highly readable and concise syntax for common tasks like merging arrays, creating shallow clones of objects, and passing array elements as function arguments. It is a cornerstone of modern, functional-style JavaScript.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between the spread and rest operators?</li>
            <li>Does the spread operator perform a shallow or a deep copy? What's the implication?</li>
            <li>How can you use the spread operator to convert a string into an array of characters?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" target="_blank">MDN — Spread syntax</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/rest-parameters-spread-syntax" target="_blank">javascript.info — Rest parameters and spread syntax</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Async/Await",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use async/await to write asynchronous code that reads like synchronous code. It's syntactic sugar over Promises that improves readability and simplifies error handling with standard try/catch blocks."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><code>async</code> functions allow you to write Promise-based code as if it were synchronous. The <code>await</code> operator pauses the function's execution until a Promise settles, and then resumes with the resolved value. An <code>async</code> function always returns a Promise.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const fakeApiCall = (value) => {
  return new Promise(resolve => setTimeout(() => resolve(value), 500));
};

async function fetchData() {
  try {
    console.log("Fetching user...");
    const user = await fakeApiCall({ id: 1, name: 'Dave' });
    console.log("User:", user);
    
    console.log("Fetching posts for user...");
    const posts = await fakeApiCall(['Post 1', 'Post 2']);
    console.log("Posts:", posts);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

fetchData();
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p><code>async/await</code> provides a massive improvement in code clarity over nested <code>.then()</code> chains or callback hell. It makes complex asynchronous workflows much easier to write, read, and debug, especially when dealing with sequential dependent operations.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What happens if you use <code>await</code> outside of an <code>async</code> function?</li>
            <li>How do you handle errors in an async function?</li>
            <li>How would you run multiple async operations in parallel using <code>async/await</code>?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" target="_blank">MDN — async function</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/async-await" target="_blank">javascript.info — Async/await</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/how-to-use-async-await-in-javascript/" target="_blank">freeCodeCamp — Async/Await Tutorial</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Promises",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. I use them to manage async logic, chaining operations with .then() and handling errors centrally with .catch()."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A Promise exists in one of three states: <em>pending</em> (initial state), <em>fulfilled</em> (operation completed successfully), or <em>rejected</em> (operation failed). It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const myPromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  setTimeout(() => {
    if (success) {
      resolve("Operation was successful!");
    } else {
      reject("Operation failed.");
    }
  }, 1000);
});

console.log("Promise started...");

myPromise
  .then(result => {
    console.log("Fulfilled:", result);
  })
  .catch(error => {
    console.error("Rejected:", error);
  });
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Promises are the foundation of modern asynchronous JavaScript. They provide a cleaner, more robust alternative to callbacks for handling async operations, avoiding "callback hell" and enabling better error handling and composition of async logic.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is Promise chaining?</li>
            <li>What is the difference between <code>Promise.all()</code> and <code>Promise.race()</code>?</li>
            <li>What is the microtask queue and how does it relate to Promises?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">MDN — Promise</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/promise-basics" target="_blank">javascript.info — Intro to Promises</a></li>
            <li><a class="text-blue-300" href="https://web.dev/promises/" target="_blank">web.dev — JavaScript Promises: an introduction</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Array.map()",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use map() to transform each element in an array and create a new array from the results. It's a pure, non-mutating method, which makes it ideal for working with state in frameworks like React."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>map()</code> method creates a <strong>new</strong> array populated with the results of calling a provided function on every element in the calling array. It does not change the original array.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-36 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const numbers = [1, 4, 9, 16];

// Pass a function to map
const doubles = numbers.map(x => x * 2);

console.log(doubles); // [2, 8, 18, 32]
console.log(numbers); // [1, 4, 9, 16] (original array is unchanged)

const users = [{id: 1, name: 'A'}, {id: 2, name: 'B'}];
const names = users.map(user => user.name);
console.log(names); // ['A', 'B']
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p><code>map()</code> is one of the most common and powerful array methods. It promotes an immutable, functional style of programming. It's frequently used for rendering lists of data in UI development, transforming data from an API, or any situation where you need to project an array into a new form.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between <code>map()</code> and <code>forEach()</code>?</li>
            <li>What does the callback function for <code>map()</code> receive as arguments? (value, index, array)</li>
            <li>Can you chain <code>map()</code> with other array methods like <code>filter()</code> or <code>reduce()</code>?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target="_blank">MDN — Array.prototype.map()</a></li>
            <li><a class="text-blue-300" href="https://www.w3schools.com/jsref/jsref_map.asp" target="_blank">W3Schools — JavaScript Array map()</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Type Coercion (Implicit/Explicit)",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm aware that JavaScript performs implicit type coercion in operations with mixed types. To avoid unpredictable behavior, I prefer explicit conversion using functions like Number(), String(), and Boolean(), and I always use the strict equality operator (===)."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><strong>Type Coercion</strong> is the automatic conversion of a value from one data type to another. <strong>Implicit</strong> coercion happens automatically by JavaScript (e.g., <code>1 + "2"</code>). <strong>Explicit</strong> coercion is when you manually convert the type.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Implicit Coercion (often confusing)
console.log('5' - 3);      // 2 (string '5' coerced to number)
console.log('5' + 3);      // "53" (number 3 coerced to string)
console.log(5 == '5');     // true (coercion makes them equal)

// Explicit Coercion (predictable)
console.log(Number('5') - 3); // 2
console.log(String(5) + 3);   // "53"
console.log(5 === Number('5')); // true
console.log(5 === '5');         // false (strict equality, no coercion)
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Relying on implicit coercion can lead to very subtle and confusing bugs that are hard to track down. Writing explicit, clear code that doesn't depend on these automatic conversions makes your code more robust, predictable, and easier for other developers to understand.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Why should you almost always use <code>===</code> instead of <code>==</code>?</li>
            <li>What is the result of <code>[] + {}</code> and why?</li>
            <li>How can you quickly convert a value to a boolean? (e.g., using <code>!!</code>)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion" target="_blank">MDN — Type coercion</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/type-conversions" target="_blank">javascript.info — Type Conversions</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/" target="_blank">freeCodeCamp — Type Coercion Explained</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Falsy Values",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I know the six falsy values in JavaScript: false, 0, an empty string (""), null, undefined, and NaN. I use this knowledge for concise boolean checks, but I'm careful with operators like || when 0 or '' are valid inputs."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A "falsy" value is a value that is considered <code>false</code> when encountered in a boolean context (like an <code>if</code> statement). All other values are "truthy".</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const falsyValues = [false, 0, "", null, undefined, NaN];

falsyValues.forEach(val => {
  if (val) {
    // This code will never run
  } else {
    console.log(val, "is falsy.");
  }
});

// Common pitfall with ||
const quantity = 0;
const displayQuantity = quantity || 'N/A'; // uses 'N/A' because 0 is falsy
console.log('Using ||:', displayQuantity);

// Use nullish coalescing (??) instead
const correctDisplayQuantity = quantity ?? 'N/A'; // uses 0
console.log('Using ?? :', correctDisplayQuantity);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Understanding falsy values is essential for writing correct conditional logic. It allows for concise checks (e.g., <code>if (variable)</code> instead of <code>if (variable !== null && variable !== undefined)</code>). However, it's also a common source of bugs when a falsy value like <code>0</code> or an empty string is a valid input that should be preserved.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Are empty arrays (<code>[]</code>) or empty objects (<code>{}</code>) falsy?</li>
            <li>When should you use the nullish coalescing operator (<code>??</code>) instead of the logical OR (<code>||</code>)?</li>
            <li>How does the <code>Boolean()</code> constructor use falsy/truthy values?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Glossary/Falsy" target="_blank">MDN — Falsy</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/truthy-and-falsy-values-in-javascript/" target="_blank">freeCodeCamp — Truthy and Falsy Values</a></li>
          </ul>
        </section>
      </div>
    `
    },

    {
      title: "Strict Mode",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I enable strict mode using 'use strict' at the top of my files or functions. It helps me catch common coding mistakes and write more secure JavaScript by opting into a restricted variant of the language."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Strict mode is a feature that enforces stricter parsing and error handling on your code at runtime. It changes previously accepted "bad syntax" into real errors, making the code more robust and debuggable.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
function nonStrictMode() {
  // In non-strict mode, this creates a global variable.
  undeclaredVar = "I am a global leak!";
  console.log(undeclaredVar);
}

function strictMode() {
  'use strict';
  try {
    // In strict mode, this throws a ReferenceError.
    anotherUndeclared = "This will fail.";
  } catch (e) {
    console.error(e.message);
  }
}

nonStrictMode();
strictMode();
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>It prevents accidental global variable creation, makes assignments that would otherwise silently fail throw an exception, and disallows duplicate property names or parameter values. Modern JavaScript modules and classes are implicitly in strict mode, so it's the standard way of writing code today.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What are some other changes that strict mode introduces? (e.g., 'this' is undefined in global functions)</li>
            <li>Can you apply strict mode to only a part of a script?</li>
            <li>Are ES6 modules automatically in strict mode?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode" target="_blank">MDN — Strict mode</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/strict-mode" target="_blank">javascript.info — Strict mode</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Prototype Chaining",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I understand that JavaScript objects have a prototype chain. When I access a property, the engine looks on the object itself, then on its prototype, its prototype's prototype, and so on, until it finds the property or reaches the end of the chain (Object.prototype)."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Prototype chaining is the mechanism by which JavaScript objects inherit features from one another. Every object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on, until an object is reached with <code>null</code> as its prototype.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(\`\${this.name} makes a noise.\`);
}

function Dog(name) {
  Animal.call(this, name); // Call parent constructor
}
// Set up the prototype chain: Dog -> Animal -> Object
Dog.prototype = Object.create(Animal.prototype);

const dog = new Dog('Rex');
dog.speak(); // Found on Animal.prototype
console.log(dog.toString()); // Found on Object.prototype
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Understanding the prototype chain is fundamental to understanding how inheritance and property lookup work in JavaScript. While ES6 classes abstract this away, they are just syntactic sugar over the same prototypal inheritance mechanism. It's crucial for debugging and advanced object-oriented patterns.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between <code>__proto__</code> and <code>prototype</code>?</li>
            <li>How do ES6 classes relate to the prototype chain?</li>
            <li>How can you check if an object has a property on itself versus on its prototype chain?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" target="_blank">MDN — Inheritance and the prototype chain</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/prototype-inheritance" target="_blank">javascript.info — Prototypal inheritance</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Classes and Inheritance",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use ES6 classes for a clearer, more standard syntax for object-oriented programming. I know they are syntactic sugar over JavaScript's existing prototype-based inheritance and use 'extends' and 'super' for subclassing."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>class</code> syntax provides a cleaner and more familiar way to create constructor functions and implement inheritance. The <code>extends</code> keyword is used to create a subclass, and the <code>super</code> keyword is used to call methods on an object's parent.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
class Vehicle {
  constructor(name) {
    this.name = name;
  }
  move() {
    console.log(\`\${this.name} is moving.\`);
  }
}

class Car extends Vehicle {
  constructor(name, brand) {
    super(name); // Call the parent constructor
    this.brand = brand;
  }
  // Overriding the parent method
  move() {
    console.log(\`The \${this.brand} \${this.name} is driving.\`);
  }
}

const myCar = new Car('Civic', 'Honda');
myCar.move();
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Classes provide a standard and less error-prone syntax for object-oriented programming in JavaScript, making code more readable for developers coming from other languages like Java or Python. While powerful, it's often recommended to favor composition over deep inheritance hierarchies.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the purpose of \`\${super()}\` in a constructor? When is it required?</li>
            <li>Can you have private fields in a JavaScript class?</li>
            <li>What is a \`static\` method in a class?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank">MDN — Classes</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/class" target="_blank">javascript.info — Class basic syntax</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Shallow vs. Deep Copy",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I know the difference between shallow and deep copies. A shallow copy shares references to nested objects, while a deep copy duplicates everything. For simple cases, I use the spread operator (...) for a shallow copy. For a deep copy, I use 'structuredClone' or a library like lodash to avoid unintended mutations."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A <strong>shallow copy</strong> of an object creates a new object, but if a property's value is a reference to another object (like an array or object), it copies that reference, not the object itself. A <strong>deep copy</strong> creates a new object and recursively copies all nested objects, creating a fully independent clone.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const original = { a: 1, b: { c: 2 } };

// Shallow copy
const shallow = { ...original };
shallow.a = 10;
shallow.b.c = 20; // This MUTATES the original object too!
console.log('Original after shallow modify:', original.b.c); // 20

// Deep copy (modern way)
const original2 = { a: 1, b: { c: 2 } };
const deep = structuredClone(original2);
deep.b.c = 30; // This does NOT affect the original
console.log('Original after deep modify:', original2.b.c); // 2
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Failing to distinguish between shallow and deep copies is a classic source of bugs where you unintentionally modify shared state. Understanding this is critical for working with state management in frameworks like React or Vue, where immutability is a core principle.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What are the limitations of using \`JSON.parse(JSON.stringify(obj))\` for a deep copy?</li>
            <li>When is a shallow copy sufficient?</li>
            <li>How does \`Object.assign()\` relate to shallow copying?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy" target="_blank">MDN — Deep copy</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/object-copy" target="_blank">javascript.info — Object references and copying</a></li>
             <li><a class="text-blue-300" href="https://web.dev/structured-clone/" target="_blank">web.dev — Deep-copying in JavaScript with structuredClone</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Event Propagation (Bubbling & Capturing)",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I understand that DOM events have two phases: capturing and bubbling. By default, handlers run in the bubbling phase, from the target element up to the root. I know how to use 'event.stopPropagation()' to prevent further propagation and when it's appropriate to handle events in the capturing phase."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>When a DOM event occurs, it travels in two phases. The <strong>capturing phase</strong> goes from the window down to the target element. The <strong>bubbling phase</strong> goes from the target element back up to the window. Event listeners can be attached to either phase.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// In your HTML: <div id="parent"><button id="child">Click Me</button></div>

const parent = document.getElementById('parent');
const child = document.getElementById('child');

// Bubbling (default)
parent.addEventListener('click', () => console.log('Parent bubble'));
child.addEventListener('click', () => console.log('Child bubble'));
// Clicking the button logs: "Child bubble", then "Parent bubble"

// Capturing
parent.addEventListener('click', () => console.log('Parent capture'), true);
// Clicking now logs: "Parent capture", "Child bubble", "Parent bubble"
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Understanding event propagation is crucial for complex UIs, especially when dealing with nested interactive elements. It's the foundation of the event delegation pattern, which improves performance. Knowing how to stop propagation can prevent unintended side effects, like a modal closing when you click an element inside it.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between \`event.stopPropagation()\` and \`event.stopImmediatePropagation()\`?</li>
            <li>What is \`event.target\` vs \`event.currentTarget\`?</li>
            <li>Describe a practical use case for handling an event in the capturing phase.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation" target="_blank">MDN — Event Propagation</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/bubbling-and-capturing" target="_blank">javascript.info — Bubbling and capturing</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Event Delegation",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use event delegation to improve performance and simplify code. By attaching a single event listener to a parent element, I can efficiently manage events for many child elements, including those added to the DOM after the listener was attached."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Event delegation is a pattern where you attach an event listener to a parent element instead of multiple child elements. It relies on event bubbling to catch events from its children. You can then use <code>event.target</code> to determine which child element triggered the event.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// In your HTML: <ul id="myList"><li>Item 1</li><li>Item 2</li></ul>

const list = document.getElementById('myList');

list.addEventListener('click', function(event) {
  // Check if the clicked element is an LI
  if (event.target && event.target.matches('li')) {
    console.log('Clicked item:', event.target.textContent);
  }
});

// Now if you add a new item, the listener still works!
const newItem = document.createElement('li');
newItem.textContent = 'Item 3 (new)';
list.appendChild(newItem);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>This pattern has two main benefits: 1) Performance: It reduces memory usage by requiring only one event listener instead of many. This is especially important for large lists or tables. 2) Simplicity: It handles dynamically added elements automatically, so you don't need to manually attach/detach listeners as the DOM changes.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How does event delegation rely on event bubbling?</li>
            <li>What are the potential downsides or edge cases of event delegation?</li>
            <li>In the handler, what's the difference between \`event.target\` and \`this\` (or \`event.currentTarget\`)?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://javascript.info/event-delegation" target="_blank">javascript.info — Event delegation</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/event-delegation-javascript/" target="_blank">freeCodeCamp — Event Delegation</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Callback Functions",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "A callback is a function passed as an argument to another function, to be executed later. I use them for asynchronous operations like timers or data fetching, but I prefer Promises or async/await to avoid 'callback hell'."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A callback function is a function that is passed into another function as an argument and is then invoked inside the outer function to complete some kind of routine or action. They are the simplest way to handle asynchronicity in JavaScript.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Synchronous callback
const names = ['alice', 'bob', 'charlie'];
names.forEach(name => { // The arrow function is a callback
  console.log(name.toUpperCase());
});

// Asynchronous callback
function fetchData(callback) {
  console.log("Fetching data...");
  setTimeout(() => {
    const data = { id: 1 };
    callback(data); // Execute the callback with the result
  }, 1000);
}

fetchData(result => {
  console.log("Data received:", result);
});
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Common Pitfalls</h2>
          <p>Deeply nested callbacks, known as "callback hell" or the "pyramid of doom," make code extremely difficult to read and maintain. Error handling can also be inconsistent. For these reasons, modern JavaScript heavily favors Promises and async/await for handling asynchronous tasks.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is "callback hell"?</li>
            <li>How would you convert a callback-based function to a Promise?</li>
            <li>Is \`Array.prototype.map\` an example of a synchronous or asynchronous callback pattern?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Glossary/Callback_function" target="_blank">MDN — Callback function</a></li>
            <li><a class="text-blue-300" href="http://callbackhell.com/" target="_blank">Callback Hell</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Higher-Order Functions",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I leverage higher-order functions—functions that operate on other functions—to write more abstract and reusable code. Common examples I use are map, filter, and reduce, as well as creating functions that return other functions, like in closures."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A higher-order function (HOF) is a function that either takes one or more functions as arguments, or returns a function as its result. This is possible because functions are treated as first-class citizens in JavaScript.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// 1. Takes a function as an argument (e.g., filter)
const numbers = [1, 2, 3, 4, 5];
const isEven = (n) => n % 2 === 0;
const evens = numbers.filter(isEven); // .filter is a HOF
console.log(evens);

// 2. Returns a function
function createMultiplier(factor) {
  // This returns a new function
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(10)); // 20
console.log(triple(10)); // 30
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Higher-order functions are a core concept of functional programming. They allow you to create flexible and reusable abstractions, compose complex logic from simple building blocks, and write more declarative code that focuses on *what* to do rather than *how* to do it (e.g., using \`map\` instead of a manual \`for\` loop).</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What does it mean for functions to be "first-class citizens"?</li>
            <li>Can you explain how \`Array.prototype.reduce\` is a higher-order function?</li>
            <li>What is function composition and how do HOFs enable it?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://eloquentjavascript.net/05_higher_order_functions.html" target="_blank">Eloquent JavaScript — Higher-Order Functions</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/a-quick-intro-to-higher-order-functions-in-javascript-1a014f89c6b/" target="_blank">freeCodeCamp — Intro to HOFs</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "IIFE (Immediately Invoked Function Expression)",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "An IIFE is a function that is executed right after it's created. In the past, I've seen it used to create a private scope and avoid polluting the global namespace, but this pattern is less common now due to ES6 modules."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>An IIFE (Immediately Invoked Function Expression) is a design pattern where a function is defined and then immediately executed. It's created by wrapping a function expression in parentheses, followed by another set of parentheses to invoke it.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const globalVar = 'I am global';

(function() {
  // This variable is private to the IIFE's scope
  const privateVar = 'I am private';
  
  // It can access global variables
  console.log(globalVar); 
  console.log(privateVar);
})();

try {
  // This will fail because privateVar is not in the global scope
  console.log(privateVar); 
} catch(e) {
  console.error('privateVar is not accessible globally.');
}
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Historically, IIFEs were the primary way to achieve data privacy and modularity in JavaScript before the introduction of block-scoped variables (\`let\`/\`const\`) and ES6 modules. While less necessary for new codebases that use modules, they are still prevalent in older code and libraries, making them important to recognize and understand.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Why is the function wrapped in parentheses?</li>
            <li>How can you pass arguments into an IIFE?</li>
            <li>Why are ES6 modules generally preferred over IIFEs for encapsulation today?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Glossary/IIFE" target="_blank">MDN — IIFE</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/iife" target="_blank">javascript.info — IIFE</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Arrow Functions",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use arrow functions for their concise syntax and lexical 'this' binding. They are ideal for callbacks and array methods like map and filter. I also know their limitations, such as not having their own 'arguments' object and not being suitable for object methods or constructors."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Arrow functions (<code>=></code>) provide a more compact syntax for writing function expressions. Their key feature is that they do not have their own <code>this</code> context; instead, <code>this</code> is inherited from the enclosing (lexical) scope.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Concise syntax
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

// Lexical 'this'
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    // 'this' refers to the Timer instance, not window/undefined
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}

// const myTimer = new Timer(); // Uncomment to run
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">When Not to Use Arrow Functions</h2>
          <ul class="list-disc list-inside ml-4 text-gray-300">
             <li><strong>Object methods:</strong> When you need <code>this</code> to refer to the object itself.</li>
             <li><strong>Constructors:</strong> Arrow functions cannot be used with the <code>new</code> keyword.</li>
             <li><strong>Event handlers needing <code>this</code>:</strong> If you need <code>this</code> to be the DOM element that triggered the event.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference in \`this\` binding between a regular function and an arrow function?</li>
            <li>Can an arrow function be used as a generator?</li>
            <li>What happens if you try to access the \`arguments\` object inside an arrow function?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" target="_blank">MDN — Arrow functions</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/arrow-functions-basics" target="_blank">javascript.info — Arrow functions basics</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Array.filter()",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use filter() to create a new array containing only the elements that pass a test I provide as a function. It's a declarative, non-mutating method that makes my data manipulation code cleaner and more readable."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>filter()</code> method creates a <strong>shallow copy</strong> of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided callback function.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-36 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const products = [
  { name: 'Laptop', price: 1200, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true },
];

// Find all products that are in stock
const availableProducts = products.filter(p => p.inStock);
console.log(availableProducts);

// Find all expensive products
const expensiveProducts = products.filter(p => p.price > 100);
console.log(expensiveProducts);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p><code>filter()</code> is a fundamental tool for functional programming in JavaScript. It allows for expressive, declarative data filtering without manual loops and temporary arrays. Chaining it with other methods like <code>map()</code> and <code>reduce()</code> creates powerful and readable data processing pipelines.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What value does the callback function need to return to keep an element?</li>
            <li>How is \`filter()\` different from \`find()\`?</li>
            <li>Does \`filter()\` modify the original array?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="_blank">MDN — Array.prototype.filter()</a></li>
            <li><a class="text-blue-300" href="https://www.w3schools.com/jsref/jsref_filter.asp" target="_blank">W3Schools — JavaScript Array filter()</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Array.reduce()",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use reduce() to execute a reducer function on each element of an array, resulting in a single output value. It's powerful for summarizing data, like summing numbers or flattening an array, and I'm always sure to provide an initial value."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>reduce()</code> method applies a function (the "reducer") against an accumulator and each element in the array (from left to right) to reduce it to a single value. It's one of the most versatile array methods.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const numbers = [1, 2, 3, 4, 5];

// Summing an array
// accumulator starts at 0, current is each number in the array
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log('Sum:', sum); // 15

// Grouping objects by a property
const people = [
  { name: 'Alice', group: 'A' },
  { name: 'Bob', group: 'B' },
  { name: 'Charlie', group: 'A' },
];
const grouped = people.reduce((acc, person) => {
  (acc[person.group] = acc[person.group] || []).push(person);
  return acc;
}, {});
console.log('Grouped:', grouped);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>While \`map\` and \`filter\` handle specific transformations, \`reduce\` is a general-purpose tool that can implement any array transformation. Mastering it allows you to solve a wide variety of data manipulation problems elegantly, from simple calculations to complex data restructuring.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What are the four arguments passed to the reducer callback? (accumulator, currentValue, index, array)</li>
            <li>What happens if you don't provide an initial value to \`reduce()\`?</li>
            <li>Can you implement \`map()\` or \`filter()\` using \`reduce()\`?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" target="_blank">MDN — Array.prototype.reduce()</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/the-ultimate-guide-to-javascript-array-methods-reduce/" target="_blank">freeCodeCamp — Guide to Reduce</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Set",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use the Set object to store collections of unique values. It's highly efficient for tasks like removing duplicates from an array or checking for the presence of an item."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A <code>Set</code> is a collection of values where each value must be unique. It can store any type of value, whether primitive or object references. The <code>has()</code> method provides a performant way to check for membership.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const numbers = [1, 2, 2, 3, 4, 4, 5];

// Removing duplicates from an array
const uniqueNumbersSet = new Set(numbers);
const uniqueNumbersArray = [...uniqueNumbersSet];
console.log(uniqueNumbersArray); // [1, 2, 3, 4, 5]

// Using Set methods
const mySet = new Set();
mySet.add('hello');
mySet.add('world');
mySet.add('hello'); // This is ignored

console.log(mySet.size); // 2
console.log(mySet.has('world')); // true
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Using a <code>Set</code> for checking membership (\`.has()\`) is generally faster than using an array's <code>.includes()</code> method, especially for large collections. Its guarantee of uniqueness makes it the perfect tool for deduplication and managing unique lists of items, like user IDs or tags.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How does a Set determine if two objects are the same? (It uses the SameValueZero algorithm, similar to === )</li>
            <li>What is the difference between a Set and a WeakSet?</li>
            <li>How can you iterate over the values in a Set?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank">MDN — Set</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/map-set" target="_blank">javascript.info — Map and Set</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Map",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use the Map object for key-value collections, especially when I need keys that aren't strings or when I need to maintain insertion order. It offers better performance for frequent additions and removals compared to a plain object."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>Map</code> object holds key-value pairs and remembers the original insertion order of the keys. Unlike a plain <code>Object</code>, any value (both objects and primitive values) may be used as either a key or a value.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const myMap = new Map();

const keyObject = { id: 1 };
const keyFunc = () => {};

// Set values using different key types
myMap.set('a string', 'value for string');
myMap.set(keyObject, 'value for object');
myMap.set(keyFunc, 'value for function');

console.log(myMap.size); // 3
console.log(myMap.get(keyObject)); // 'value for object'

// Iterating over a map preserves order
for (const [key, value] of myMap) {
  console.log(\`\${typeof key}: \${value}\`);
}
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p><code>Map</code> is a superior data structure to plain <code>Object</code>s for dictionary/hash map use cases. Its ability to use non-string keys is powerful for associating metadata with objects without modifying them. The guaranteed insertion order and dedicated <code>.size</code> property also eliminate common pain points of using objects as maps.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What are the main advantages of using a Map over a plain Object?</li>
            <li>What is the difference between a Map and a WeakMap?</li>
            <li>When would you choose a plain Object over a Map? (e.g., for simple, static data structures with string keys)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" target="_blank">MDN — Map</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/map-set" target="_blank">javascript.info — Map and Set</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Promise Combinators",
      difficulty: "Intermediate → Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use Promise combinators like 'Promise.all' and 'Promise.allSettled' to manage multiple asynchronous operations concurrently. 'all' is for when I need all promises to succeed, while 'allSettled' is for when I need to know the outcome of every promise, regardless of failure."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Promise combinators are static methods on the <code>Promise</code> object that help orchestrate multiple promises at once.</p>
          <ul class="list-disc list-inside ml-4 text-gray-300">
            <li><code>Promise.all()</code>: Fulfills when all promises fulfill. Rejects if any promise rejects.</li>
            <li><code>Promise.allSettled()</code>: Fulfills when all promises have settled (either fulfilled or rejected).</li>
            <li><code>Promise.race()</code>: Settles as soon as the first promise settles (fulfills or rejects).</li>
            <li><code>Promise.any()</code>: Fulfills as soon as the first promise fulfills. Rejects if all promises reject.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const p1 = Promise.resolve('Success 1');
const p2 = new Promise(resolve => setTimeout(() => resolve('Success 2'), 500));
const p3 = Promise.reject('Failure!');

// Promise.all - fails fast
Promise.all([p1, p2, p3])
  .then(results => console.log('all success:', results))
  .catch(error => console.error('all error:', error)); // -> 'Failure!'

// Promise.allSettled - never fails
Promise.allSettled([p1, p2, p3])
  .then(results => console.log('allSettled:', results));
// -> [{status: 'fulfilled', ...}, {status: 'fulfilled', ...}, {status: 'rejected', ...}]
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Effectively managing concurrent async operations is crucial for performance. Combinators provide powerful, declarative tools to handle common scenarios without complex manual logic. Choosing the right combinator for the job (e.g., \`all\` for critical data vs. \`allSettled\` for non-critical data) leads to more robust and resilient applications.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Describe a scenario where \`Promise.race()\` would be useful. (e.g., timing out a request)</li>
            <li>What is the key difference between \`Promise.all()\` and \`Promise.any()\`?</li>
            <li>How would you implement \`Promise.all()\` yourself?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all" target="_blank">MDN — Promise.all()</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/promise-api" target="_blank">javascript.info — Promise API</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Recursion",
      difficulty: "Intermediate → Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I understand recursion is a technique where a function calls itself to solve a problem. It's elegant for problems that can be broken down into smaller, self-similar subproblems, like traversing a tree. I'm always mindful of defining a base case to prevent infinite loops and potential stack overflow."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Recursion is a programming pattern where a function calls itself until it reaches a "base case"—a condition that stops the recursion. It's an alternative to iteration (\`for\`/\`while\` loops) for solving certain types of problems.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Factorial with recursion
function factorial(n) {
  // Base case: if n is 1, stop recursion
  if (n === 1 || n === 0) {
    return 1;
  }
  // Recursive step: call itself with a smaller problem
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120 (5 * 4 * 3 * 2 * 1)
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Common Pitfalls</h2>
          <p>The biggest risk with recursion is a stack overflow error, which happens if the recursion goes too deep without hitting a base case. For deep or performance-critical operations, an iterative solution is often safer and more efficient. Some languages support tail-call optimization to mitigate this, but JavaScript's support is limited.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is a "base case" and why is it essential?</li>
            <li>Can every recursive function be rewritten iteratively?</li>
            <li>When would you prefer recursion over an iterative solution? (e.g., problems on tree-like data structures)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://javascript.info/recursion" target="_blank">javascript.info — Recursion and stack</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/what-is-recursion-in-javascript/" target="_blank">freeCodeCamp — What is Recursion</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "instanceof Operator",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use the 'instanceof' operator to check if an object is an instance of a particular class or constructor function. It works by checking for the constructor's 'prototype' property within the object's prototype chain."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>instanceof</code> operator tests to see if the <code>prototype</code> property of a constructor appears anywhere in the prototype chain of an object. The result is a boolean value.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
class Car {}
class Truck extends Car {}

const myCar = new Car();
const myTruck = new Truck();
const myDate = new Date();

console.log(myCar instanceof Car);     // true
console.log(myTruck instanceof Car);   // true (because Truck extends Car)
console.log(myTruck instanceof Truck); // true

console.log(myDate instanceof Car);    // false
console.log(myCar instanceof Object);  // true (all objects inherit from Object)
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p><code>instanceof</code> is a primary tool for type checking custom objects in an object-oriented context. It's more robust than checking a constructor's name, as it correctly handles inheritance. However, it can be tricky when dealing with objects from different realms (e.g., different windows or iframes), as they will have different constructor identities.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Why might \`instanceof\` fail for objects created in a different iframe?</li>
            <li>How is \`instanceof\` different from using \`typeof\` or \`Object.prototype.toString.call()\`?</li>
            <li>Can you create an object that is not an instance of \`Object\`?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof" target="_blank">MDN — instanceof</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/instanceof" target="_blank">javascript.info — Instanceof</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Object Iteration",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "To iterate over objects, I use 'Object.keys()' to get an array of keys, 'Object.values()' for values, or 'Object.entries()' for key-value pairs. I prefer these over 'for...in' loops to avoid iterating over inherited properties."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Plain JavaScript objects are not directly iterable with a <code>for...of</code> loop. The standard way to iterate is to use static <code>Object</code> methods that return arrays of an object's keys, values, or entries, which can then be looped over.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const user = { name: 'John', age: 30, role: 'developer' };

console.log("KEYS:");
for (const key of Object.keys(user)) {
  console.log(key); // name, age, role
}

console.log("\\nVALUES:");
for (const value of Object.values(user)) {
  console.log(value); // 'John', 30, 'developer'
}

console.log("\\nENTRIES (KEY-VALUE PAIRS):");
for (const [key, value] of Object.entries(user)) {
  console.log(\`\${key}: \${value}\`);
}
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Choosing the right iteration method is important for writing clean and bug-free code. Using \`Object.keys/values/entries\` ensures you are only working with the object's "own" properties, not properties inherited from its prototype. This is generally safer and more predictable than using a \`for...in\` loop.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the main difference between a \`for...in\` loop and \`Object.keys()\`?</li>
            <li>In what order do these methods return the properties?</li>
            <li>What do these methods return for non-object values?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://javascript.info/object-keys-values-entries" target="_blank">javascript.info — Object.keys, values, entries</a></li>
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries" target="_blank">MDN — Object.entries()</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Optional Chaining (?.)",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use optional chaining to safely access nested properties of an object without having to write verbose checks for null or undefined at each level. If any part of the chain is nullish, the entire expression short-circuits to undefined."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The optional chaining operator (<code>?.</code>) permits reading the value of a property located deep within a chain of connected objects without having to explicitly validate that each reference in the chain is valid. It returns <code>undefined</code> if a reference is null or undefined.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-ray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const user = {
  name: 'Alice',
  profile: {
    age: 25,
    // address is missing
  }
};

// Without optional chaining (verbose)
const streetOld = user.profile && user.profile.address && user.profile.address.street;
console.log('Old way:', streetOld); // undefined

// With optional chaining (clean)
const streetNew = user.profile?.address?.street;
console.log('New way:', streetNew); // undefined

// Also works with function calls
const admin = { getPermissions: () => ['read', 'write'] };
const guest = {};
console.log(admin.getPermissions?.()); // ['read', 'write']
console.log(guest.getPermissions?.()); // undefined
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Optional chaining dramatically cleans up code that deals with potentially non-existent data, such as API responses or complex configuration objects. It replaces long, error-prone chains of logical AND operators (<code>&&</code>) with a simple, readable syntax, reducing bugs and improving code clarity.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What happens if you try to assign a value using optional chaining? (e.g., \`user?.profile?.age = 30\`)</li>
            <li>How does optional chaining work with the nullish coalescing operator (\`??\`)?</li>
            <li>Is optional chaining the same as the logical OR operator (\`||\`)?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining" target="_blank">MDN — Optional chaining</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/optional-chaining" target="_blank">javascript.info — Optional chaining</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Nullish Coalescing Operator (??)",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use the nullish coalescing operator (??) to provide a default value for a variable only when it's null or undefined. Unlike the logical OR (||) operator, it correctly treats falsy values like 0, false, and empty strings as valid."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The nullish coalescing operator (<code>??</code>) is a logical operator that returns its right-hand side operand when its left-hand side operand is <code>null</code> or <code>undefined</code>, and otherwise returns its left-hand side operand.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const settings = { speed: 0, enabled: false };

// Using || (logical OR) - gives wrong result for 0 and false
const animationSpeed = settings.speed || 50; // 50 (incorrect)
const isEnabled = settings.enabled || true;  // true (incorrect)
console.log(\`Speed (||): \${animationSpeed}, Enabled (||): \${isEnabled}\`);

// Using ?? (nullish coalescing) - gives correct result
const correctSpeed = settings.speed ?? 50; // 0 (correct)
const correctlyEnabled = settings.enabled ?? true; // false (correct)
const volume = settings.volume ?? 100; // 100 (correct, volume is undefined)
console.log(\`Speed (??): \${correctSpeed}, Enabled (??): \${correctlyEnabled}, Volume: \${volume}\`);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>The logical OR (<code>||</code>) operator has a long-standing bug when used for default values: it incorrectly overrides valid inputs that happen to be falsy (like <code>0</code>, <code>false</code>, or <code>''</code>). The nullish coalescing operator was introduced to fix this problem, leading to more robust and predictable code when handling user input, API data, or configurations.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between \`??\` and \`||\`?</li>
            <li>Can you combine \`??\` with \`&&\` or \`||\` operators without parentheses?</li>
            <li>How does \`??=\` (logical nullish assignment) work?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator" target="_blank">MDN — Nullish coalescing operator</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/nullish-coalescing-operator" target="_blank">javascript.info — Nullish coalescing operator</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Array.slice() vs. Array.splice()",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I know the key difference: 'slice()' is non-mutating and returns a shallow copy of a portion of an array, while 'splice()' is mutating and changes the contents of an array by removing, replacing, or adding elements. I use 'slice()' for safe copying and 'splice()' when I intentionally need to modify the array in place."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><code>slice()</code> extracts a section of an array and returns a new array without modifying the original. <code>splice()</code> changes the original array by adding or removing elements and returns an array containing the deleted elements.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

// --- slice() --- (Non-mutating)
const sliced = animals.slice(2, 4); // Get elements from index 2 up to (but not including) 4
console.log('Sliced:', sliced); // ['camel', 'duck']
console.log('Original after slice:', animals); // Original is unchanged

// --- splice() --- (Mutating)
const months = ['Jan', 'March', 'April', 'June'];
// Insert 'Feb' at index 1
const spliced = months.splice(1, 0, 'Feb');
console.log('Spliced return (deleted items):', spliced); // []
console.log('Original after splice:', months); // Original is changed
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Confusing these two methods is a common source of bugs. Mutating arrays unexpectedly can lead to unpredictable application state and side effects that are hard to debug. In modern functional patterns and frameworks like React, immutability is key, making <code>slice()</code> the far more common and safer choice.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How can you use \`slice()\` to create a shallow copy of an entire array?</li>
            <li>What do negative indexes mean in \`slice()\`?</li>
            <li>How can you use \`splice()\` to both remove and add elements in one operation?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" target="_blank">MDN — Array.prototype.slice()</a></li>
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" target="_blank">MDN — Array.prototype.splice()</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "The Event Loop",
      difficulty: "Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I understand the JavaScript event loop model. It processes tasks from the macrotask queue (like setTimeout, I/O) and the microtask queue (like Promise.then, queueMicrotask). I know that all microtasks are executed after the current script and before the next macrotask, which is crucial for predicting the behavior of asynchronous code."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The event loop is a mechanism that allows JavaScript, a single-threaded language, to handle non-blocking asynchronous operations. It continuously checks if the call stack is empty and then processes tasks from the task queues (first all microtasks, then one macrotask).</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
console.log('1. Start');

// Macrotask
setTimeout(() => console.log('5. Macrotask: setTimeout'), 0);

// Microtask
Promise.resolve().then(() => console.log('3. Microtask: Promise.then'));

// Microtask
queueMicrotask(() => console.log('4. Microtask: queueMicrotask'));

console.log('2. End');

// Expected output order: 1, 2, 3, 4, 5
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>A deep understanding of the event loop is what separates junior from senior developers. It's essential for reasoning about complex asynchronous flows, debugging tricky timing issues, and optimizing performance by understanding how rendering is tied to the task queues. It explains why a <code>Promise.then</code> runs before a <code>setTimeout</code> with a zero-millisecond delay.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What's the difference between a microtask and a macrotask?</li>
            <li>Can a microtask schedule another microtask? What is the effect?</li>
            <li>How does \`async/await\` interact with the event loop and microtask queue?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop" target="_blank">MDN — The Event Loop</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/event-loop" target="_blank">javascript.info — Event loop: microtasks and macrotasks</a></li>
            <li><a class="text-blue-300" href="https://www.youtube.com/watch?v=8aGhZQkoFbQ" target="_blank">JSConf — What the heck is the event loop anyway? (Video)</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Debounce & Throttle",
      difficulty: "Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use debounce and throttle to control how often a function is executed, which is critical for performance. Debounce groups a burst of events into one, while throttle ensures a function runs at most once per specified interval. I'd use debounce for search input and throttle for scroll or resize events."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><strong>Debounce</strong>: Delays invoking a function until after a certain amount of time has passed without that function being called. Good for "final" events.
          <br><strong>Throttle</strong>: Invokes a function at most once per a specified period, guaranteeing a regular execution rate. Good for continuous events.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function handleInput(event) {
  console.log('Debounced search for:', event.target.value);
}

// Attach to a text input element
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', debounce(handleInput, 500));
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Without these techniques, frequently-firing events (like \`resize\`, \`scroll\`, \`input\`) can trigger hundreds of expensive function calls (e.g., API requests, complex DOM updates), overwhelming the browser and creating a laggy user experience. Implementing debounce or throttle is a fundamental performance optimization for web applications.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Can you write a basic implementation of \`throttle\`?</li>
            <li>When would you choose debounce over throttle, and vice-versa?</li>
            <li>What is \`requestAnimationFrame\` and how can it be used for throttling animations?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://css-tricks.com/the-difference-between-throttling-and-debouncing/" target="_blank">CSS-Tricks — The Difference Between Throttling and Debouncing</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/call-apply-decorators#throttling-and-debouncing" target="_blank">javascript.info — Throttling and Debouncing</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Rest Operator (...)",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use the rest parameter syntax to represent an indefinite number of arguments as an array. This allows me to create functions that accept a variable number of inputs and makes the code cleaner than using the old 'arguments' object."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The rest parameter syntax (<code>...</code>) allows a function to accept an indefinite number of arguments as an array. It must be the last parameter in a function definition. It "collects" the remaining arguments.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// In function arguments
function sum(...theArgs) {
  return theArgs.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// With destructuring
const [first, second, ...others] = [10, 20, 30, 40, 50];
console.log(first);  // 10
console.log(second); // 20
console.log(others); // [30, 40, 50]
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>The rest syntax provides a modern, more readable, and robust way to handle variadic functions compared to the legacy <code>arguments</code> object. Since it produces a true array, you can immediately use array methods like <code>map</code>, <code>filter</code>, and <code>reduce</code> on it without first converting <code>arguments</code> to an array.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between the rest and spread operators? They use the same syntax.</li>
            <li>Why is using the rest parameter preferred over the \`arguments\` object?</li>
            <li>Can you have more than one rest parameter in a function signature?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters" target="_blank">MDN — Rest parameters</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/rest-parameters-spread-syntax" target="_blank">javascript.info — Rest parameters and spread syntax</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Default Parameters",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use default parameters to initialize named parameters with default values if no value or 'undefined' is passed. This makes my functions more robust and eliminates the need for manual checks like 'param = param || defaultValue'."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Default function parameters allow named parameters to be initialized with default values if no value or <code>undefined</code> is passed into the function.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-36 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
function greet(name = 'Guest', greeting = 'Hello') {
  console.log(\`\${greeting}, \${name}!\`);
}

greet('Alice', 'Hi');   // 'Hi, Alice!'
greet('Bob');           // 'Hello, Bob!'
greet();                // 'Hello, Guest!'

// falsy values like null, 0, '' are NOT replaced
greet(null, 'Welcome'); // 'Welcome, null!'
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Default parameters lead to cleaner and more self-documenting function signatures. They reduce boilerplate code inside functions and prevent common errors that arise from missing arguments. Unlike the old ||  pattern, they correctly handle falsy values (like \`0\`, \`false\`, or \`''\`) as valid inputs.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Can a default parameter refer to earlier parameters? (e.g., \`function fn(a, b = a + 1)\`)</li>
            <li>What happens if you pass \`undefined\` to a parameter with a default value?</li>
            <li>How does this differ from using the nullish coalescing operator (\`??\`) inside the function?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters" target="_blank">MDN — Default parameters</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/function-basics#default-values" target="_blank">javascript.info — Default values</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Template Literals",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use template literals, enclosed in backticks, for easier string interpolation and creating multi-line strings. They make the code much more readable than traditional string concatenation with the '+' operator."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Template literals are string literals allowing for embedded expressions. You can use multi-line strings and string interpolation features with them. They are enclosed by backtick (<code>\`</code>) characters instead of single or double quotes.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-36 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const name = "World";
const score = 95;

// String interpolation
const greeting = \`Hello, \${name}! Your score is \${score}.\`;
console.log(greeting);

// Multi-line strings
const htmlBlock = \`
  <div>
    <h1>Welcome</h1>
    <p>This is a multi-line string.</p>
  </div>
\`;
console.log(htmlBlock);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Template literals are a massive quality-of-life improvement for developers. They prevent the awkward and error-prone syntax of string concatenation (e.g., \`'string ' + variable + ' another string'\`) and make creating formatted or multi-line strings (like HTML templates or email bodies) trivial.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is a "tagged template"? Can you give an example?</li>
            <li>Can you embed any valid JavaScript expression inside \${...}?</li>
            <li>How would you include a literal backtick character inside a template literal?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank">MDN — Template literals</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/string#quotes" target="_blank">javascript.info — Strings (Quotes & Literals)</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Factory Functions",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use factory functions as a flexible alternative to constructor functions or classes for creating objects. They don't use 'new' or 'this', which avoids common 'this' binding issues, and they are great for creating objects with private data using closures."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A factory function is any function which is not a class or constructor that returns a new object. In JavaScript, any function can return an object. When it does so without the <code>new</code> keyword, it's a factory function.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
function createPerson(name, age) {
  // Private data via closure
  let _secret = "shhh";

  return {
    name, // property
    age,  // property
    greet() { // method
      console.log(\`Hello, my name is \${this.name}.\`);
    },
    revealSecret() {
        console.log(\`My secret is: \${_secret}\`)
    }
  };
}

const person1 = createPerson('Alice', 30);
person1.greet();
person1.revealSecret();
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Factory functions offer a simpler and often safer way to create objects. They avoid the complexities of <code>this</code> binding and prototype-based inheritance, favoring composition and closures. This can lead to more robust and easier-to-understand code, especially for developers who prefer a more functional programming style.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What are the advantages of factory functions over ES6 classes?</li>
            <li>What are the potential performance downsides compared to classes? (Each object gets its own copy of methods)</li>
            <li>How do factory functions enable data privacy?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://www.javascripttutorial.net/javascript-factory-functions/" target="_blank">JavaScript Tutorial — Factory Functions</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/factory-functions-in-javascript/" target="_blank">freeCodeCamp — Factory Functions in JavaScript</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Object.seal() vs. Object.freeze()",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use 'Object.seal()' and 'Object.freeze()' to control object mutability. 'seal()' prevents adding or deleting properties but allows changing existing values. 'freeze()' is stricter: it seals the object and also makes existing properties read-only. I know both are shallow operations."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><strong><code>Object.seal()</code></strong>: Prevents new properties from being added and marks all existing properties as non-configurable. Values of present properties can still be changed.
          <br><strong><code>Object.freeze()</code></strong>: Does everything <code>seal()</code> does, but also prevents the values of existing properties from being changed.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
'use strict'; // Required to see the errors

const sealedObj = { prop: 'value' };
Object.seal(sealedObj);
sealedObj.prop = 'new value'; // OK
// delete sealedObj.prop; // Throws TypeError
// sealedObj.newProp = 123; // Throws TypeError
console.log('Sealed:', sealedObj.prop);

const frozenObj = { prop: 'value', nested: { a: 1 } };
Object.freeze(frozenObj);
// frozenObj.prop = 'new value'; // Throws TypeError
frozenObj.nested.a = 2; // This is allowed (shallow freeze)
console.log('Frozen:', frozenObj.nested.a);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>These methods are essential tools for creating immutable or partially immutable objects, which helps prevent accidental state modifications and makes code more predictable. While <code>const</code> prevents reassignment of a variable, <code>Object.freeze()</code> prevents mutation of the object itself, which is a crucial distinction for robust state management.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What does "shallow" mean in this context? How would you deep-freeze an object?</li>
            <li>What does it mean for a property to be "non-configurable"?</li>
            <li>When would you use \`seal()\` instead of \`freeze()\`?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze" target="_blank">MDN — Object.freeze()</a></li>
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal" target="_blank">MDN — Object.seal()</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Symbols",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use Symbols to create unique property keys that are guaranteed not to clash with other keys. This is particularly useful for adding metadata to objects from third-party libraries or for defining well-known behaviors like 'Symbol.iterator'."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A <code>Symbol</code> is a primitive data type introduced in ES6. Its values are unique and immutable. A symbol is created by calling the global <code>Symbol()</code> factory function.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const idSymbol = Symbol('id');
const anotherId = Symbol('id');

console.log(idSymbol === anotherId); // false, despite the same description

const user = {
  name: 'Alice',
  [idSymbol]: 'xyz-123' // Use a symbol as a unique property key
};

console.log(user[idSymbol]); // 'xyz-123'

// Symbol properties are ignored by JSON.stringify and for...in loops
console.log(Object.keys(user)); // ['name']
console.log(JSON.stringify(user)); // {"name":"Alice"}
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Symbols provide a mechanism for creating "hidden" or meta-properties on objects, preventing accidental name collisions in a shared namespace. This is crucial for library authors who need to add properties to objects without risking conflicts with user-defined properties. They also power core JavaScript features, like making an object iterable by implementing the <code>Symbol.iterator</code> method.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How do you retrieve symbol properties from an object? (\`Object.getOwnPropertySymbols()\`)</li>
            <li>What are "well-known symbols" and can you name one? (\`Symbol.iterator\`, \`Symbol.asyncIterator\`)</li>
            <li>What is the purpose of the \`Symbol.for()\` method?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol" target="_blank">MDN — Symbol</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/symbol" target="_blank">javascript.info — Symbol type</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "setTimeout & setInterval",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use 'setTimeout' to execute a function once after a delay and 'setInterval' to execute it repeatedly at a fixed interval. I always capture the timer ID so I can cancel it with 'clearTimeout' or 'clearInterval' to prevent memory leaks, especially in components that unmount."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><strong><code>setTimeout(callback, delay)</code></strong>: Schedules a function to run once after the specified delay in milliseconds.
          <br><strong><code>setInterval(callback, delay)</code></strong>: Schedules a function to run repeatedly, with the specified delay between each execution.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// setTimeout example
const timeoutId = setTimeout(() => {
  console.log("This runs only once after 1.5 seconds.");
}, 1500);
// clearTimeout(timeoutId); // Uncomment to cancel

// setInterval example
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(\`Interval tick: \${count}\`);
  if (count >= 3) {
    clearInterval(intervalId); // Crucial to stop the interval
    console.log("Interval cleared.");
  }
}, 1000);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Timers are fundamental to asynchronous programming in JavaScript. Proper management is critical to avoid memory leaks and performance issues. Forgetting to clear an interval or timeout (especially in Single-Page Applications where components are frequently created and destroyed) can lead to unexpected behavior and functions running long after they are no longer needed.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Is the delay in \`setTimeout\` guaranteed? Why or why not?</li>
            <li>What happens if the execution of an \`setInterval\` callback takes longer than the delay?</li>
            <li>When would you prefer \`setTimeout\` in a recursive loop over \`setInterval\`?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/API/setTimeout" target="_blank">MDN — setTimeout</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/settimeout-setinterval" target="_blank">javascript.info — Scheduling: setTimeout and setInterval</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Temporal Dead Zone (TDZ)",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm aware of the Temporal Dead Zone for 'let' and 'const' variables. It's the period between entering a scope and the variable's declaration, during which the variable cannot be accessed. This helps prevent bugs by ensuring a variable is never used before it's declared."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The Temporal Dead Zone (TDZ) is the term to describe the state where variables are un-reachable. They are in scope, but they have not been declared yet. Variables declared with <code>let</code> and <code>const</code> are hoisted, but they are not initialized to <code>undefined</code>. Accessing them before the declaration results in a <code>ReferenceError</code>.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Using var (no TDZ)
console.log(myVar); // undefined
var myVar = 5;

// Using let (in TDZ)
try {
  // Start of block scope
  // TDZ for myLet starts here
  console.log(myLet); // ReferenceError!
  
  let myLet = 10; // End of TDZ for myLet
  // TDZ for myLet ends here
} catch (e) {
  console.error(e.message);
}
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>The TDZ enforces a stricter, more logical variable declaration discipline. It catches potential bugs where a variable might be accidentally used before its intended value has been assigned. This makes code more robust and easier to reason about compared to the sometimes confusing behavior of \`var\` hoisting.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How does hoisting for \`let\`/\`const\` differ from hoisting for \`var\`?</li>
            <li>Does the TDZ apply to function parameters with default values?</li>
            <li>What is the difference between an "undeclared" variable and a variable in the TDZ?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz" target="_blank">MDN — Temporal Dead Zone</a></li>
            <li><a class="text-blue-300" href="https://2ality.com/2013/10/temporal-dead-zone.html" target="_blank">2ality — The Temporal Dead Zone</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Web Workers",
      difficulty: "Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "To prevent heavy computations from blocking the main thread and freezing the UI, I use Web Workers. They run a script in a background thread, and I communicate with them using a message-passing system, ensuring the UI remains responsive."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A Web Worker is a simple means for web content to run scripts in a background thread. The worker thread can perform tasks without interfering with the user interface. Workers communicate with the main thread via the <code>postMessage()</code> method and the <code>onmessage</code> event handler.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// --- main.js ---
// Create a new worker
const myWorker = new Worker('worker.js');

// Listen for messages from the worker
myWorker.onmessage = function(e) {
  console.log('Message received from worker:', e.data);
};

// Send a message to the worker
myWorker.postMessage('Start calculation');

// --- worker.js (in a separate file) ---
// self.onmessage = function(e) {
//   console.log('Message received from main script:', e.data);
//   let result = 0;
//   for (let i = 0; i < 1e9; i++) { // Heavy task
//     result += i;
//   }
//   self.postMessage(result);
// };
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Since JavaScript is single-threaded, any long-running, synchronous task will block the main thread, freezing the entire webpage and creating a terrible user experience. Web Workers are the standard solution for offloading these heavy tasks (e.g., complex calculations, data processing, image filtering) to a separate thread, keeping the UI smooth and interactive.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What can you not do inside a Web Worker? (e.g., directly access the DOM)</li>
            <li>What is a "Shared Worker" and how does it differ from a dedicated worker?</li>
            <li>How do you handle errors in a Web Worker?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers" target="_blank">MDN — Using Web Workers</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/web-workers" target="_blank">javascript.info — Web Workers</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Performance & Memory Basics",
      difficulty: "Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I prioritize performance by minimizing DOM manipulation, especially inside loops, and using techniques like event delegation. To prevent memory leaks, I'm diligent about cleaning up event listeners, timers, and object references, particularly in component-based frameworks when components unmount."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Writing performant JavaScript involves understanding how the browser works. Key areas include minimizing DOM reflows/repaints, optimizing loops, and using efficient data structures. Memory management involves ensuring that objects are garbage collected once they are no longer needed to prevent memory leaks.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Common Areas of Focus</h2>
          <ul class="list-disc list-inside ml-4 text-gray-300 space-y-2">
            <li><strong>DOM Performance:</strong> Batch DOM updates. Reading properties like <code>offsetHeight</code> can trigger a reflow. Use DocumentFragments to append multiple elements at once.</li>
            <li><strong>Event Handling:</strong> Use event delegation. Debounce or throttle handlers for frequent events like <code>scroll</code> or <code>resize</code>.</li>
            <li><strong>Memory Leaks:</strong>
                <ul class="list-['-_'] list-inside ml-6">
                    <li><strong>Dangling Timers:</strong> Un-cleared \`setInterval\` or \`setTimeout\` calls.</li>
                    <li><strong>Detached DOM Nodes:</strong> Keeping references to DOM elements that have been removed from the document.</li>
                    <li><strong>Accidental Globals:</strong> Variables created without \`let/const/var\` in non-strict mode.</li>
                    <li><strong>Closure Leaks:</strong> Closures that inadvertently keep large objects in memory.</li>
                </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Poor performance leads to a laggy, unresponsive UI, which is a primary reason users abandon a website. Memory leaks can cause the application to slow down over time and eventually crash the browser tab. Proactively managing performance and memory is a hallmark of a professional developer.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between a reflow and a repaint?</li>
            <li>How would you use the Chrome DevTools Performance tab to identify a performance bottleneck?</li>
            <li>Can you describe how JavaScript's garbage collection works at a high level?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management" target="_blank">MDN — Memory Management</a></li>
            <li><a class="text-blue-300" href="https://web.dev/articles/rendering-performance" target="_blank">web.dev — Rendering Performance</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "DOM Manipulation",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm comfortable with core DOM manipulation methods. I use 'querySelector' and 'querySelectorAll' for selecting elements, 'createElement' and 'appendChild' for adding them, and methods like 'classList.add' or 'setAttribute' to modify them. For performance, I batch multiple changes using DocumentFragments."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>DOM (Document Object Model) manipulation is how JavaScript interacts with the content of a webpage. It involves finding, creating, adding, modifying, and removing HTML elements programmatically.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Find an existing element
const container = document.querySelector('#container');

// Create a new element
const newHeader = document.createElement('h2');
newHeader.textContent = 'I was created by JS!';

// Modify its attributes and classes
newHeader.setAttribute('id', 'js-header');
newHeader.classList.add('text-blue-500');

// Append it to the DOM
container.appendChild(newHeader);

// Remove an element
// setTimeout(() => container.removeChild(newHeader), 2000);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Direct DOM manipulation is the foundation of dynamic web pages. While modern frameworks like React and Vue abstract much of this away with a virtual DOM, understanding the underlying principles is still essential for performance tuning, working with legacy code, or writing vanilla JS components and libraries.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between \`innerHTML\` and \`textContent\`? Which one is safer?</li>
            <li>What is a \`NodeList\` and how is it different from an \`HTMLCollection\`?</li>
            <li>What is a \`DocumentFragment\` and why is it good for performance?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" target="_blank">MDN — Introduction to the DOM</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/document" target="_blank">javascript.info — The Document</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "event.preventDefault()",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use 'event.preventDefault()' inside an event handler to stop the browser's default action for that event, such as preventing a form submission from reloading the page or stopping a link from navigating."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>preventDefault()</code> method of the <code>Event</code> interface tells the user agent that if the event is not explicitly handled, its default action should not be taken as it normally would be.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-36 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// In your HTML: <form id="myForm"><button type="submit">Submit</button></form>

const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
  // Stop the form from submitting and reloading the page
  event.preventDefault();
  
  console.log('Form submission prevented. Now I can handle it with JS.');
  // ... logic to send data via AJAX/fetch
});
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>This method is fundamental to building Single-Page Applications (SPAs) and dynamic user interfaces. It allows developers to override native browser behaviors and implement custom logic, such as client-side form validation, AJAX-based submissions, and custom routing, without full page reloads.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between \`event.preventDefault()\` and \`event.stopPropagation()\`?</li>
            <li>Can you always prevent the default action? (No, depends on whether the event is cancelable)</li>
            <li>What does \`return false;\` do in some older event handlers (like jQuery)?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault" target="_blank">MDN — Event.preventDefault()</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/default-browser-action" target="_blank">javascript.info — Default browser actions</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Array.from()",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use Array.from() to create a new, shallow-copied Array instance from an array-like or iterable object. It's especially useful for converting things like a NodeList or the 'arguments' object into a real array so I can use methods like 'map' and 'filter'."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><code>Array.from()</code> is a static method that creates a new array from an array-like object (e.g., objects with a <code>length</code> property and indexed elements) or an iterable object (e.g., <code>Map</code>, <code>Set</code>, <code>String</code>). It can also include an optional mapping function.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// From a string
console.log(Array.from('hello')); // ['h', 'e', 'l', 'l', 'o']

// From a NodeList (array-like)
// const nodes = document.querySelectorAll('div');
// const nodeArray = Array.from(nodes);
// nodeArray.map(node => ... ); // Now you can use array methods

// Using the mapping function
const arrayLike = { length: 5 };
// Create an array and map it at the same time
const mappedArray = Array.from(arrayLike, (v, i) => i * 2);
console.log(mappedArray); // [0, 2, 4, 6, 8]
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Many browser APIs and older JavaScript features return collections that look like arrays but aren't (e.g., \`document.querySelectorAll\`, the \`arguments\` object). <code>Array.from()</code> provides a robust and standard way to convert these into true arrays, unlocking the full power of array methods and making the code more predictable.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How is \`Array.from()\` different from the spread operator (\`...\`) for creating arrays?</li>
            <li>What makes an object "array-like"?</li>
            <li>Can you create a sequence of numbers using \`Array.from()\`?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from" target="_blank">MDN — Array.from()</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/array-methods#array-from" target="_blank">javascript.info — Array.from</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Array.flat()",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use the flat() method to create a new array with all sub-array elements concatenated into it recursively up to a specified depth. It's a clean, declarative way to flatten nested arrays."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>flat()</code> method creates a new array by flattening nested arrays. It takes an optional <code>depth</code> argument that specifies how deep a nested array structure should be flattened. The default depth is 1.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-36 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const arr1 = [1, 2, [3, 4]];
console.log(arr1.flat()); // [1, 2, 3, 4]

const arr2 = [1, [2, [3, [4]]]];
console.log(arr2.flat()); // [1, 2, [3, [4]]] (only flattens one level)
console.log(arr2.flat(2)); // [1, 2, 3, [4]] (flattens two levels)
console.log(arr2.flat(Infinity)); // [1, 2, 3, 4] (flattens completely)
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Working with nested data structures is common, especially when processing data from APIs or composing lists. <code>flat()</code> provides a built-in, readable, and efficient way to simplify these structures, which previously required complex recursive functions or libraries. It is often combined with <code>map</code> (as <code>flatMap</code>) for powerful data transformations.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the \`flatMap()\` method and how does it differ from using \`map()\` then \`flat()\`?</li>
            <li>Does \`flat()\` modify the original array?</li>
            <li>How are empty slots in arrays handled by \`flat()\`?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat" target="_blank">MDN — Array.prototype.flat()</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/array-methods#flat-flatmap" target="_blank">javascript.info — flat/flatMap</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Array Mutating Methods",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm familiar with mutating array methods like 'push', 'pop', 'shift', and 'unshift'. I understand they modify the array directly and use them cautiously, preferring immutable patterns with methods like 'slice' or spread syntax when working with state."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>These methods directly modify (mutate) the array they are called on.</p>
          <ul class="list-disc list-inside ml-4 text-gray-300">
            <li><code>push(item)</code>: Adds one or more elements to the end of an array.</li>
            <li><code>pop()</code>: Removes the last element from an array.</li>
            <li><code>unshift(item)</code>: Adds one or more elements to the beginning of an array.</li>
            <li><code>shift()</code>: Removes the first element from an array.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
let fruits = ['apple', 'banana'];
console.log('Original:', fruits);

fruits.push('cherry');      // Add to end
console.log('After push:', fruits);

fruits.pop();               // Remove from end
console.log('After pop:', fruits);

fruits.unshift('strawberry'); // Add to beginning
console.log('After unshift:', fruits);

fruits.shift();             // Remove from beginning
console.log('After shift:', fruits);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>These methods are simple and efficient for direct data manipulation, such as managing a queue or a stack. However, their mutating nature can be dangerous when dealing with shared state. In modern JavaScript development, immutable operations are heavily favored to prevent side effects, making it crucial to know when it is (and is not) appropriate to use these methods.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What do these methods return? (\`push\`/\`unshift\` return new length, \`pop\`/\`shift\` return the removed element).</li>
            <li>Which of these methods are generally less performant and why? (\`unshift\`/\`shift\` can be slow on large arrays).</li>
            <li>How would you add an item to an array immutably? (e.g., \`[...arr, newItem]\`).</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://javascript.info/array-methods#add-remove-items" target="_blank">javascript.info — Add/remove items</a></li>
            <li><a class="text-blue-300" href="https://doesitmutate.xyz/" target="_blank">Does it mutate?</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Object.assign()",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use Object.assign() to copy the values of all enumerable own properties from one or more source objects to a target object. I'm aware that it performs a shallow copy and mutates the target object, so for creating a new merged object, I use an empty object as the target."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>Object.assign(target, ...sources)</code> method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const defaults = { theme: 'light', showIcons: true };
const userSettings = { showIcons: false, fontSize: 14 };

// Merge settings into a new object
const finalSettings = Object.assign({}, defaults, userSettings);
console.log(finalSettings); 
// { theme: 'light', showIcons: false, fontSize: 14 }
// Note: userSettings.showIcons overwrites defaults.showIcons

// It performs a shallow copy
const obj1 = { a: 0 , b: { c: 0 } };
const obj2 = Object.assign({}, obj1);
obj2.b.c = 1;
console.log(obj1.b.c); // 1 (nested object was shared)
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Before the spread syntax (<code>...</code>) for objects became standard, <code>Object.assign()</code> was the primary way to merge objects or create shallow clones. It is still widely used in many codebases and polyfills. Understanding its mutating behavior and shallow copy nature is key to using it correctly without introducing bugs.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How is \`Object.assign({}, ...)\` different from the object spread syntax (\`{...}\`)?</li>
            <li>Does \`Object.assign()\` copy properties from the prototype chain?</li>
            <li>What happens if source properties have getters?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign" target="_blank">MDN — Object.assign()</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/object-copy#object-assign" target="_blank">javascript.info — Object.assign</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Generators & Iterators",
      difficulty: "Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use generator functions ('function*') to create iterators for controlling the execution of a function. They can be paused and resumed using the 'yield' keyword, which is powerful for managing streams of data, infinite sequences, and is a core part of libraries like Redux Saga."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A <strong>generator function</strong> (<code>function*</code>) produces a special type of iterator called a Generator. When a generator function is called, it doesn't run its code. Instead, it returns a generator object. You can then call the <code>.next()</code> method on this object to execute the function until it hits a <code>yield</code> expression, which pauses it and returns the yielded value.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++; // Pause and return the current id
  }
}

const gen = idGenerator(); // Get the generator object

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3

// Generators are iterable
function* take(n, iterable) {
  for (const x of iterable) {
    if (n <= 0) return;
    n--;
    yield x;
  }
}

// Create an array of the first 5 IDs
const firstFive = [...take(5, idGenerator())];
console.log(firstFive); // [1, 2, 3, 4, 5]
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Generators provide a powerful alternative to callbacks and Promises for managing asynchronous flows (they were the foundation for \`async/await\`). They are incredibly memory-efficient for working with large or infinite data sequences, as they produce values on demand rather than creating a massive array in memory all at once.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the Iterator Protocol? What does an object need to be iterable?</li>
            <li>How could generators be used to implement \`async/await\`?</li>
            <li>What is the difference between \`yield\` and \`return\` in a generator?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator" target="_blank">MDN — Generator</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/generators" target="_blank">javascript.info — Generators</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "ES Modules (import/export)",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use ES Modules as the standard for structuring my code. I use 'export' to expose functions or variables from a file and 'import' to use them in other files. This creates a clear dependency graph, improves code organization, and is statically analyzable, which helps with tree-shaking."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>ES Modules (ESM) is the official standard module system for JavaScript. It allows you to break up your code into separate, reusable files (modules). You can use <strong>named exports</strong> for multiple values and a <strong>default export</strong> for the primary value of a module.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// --- utils.js ---
export const PI = 3.14; // named export
export function double(n) { // named export
  return n * 2;
}
export default function greet(name) { // default export
  console.log(\`Hello, \${name}\`);
}

// --- main.js ---
// Import named and default exports
import sayHello, { PI, double } from './utils.js';

console.log(PI); // 3.14
console.log(double(10)); // 20
sayHello('World'); // 'Hello, World'

// You can also import everything into a namespace
// import * as utils from './utils.js';
// console.log(utils.PI);
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Modules are the foundation of modern software architecture. They prevent global namespace pollution, enforce encapsulation, and make codebases maintainable and scalable. The static nature of ESM allows build tools to perform "tree-shaking," where unused code is eliminated from the final bundle, resulting in smaller and faster applications.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What's the difference between a named export and a default export? When would you use each?</li>
            <li>How does ESM differ from CommonJS (\`require\`)?</li>
            <li>What are dynamic imports (\`import()\`) and when are they useful?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank">MDN — JavaScript modules</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/modules" target="_blank">javascript.info — Modules, introduction</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Proxy Objects",
      difficulty: "Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I understand that Proxy objects allow me to create a wrapper around another object, which can intercept and redefine fundamental operations like getting a property, setting a property, or calling a function. It's a powerful tool for metaprogramming, like creating validation layers or logging."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>Proxy</code> object enables you to create a proxy for another object (the target), which can intercept and customize operations for that target. These interceptions are implemented using handler functions called "traps".</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const target = {
  name: 'John',
  age: 30
};

const handler = {
  get(obj, prop) {
    console.log(\`Getting property '\${prop}'\`);
    return prop in obj ? obj[prop] : 'Property does not exist';
  },
  set(obj, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number.');
    }
    console.log(\`Setting property '\${prop}' to '\${value}'\`);
    obj[prop] = value;
    return true; // Indicate success
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Logs 'Getting...' and returns 'John'
console.log(proxy.city); // Logs 'Getting...' and returns 'Property does not exist'
proxy.age = 31; // Logs 'Setting...'
// proxy.age = 'thirty'; // Throws TypeError
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Proxies open up a world of advanced possibilities for metaprogramming. They are the engine behind reactivity systems in modern frameworks (like Vue 3), and can be used to build powerful validation layers, logging utilities, object observation, and much more, without altering the original object's code.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the \`Reflect\` API and how does it relate to Proxy?</li>
            <li>What is a "trap" in the context of a Proxy?</li>
            <li>What are some potential performance implications of using Proxies heavily?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" target="_blank">MDN — Proxy</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/proxy" target="_blank">javascript.info — Proxy and Reflect</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Fetch API",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "For making network requests, I use the modern Fetch API. It's a Promise-based interface that provides a more powerful and flexible feature set than the older XMLHttpRequest. I know how to handle different request methods like POST, set headers, and process the response body."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It uses Promises to deliver a more flexible and powerful API for making network requests in both browsers and Node.js.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">


const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

async function fetchData() {
  try {
    const response = await fetch(API_URL);

    // Fetch does not reject on HTTP errors (like 404, 500)
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }

    const data = await response.json(); // Parse the response body as JSON
    console.log(data);
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
}

fetchData();
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>The Fetch API is the modern standard for client-server communication in web development. Mastering it is essential for building any application that interacts with APIs. Understanding its Promise-based nature and how to properly handle both network errors and HTTP error statuses is crucial for writing robust asynchronous code.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How does \`fetch\` handle errors compared to libraries like Axios?</li>
            <li>How would you send a \`POST\` request with a JSON body using \`fetch\`?</li>
            <li>What is CORS and how does it relate to using \`fetch\`?(Node JS -> next week)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" target="_blank">MDN — Using the Fetch API</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/fetch" target="_blank">javascript.info — Fetch</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Getters and Setters",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use getters and setters to create computed properties on an object. A getter runs when a property is read, and a setter runs when it's assigned, allowing me to add logic like validation or side effects while maintaining a simple property-access syntax."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Getters and setters are special methods that provide read and write access to an object's properties. A <strong>getter</strong> (<code>get</code>) is a method that gets the value of a specific property. A <strong>setter</strong> (<code>set</code>) is a method that sets the value of a specific property.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const user = {
  firstName: 'John',
  lastName: 'Doe',
  
  get fullName() {
    console.log('Getting full name...');
    return \`\${this.firstName} \${this.lastName}\`;
  },

  set fullName(value) {
    if (typeof value !== 'string' || value.split(' ').length !== 2) {
        throw new Error('Invalid full name format.');
    }
    console.log('Setting full name...');
    [this.firstName, this.lastName] = value.split(' ');
  }
};

console.log(user.fullName); // Calls the getter
user.fullName = 'Jane Smith'; // Calls the setter
console.log(user.firstName); // 'Jane'
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Getters and setters provide a clean API for interacting with object state. They allow you to add validation, logging, or calculation logic behind what looks like a simple property access, hiding the implementation details and making the object easier to use while maintaining control over its internal state.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between a getter and a regular method?</li>
            <li>How can you define getters and setters within an ES6 class?</li>
            <li>What is a common use case for a setter? (e.g., data validation, updating a UI element)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get" target="_blank">MDN — get</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/property-accessors" target="_blank">javascript.info — Property getters and setters</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Error Handling (try...catch...finally)",
      difficulty: "Beginner → Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "For handling runtime errors, I use the 'try...catch...finally' statement. I place code that might fail in the 'try' block, handle the error in the 'catch' block, and use the 'finally' block for any cleanup code that must run, regardless of whether an error occurred."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>try...catch</code> statement marks a block of statements to try and specifies a response should an exception be thrown. The optional <code>finally</code> block executes after <code>try</code> and <code>catch</code>, regardless of the outcome. It's crucial for both synchronous code and for handling errors with \`async/await\`.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
function parseJson(jsonString) {
  let resource; // Resource that needs cleanup
  try {
    console.log("Attempting to parse JSON...");
    resource = 'OPEN'; // e.g., open a file or connection
    const data = JSON.parse(jsonString);
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Caught an error:", error.message);
    // return a default value or re-throw
  } finally {
    // This runs whether there was an error or not
    console.log("Finally block executed. Cleaning up resource.");
    resource = 'CLOSED';
  }
}

parseJson('{"name":"valid"}');
parseJson('{invalid json}');
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Proper error handling is fundamental to creating resilient applications. Without it, a single runtime error can crash your entire script. \`try...catch\` provides a structured way to gracefully handle exceptions, log them for debugging, and ensure the application can recover or fail in a predictable way. The \`finally\` block is essential for resource cleanup to prevent memory leaks.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the \`error\` object passed to the \`catch\` block? What properties does it have?</li>
            <li>Can you have a \`try\` block without a \`catch\` block? (Yes, if you have \`finally\`).</li>
            <li>How does error handling with \`try...catch\` compare to using \`.catch()\` with Promises?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" target="_blank">MDN — try...catch</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/try-catch" target="_blank">javascript.info — Error handling, "try...catch"</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Web Storage (localStorage & sessionStorage)",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use the Web Storage API for simple client-side data persistence. I use 'localStorage' for data that should persist across browser sessions and 'sessionStorage' for data that should be cleared when the tab is closed. I know it's a synchronous API for string-based key-value pairs."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><strong><code>localStorage</code></strong>: Stores data with no expiration date. The data will not be deleted when the browser is closed and will be available in the next session. Just like how I track your progress and your own topics in this website.
          <br><strong><code>sessionStorage</code></strong>: Stores data for one session only. The data is deleted when the browser tab is closed.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// --- localStorage ---
localStorage.setItem('theme', 'dark');
const currentTheme = localStorage.getItem('theme');
console.log('Saved theme:', currentTheme);
// localStorage.removeItem('theme');
// localStorage.clear(); // Clears all items

// --- sessionStorage ---
sessionStorage.setItem('session-id', 'abc-123');
console.log('Session ID:', sessionStorage.getItem('session-id'));

// Storing objects requires serialization
const userPrefs = { notifications: true, volume: 80 };
localStorage.setItem('prefs', JSON.stringify(userPrefs));
const retrievedPrefs = JSON.parse(localStorage.getItem('prefs'));
console.log(retrievedPrefs.volume); // 80
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Web Storage is an essential tool for creating a stateful user experience, allowing you to save user preferences, session information, or cached data directly in the browser. It's simpler to use than cookies but has its own limitations, such as a 5-10MB storage limit and being a synchronous API, which means heavy usage can block the main thread.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What are the main differences between localStorage and cookies?</li>
            <li>What happens if you try to store a non-string value in localStorage?</li>
            <li>When would you choose sessionStorage over localStorage? (e.g., for multi-step form data).</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API" target="_blank">MDN — Web Storage API</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/localstorage" target="_blank">javascript.info — localStorage, sessionStorage</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Cross-Origin Resource Sharing (CORS)",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I understand that CORS is a security mechanism enforced by browsers that controls how a web page from one origin can request resources from another origin. I know that fixing CORS errors typically requires server-side changes, like adding the 'Access-Control-Allow-Origin' header, and I'm familiar with preflight requests for non-simple requests."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>CORS is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Common Scenario</h2>
          <p>You have a frontend application on <code>https://my-app.com</code>. You try to use <code>fetch</code> to get data from an API on <code>https://api.my-service.com</code>. The browser will block this request unless the server at <code>api.my-service.com</code> sends back a response header like:</p>
          <div class="bg-gray-900 text-sm p-3 rounded-xl border border-gray-700">
            <pre><code class="text-white">Access-Control-Allow-Origin: https://my-app.com</code></pre>
            <p class="text-gray-400 mt-2">...or more permissively:</p>
            <pre><code class="text-white">Access-Control-Allow-Origin: *</code></pre>
          </div>
          <p class="mt-2">For requests with methods other than GET/POST/HEAD or with custom headers, the browser first sends a "preflight" <code>OPTIONS</code> request to check for permission before sending the actual request.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>CORS errors are one of the most common frustrations for web developers. Understanding that CORS is a browser-enforced security feature, not a server bug, is the first step. Knowing how it works helps you debug API integration issues and communicate effectively with backend developers about the required server configurations.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is a "simple request" vs. a "preflighted request"?</li>
            <li>Is a CORS error a client-side or server-side issue?</li>
            <li>How can you work around CORS issues during local development? (e.g., using a proxy server).</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank">MDN — CORS</a></li>
            <li><a class="text-blue-300" href="https://web.dev/articles/cross-origin-resource-sharing" target="_blank">web.dev — Cross-Origin Resource Sharing</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "JSON (stringify & parse)",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I frequently use 'JSON.stringify()' to convert JavaScript objects into a JSON string for sending to a server or storing in localStorage, and 'JSON.parse()' to convert a JSON string back into a JavaScript object when receiving data."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>JSON (JavaScript Object Notation) is a lightweight data-interchange format.
          <br><strong><code>JSON.stringify(value)</code></strong>: Converts a JavaScript object or value to a JSON string.
          <br><strong><code>JSON.parse(text)</code></strong>: Parses a JSON string, constructing the JavaScript value or object described by the string.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const user = {
  id: 42,
  name: 'Alice',
  isAdmin: false,
  roles: ['editor', 'viewer'],
  registeredAt: new Date()
};

// Convert object to JSON string
const jsonString = JSON.stringify(user, null, 2); // '2' adds pretty-printing
console.log(jsonString);

// Convert JSON string back to object
const userObject = JSON.parse(jsonString);
console.log('Parsed name:', userObject.name);
// Note: Some types like Date are converted to strings and not back
console.log('Date type:', typeof userObject.registeredAt); // 'string'
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>JSON is the de facto standard for data exchange on the web. Almost every API you interact with will send and receive data in JSON format. Mastering these two methods is absolutely essential for client-server communication, as well as for storing complex objects as strings in places like Web Storage.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What types of values cannot be represented in JSON? (e.g., \`undefined\`, functions, Symbols).</li>
            <li>What are the \`replacer\` and \`reviver\` arguments in \`stringify\` and \`parse\` used for?</li>
            <li>Why is \`JSON.parse(JSON.stringify(obj))\` not a reliable way to deep-clone an object?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON" target="_blank">MDN — JSON</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/json" target="_blank">javascript.info — JSON methods</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "WeakMap & WeakSet",
      difficulty: "Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use WeakMap and WeakSet for specialized use cases, like caching or managing metadata for objects, without preventing those objects from being garbage collected. Unlike Map and Set, they hold 'weak' references, which is key for preventing memory leaks in certain scenarios."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><strong><code>WeakMap</code></strong> is a collection of key/value pairs in which the keys must be objects and are held weakly.
          <br><strong><code>WeakSet</code></strong> is a collection of objects in which each object may occur only once and is held weakly.
          <br>The term "weakly" means that if there are no other references to an object held in a WeakMap/WeakSet, it can be garbage collected.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const cache = new WeakMap();

function getComputedData(obj) {
  if (cache.has(obj)) {
    console.log('Returning from cache');
    return cache.get(obj);
  }
  
  console.log('Computing data...');
  const result = { data: obj.id * 10 };
  cache.set(obj, result);
  return result;
}

let myObj = { id: 1 };
getComputedData(myObj); // Computes
getComputedData(myObj); // Returns from cache

// If myObj is set to null, it becomes eligible for garbage collection,
// and the entry in the WeakMap will be removed automatically.
// myObj = null;
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>WeakMaps and WeakSets are crucial for preventing memory leaks when you need to associate data with an object without taking "ownership" of it. If you used a regular \`Map\` for a cache, it would hold a strong reference to the object, preventing it from ever being garbage collected, even if it's no longer used anywhere else in the application. This makes weak collections a vital tool for advanced optimization and memory management.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Why can't you iterate over a WeakMap or WeakSet?</li>
            <li>What are the key differences between a Map and a WeakMap?</li>
            <li>Describe a practical use case for a WeakSet. (e.g., tracking visited nodes in a graph).</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap" target="_blank">MDN — WeakMap</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/weakmap-weakset" target="_blank">javascript.info — WeakMap and WeakSet</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "CommonJS Modules (require/module.exports)",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "While I primarily use ES Modules, I'm also proficient with the CommonJS module system used in Node.js. I understand how to export functionality using 'module.exports' and 'exports', and how to import it synchronously using 'require()'."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>CommonJS (CJS) is the module system originally designed for server-side JavaScript in Node.js. Modules are loaded synchronously.
          <br><strong><code>require(path)</code></strong>: A function used to import a module.
          <br><strong><code>module.exports</code></strong>: An object that is returned when this module is \`require\`d in another file.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// --- logger.js ---
function log(message) {
  console.log(\`[LOG]: \${message}\`);
}

// Export the log function
module.exports = { log };


// --- app.js ---
// Import the logger module
const logger = require('./logger.js');

logger.log('Application starting...');


// --- config.js ---
// To export a single item (class, function, etc.)
// module.exports = class Config { /* ... */ };
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Despite the rise of ES Modules, CommonJS is still the dominant module system in the vast Node.js ecosystem, including countless libraries and tools. A full-stack developer must be able to read, write, and debug code using both module systems and understand their key differences (e.g., synchronous vs. asynchronous loading, static vs. dynamic nature).</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the main difference between ES Modules and CommonJS?</li>
            <li>What is the relationship between \`exports\` and \`module.exports\`?</li>
            <li>How does Node.js handle cyclical dependencies in CommonJS?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://nodejs.org/api/modules.html" target="_blank">Node.js Docs — Modules</a></li>
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/modules-in-javascript/" target="_blank">freeCodeCamp — JavaScript Modules (ESM vs CJS)</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Observer/PubSub Design Pattern",
      difficulty: "Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm familiar with the Observer (or Publish/Subscribe) pattern for creating decoupled communication between objects. A 'subject' maintains a list of 'observers' and notifies them of any state changes. This is fundamental to event-driven architectures and how many frameworks manage state updates."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The Observer pattern is a behavioral design pattern where a subject object maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods. This promotes loose coupling between the subject and its observers.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
class NewsPublisher { // The Subject
  constructor() { this.subscribers = []; }
  subscribe(fn) { this.subscribers.push(fn); }
  unsubscribe(fn) { this.subscribers = this.subscribers.filter(s => s !== fn); }
  publish(news) {
    console.log(\`Publishing news: "\${news}"\`);
    this.subscribers.forEach(fn => fn(news));
  }
}

// Observers
const logger = (news) => console.log(\`[LOG]: \${news}\`);
const alerter = (news) => alert(\`New article: \${news}\`);

const publisher = new NewsPublisher();
publisher.subscribe(logger);
publisher.subscribe(alerter);

publisher.publish('New JavaScript feature released!');
// Both logger and alerter would be called.
publisher.unsubscribe(alerter);
// Now only the logger would be called on next publish.
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>This pattern is at the heart of event-driven programming. It allows different parts of an application to react to changes without being tightly coupled. DOM event listeners (\`addEventListener\`) are a native implementation of this pattern. It's also the core idea behind state management libraries like Redux and reactive programming libraries like RxJS.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between the Observer and PubSub patterns? (PubSub often involves a central message broker).</li>
            <li>How does this pattern help in creating decoupled systems?</li>
            <li>Can you see any potential memory leak issues with this pattern? (If observers aren't unsubscribed).</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://refactoring.guru/design-patterns/observer" target="_blank">Refactoring Guru — Observer Pattern</a></li>
            <li><a class="text-blue-300" href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript" target="_blank">Essential JS Design Patterns — Observer</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Regular Expressions",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm comfortable using regular expressions for pattern matching and text manipulation. I can create them using the literal syntax or the RegExp constructor and use methods like 'test()', 'match()', and 'replace()' to validate input or process strings."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A regular expression (RegExp) is an object that describes a sequence of characters used as a search pattern. They are used to perform pattern-matching and "search-and-replace" functions on text.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Literal syntax
const emailRegex = /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/;

// test() - returns boolean
console.log('Is valid email?', emailRegex.test('test@example.com')); // true
console.log('Is valid email?', emailRegex.test('test@.com')); // false

// match() - returns array of matches or null
const text = 'The year is 2025, not 2024.';
const yearRegex = /\\d{4}/g; // 'g' flag for global search
console.log('Years found:', text.match(yearRegex)); // ['2025', '2024']

// replace() - replaces matches with a new string
const censoredText = 'Hello world, this is a bad word.';
console.log(censoredText.replace(/bad word/i, 'BEEP')); // 'i' flag for case-insensitive
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Regular expressions are an incredibly powerful tool for any task involving text processing, from simple input validation (like checking for a valid email format) to complex parsing and data extraction from unstructured text. While often cryptic, a basic understanding of RegExp is a vital skill for any programmer.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What do common flags like \`g\`, \`i\`, and \`m\` do?</li>
            <li>What is a "capturing group" in a regular expression?</li>
            <li>What are some performance considerations when using complex regex?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions" target="_blank">MDN — Regular Expressions</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/regular-expressions" target="_blank">javascript.info — Regular expressions</a></li>
            <li><a class="text-blue-300" href="https://regex101.com/" target="_blank">Regex101 (Interactive Tool)</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Cookies",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I understand that HTTP cookies are small pieces of data sent from the server and stored by the browser, then sent back with subsequent requests. I can interact with them on the client via 'document.cookie', but I know this API is clunky and it's often better to manage them server-side with 'HttpOnly' flags for security."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>An HTTP cookie is a small piece of data that a server sends to the user's web browser. The browser may store it and send it back with later requests to the same server. Cookies are typically used for session management (logging in), personalization, and tracking.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Writing a cookie (basic)
// document.cookie = "username=John Doe; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/";

// Reading cookies
const allCookies = document.cookie;
console.log('All cookies:', allCookies); // "username=John Doe; other=value"

// The API for document.cookie is complex.
// In practice, helper functions or libraries are used.
function getCookie(name) {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// console.log('Username:', getCookie('username'));
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Cookies are a fundamental part of the web's state management mechanism. While Web Storage is often used for client-side data, cookies are unique in that they are automatically sent with every HTTP request to the server. Understanding them is crucial for authentication, A/B testing, and knowing the security implications, such as CSRF attacks and the importance of flags like \`HttpOnly\`, \`Secure\`, and \`SameSite\`.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between cookies and localStorage?</li>
            <li>What does the \`HttpOnly\` flag do for a cookie?</li>
            <li>What is a \`SameSite\` cookie attribute and why is it important for security?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies" target="_blank">MDN — HTTP Cookies</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/cookies" target="_blank">javascript.info — Cookies, document.cookie</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Custom Errors",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "For more specific error handling, I create custom error classes by extending the built-in 'Error' class. This allows me to add custom properties, like status codes, and use 'instanceof' in my catch blocks to handle different types of errors differently, leading to cleaner and more robust error logic."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Creating custom errors involves defining your own error classes that inherit from the base <code>Error</code> class. This lets you create a hierarchy of exception types specific to your application's domain, making error handling more precise.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Define a custom error class
class NetworkError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
  }
}

function fakeApiCall() {
  // Simulate a network failure
  throw new NetworkError('Failed to connect to API', 503);
}

try {
  fakeApiCall();
} catch (error) {
  console.error(\`Caught a \${error.name}\`);
  if (error instanceof NetworkError) {
    console.error(\`Status code: \${error.status}\`);
    // Handle the network error specifically
  } else {
    // Handle other generic errors
    console.error('An unexpected error occurred.');
  }
}
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Relying solely on generic \`Error\` objects can lead to messy \`catch\` blocks that inspect error messages (strings) to determine the error type, which is brittle. Custom error classes allow you to use the type system (\`instanceof\`) to create clean, readable, and maintainable error handling logic that clearly separates different failure scenarios (e.g., network error vs. validation error vs. authentication error).</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Why is it important to call \`super()\` in the constructor of a custom error?</li>
            <li>What's the purpose of setting \`this.name\`?</li>
            <li>How can custom errors improve the testability of your code?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types" target="_blank">MDN — Custom Error Types</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/custom-errors" target="_blank">javascript.info — Custom errors, extending Error</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "The 'arguments' Object",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm familiar with the legacy 'arguments' object, which provides access to all arguments passed to a regular function. However, I avoid it in modern code and strongly prefer using rest parameters ('...') because they create a true array and are more explicit and readable."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>arguments</code> object is an array-like object accessible inside regular (non-arrow) functions that contains the values of the arguments passed to that function. It is not a real array and lacks methods like \`map\` or \`forEach\`.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Legacy way using 'arguments'
function sumLegacy() {
  // arguments is not a real array, must be converted
  const argsArray = Array.from(arguments);
  return argsArray.reduce((total, num) => total + num, 0);
}
console.log('Legacy sum:', sumLegacy(1, 2, 3));

// Modern way using rest parameters
function sumModern(...args) {
  // args is a real array, no conversion needed
  return args.reduce((total, num) => total + num, 0);
}
console.log('Modern sum:', sumModern(1, 2, 3, 4));
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>While \`arguments\` works, it has several downsides: it's not a real array, making it clumsy to work with; it's not available in arrow functions; and its "magic" nature can be confusing. Rest parameters (\`...args\`) solve all these problems by providing a real, named array, making function signatures clearer and the implementation more straightforward. Knowing about \`arguments\` is important for reading older codebases.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Why is the \`arguments\` object not available in arrow functions?</li>
            <li>What is the best way to convert the \`arguments\` object into a real array?</li>
            <li>In non-strict mode, how does changing \`arguments\` affect the named parameters?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments" target="_blank">MDN — The arguments object</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/rest-parameters-spread-syntax#the-arguments-variable-legacy" target="_blank">javascript.info — The "arguments" variable</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Object.create()",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use 'Object.create()' for direct control over an object's prototype. It creates a new object, using an existing object as the prototype of the newly created object. This is a powerful way to implement prototypal inheritance without using constructor functions or classes."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>Object.create(proto, [propertiesObject])</code> method creates a new object with the specified prototype object and optional properties. This provides a pure, direct way to set up an object's inheritance chain.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const animalPrototype = {
  speak() {
    console.log(\`\${this.sound} says \${this.name}\`);
  }
};

const dog = Object.create(animalPrototype);
dog.name = 'Rex';
dog.sound = 'Woof';

dog.speak(); // 'Woof says Rex'

// Check the prototype chain
console.log(Object.getPrototypeOf(dog) === animalPrototype); // true
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p><code>Object.create()</code> is the most direct way to implement prototypal inheritance in JavaScript. While ES6 classes provide a more convenient syntax, \`Object.create()\` offers finer control and is a great tool for understanding how inheritance truly works under the hood. It's also useful for creating objects that delegate to a shared prototype, which can be more memory efficient than creating objects with duplicate methods.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How is \`Object.create(null)\` different from \`{}\`? What is it used for?</li>
            <li>How does \`Object.create()\` relate to ES6 classes?</li>
            <li>What is the purpose of the second argument to \`Object.create()\`?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create" target="_blank">MDN — Object.create()</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/prototype-methods#object-create" target="_blank">javascript.info — Object.create</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Singleton Design Pattern",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm familiar with the Singleton pattern, which ensures that a class has only one instance and provides a global point of access to it. I typically implement this in JavaScript using a module that exports the single instance, leveraging the fact that modules are only evaluated once."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance. It's useful for managing shared resources like a database connection, a logger, or a configuration object.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// --- configManager.js (ES Module approach) ---
class ConfigManager {
  constructor() {
    this.settings = { theme: 'dark' };
    console.log('ConfigManager instance created.');
  }

  get(key) { return this.settings[key]; }
}

// Create and export a single instance.
// Because modules are cached, this code runs only once.
const instance = new ConfigManager();
export default instance;


// --- app.js ---
// import config from './configManager.js';
// console.log(config.get('theme')); // 'dark'


// --- anotherModule.js ---
// import config from './configManager.js';
// // This imports the *same* instance. "ConfigManager instance created" is not logged again.
            </textarea>
          </div>
        </section>
        
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>The Singleton pattern provides a controlled way to manage global state. While global state should be used sparingly, this pattern is valuable for resources that are inherently singular, like application-wide configuration or a service that manages a single WebSocket connection. The module-based approach is the cleanest and most common way to achieve this in modern JavaScript.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What are the potential downsides of the Singleton pattern? (Global state, can be hard to test).</li>
            <li>How would you implement a Singleton using a closure instead of a module?</li>
            <li>What is Dependency Injection and how can it be an alternative to using Singletons?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://refactoring.guru/design-patterns/singleton" target="_blank">Refactoring Guru — Singleton Pattern</a></li>
            <li><a class="text-blue-300" href="https://www.dofactory.com/javascript/design-patterns/singleton" target="_blank">doFactory — JavaScript Singleton</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Garbage Collection",
      difficulty: "Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I understand that JavaScript uses automatic garbage collection to manage memory. The core concept is reachability; if an object is no longer reachable from a root (like the global object or the current function's scope), it's considered garbage and its memory can be reclaimed. I write my code to avoid creating detached references that would prevent this process and cause memory leaks."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Garbage Collection (GC) is the process of automatically freeing up memory that is no longer in use by the application. In JavaScript, this is handled by the engine (like V8 in Chrome). The primary algorithm used is "Mark-and-Sweep," which periodically finds all reachable objects and collects everything else.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Conceptual Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
let user = { name: 'John' }; // 'user' object is reachable from the global scope.

// The object referenced by 'user' is also referenced by 'admin'.
let admin = user; 

// Now, 'user' no longer references the object.
// But the object is still reachable via the 'admin' variable.
user = null; 

// If we also nullify the 'admin' reference...
// admin = null;
// ...the object { name: 'John' } is no longer reachable from any root.
// The garbage collector can now reclaim its memory.
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>While garbage collection is automatic, it's not magic. Poor coding practices can lead to memory leaks, where unreachable objects are unintentionally kept alive. Understanding the principle of reachability helps developers write code that works with the garbage collector, not against it, by properly nullifying references and cleaning up event listeners and timers.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is a common cause of memory leaks in JavaScript? (e.g., closures, detached DOM nodes).</li>
            <li>How do \`WeakMap\` and \`WeakSet\` interact with the garbage collector?</li>
            <li>What is the difference between stack and heap memory in the context of JavaScript?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management" target="_blank">MDN — Memory Management</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/garbage-collection" target="_blank">javascript.info — Garbage collection</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Variable Shadowing",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I am careful to avoid accidental variable shadowing, where a variable in an inner scope has the same name as one in an outer scope. While this is sometimes intentional, it can lead to bugs, so I prefer to use distinct names to keep the code clear."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>Variable shadowing occurs when a variable declared within a certain scope (e.g., an inner function or block) has the same name as a variable declared in an outer scope. When this happens, the inner variable "shadows" or takes precedence over the outer one within its scope.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
let count = 100; // Outer scope variable

function example() {
  let count = 10; // Inner scope variable (shadows the outer one)
  console.log('Inner count:', count); // 10
  
  if (true) {
    let count = 1; // Block scope variable (shadows the function-level one)
    console.log('Block count:', count); // 1
  }
  
  console.log('Inner count after block:', count); // 10
}

example();
console.log('Outer count:', count); // 100 (unaffected)
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Accidental shadowing can lead to subtle bugs where you think you're modifying an outer variable, but you're actually working with a new inner variable. This can be particularly confusing in long functions or nested callbacks. Linters are often configured to warn about variable shadowing to prevent these kinds of mistakes.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Is it possible to access the shadowed outer variable from the inner scope? (Not directly by name).</li>
            <li>How does shadowing with \`var\` differ from shadowing with \`let\` or \`const\`?</li>
            <li>Can linters help prevent accidental shadowing?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/variable-shadowing-in-javascript/" target="_blank">freeCodeCamp — Variable Shadowing</a></li>
            <li><a class="text-blue-300" href="https://www.javascripttutorial.net/javascript-variable-shadowing/" target="_blank">JavaScript Tutorial — Variable Shadowing</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Pure Functions",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I strive to write pure functions wherever possible. They always return the same output for the same input and have no side effects. This makes my code more predictable, easier to test, and simpler to reason about, which is a core principle of functional programming."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>A pure function is a function that meets two criteria:
          <br>1. <strong>Deterministic:</strong> Given the same inputs, it will always return the same output.
          <br>2. <strong>No Side Effects:</strong> It does not modify any state outside its own scope (e.g., no modifying global variables, DOM, or arguments).</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// --- Pure function ---
function calculatePrice(price, taxRate) {
  return price * (1 + taxRate);
}
console.log(calculatePrice(100, 0.05)); // Always 105

// --- Impure function ---
let totalCost = 0;
function addToTotal(price) {
  // Side effect: modifies a variable outside its scope
  totalCost += price;
  return totalCost;
}

// Another impure function (not deterministic)
function getGreeting() {
  // Depends on external state (Date)
  return \`Hello, the time is \${new Date().toLocaleTimeString()}\`;
}
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Pure functions are the building blocks of predictable and reliable software. Because they are self-contained, they are incredibly easy to unit test. They also prevent a wide class of bugs related to shared state and unexpected side effects. State management libraries like Redux are built around this principle, using pure functions (reducers) to manage state changes.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is a "side effect" in programming?</li>
            <li>How does immutability relate to pure functions?</li>
            <li>Can a pure function make an API call? Why or why not?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://www.freecodecamp.org/news/what-is-a-pure-function-in-javascript-acb887375dfe/" target="_blank">freeCodeCamp — What is a Pure Function?</a></li>
            <li><a class="text-blue-300" href="https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976" target="_blank">JS Scene — What is a Pure Function?</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "The 'static' Keyword",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use the 'static' keyword to define methods or properties on a class itself, rather than on its instances. This is useful for creating utility functions or properties that are related to the class but don't depend on the state of a specific instance."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>static</code> keyword defines a static method or property for a class. Static members are called on the class directly, not on instances of the class. They are often used as helper or factory functions.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
class User {
  constructor(name) {
    this.name = name;
  }
  
  // Instance method
  greet() {
    console.log(\`Hello, I am \${this.name}\`);
  }
  
  // Static property
  static defaultRole = 'guest';
  
  // Static method
  static createGuest() {
    return new User('Guest User');
  }
}

const user1 = new User('Alice');
user1.greet(); // Works

// Call static members on the class itself
console.log(User.defaultRole); // 'guest'
const guestUser = User.createGuest();
guestUser.greet();

// user1.createGuest(); // Throws TypeError: user1.createGuest is not a function
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Static members provide a clean way to organize class-related functionality within the class definition itself, rather than as separate, standalone functions. This improves code cohesion and makes it clear that the function or property is related to the class concept as a whole, not to individual instances.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Can a static method access \`this\`? If so, what does \`this\` refer to? (It refers to the class constructor).</li>
            <li>Can an instance method call a static method?</li>
            <li>When would you prefer a static method over a helper function outside the class?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static" target="_blank">MDN — static</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/static-properties-methods" target="_blank">javascript.info — Static properties and methods</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Object.fromEntries()",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I use 'Object.fromEntries()' to transform a list of key-value pairs into a new object. It's the perfect inverse operation to 'Object.entries()', making it very useful for manipulating object data after converting it to an array, for example, to filter or map its properties."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>The <code>Object.fromEntries()</code> method takes a list of iterable key-value pairs (like an array of arrays or a Map) and returns a new object whose properties are given by those entries.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
const user = { name: 'John', age: 30, id: 'xyz' };

// 1. Convert object to array of entries
const entries = Object.entries(user);
console.log('Entries:', entries);

// 2. Manipulate the array (e.g., filter out some properties)
const filteredEntries = entries.filter(([key, value]) => key !== 'id');
console.log('Filtered:', filteredEntries);

// 3. Convert back to an object
const newObject = Object.fromEntries(filteredEntries);
console.log('New Object:', newObject); // { name: 'John', age: 30 }
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>This method completes the round-trip of object-to-array-to-object transformation. It unlocks powerful and declarative data manipulation patterns. By converting an object to an array of its entries, you can use the full suite of array methods (\`map\`, \`filter\`, \`reduce\`) to transform it and then seamlessly convert it back into an object with \`Object.fromEntries()\`.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How can you use \`Object.fromEntries()\` to convert a \`Map\` to an object?</li>
            <li>What happens if you have duplicate keys in the input array?</li>
            <li>How could you use this method to swap the keys and values of an object?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries" target="_blank">MDN — Object.fromEntries()</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/object-keys-values-entries#object-fromentries" target="_blank">javascript.info — Object.fromEntries</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Operator Precedence & Associativity",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm aware of operator precedence, which determines the order in which operators are evaluated. To avoid ambiguity and potential bugs in complex expressions, I make liberal use of parentheses \`()\` to explicitly define the order of operations, which also improves code readability."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><strong>Precedence</strong> determines which operator is executed first in an expression with multiple operators (e.g., multiplication before addition). <strong>Associativity</strong> determines the order for operators with the same precedence (e.g., left-to-right for subtraction).</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// Precedence: * has higher precedence than +
let result1 = 2 + 3 * 4; // Evaluates 3 * 4 first
console.log(result1); // 14, not 20

// Using parentheses to override precedence
let result2 = (2 + 3) * 4;
console.log(result2); // 20

// Associativity: assignment is right-to-left
let a, b, c;
a = b = c = 5; // c=5, then b=c, then a=b
console.log(a, b, c); // 5 5 5

// Logical operators can be tricky
// && has higher precedence than ||
let result3 = true || false && false; // Evaluates false && false first
console.log(result3); // true
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Relying on implicit operator precedence can lead to subtle bugs that are hard to spot during code review. Writing clear, unambiguous expressions with parentheses not only prevents these bugs but also makes the code's intent much clearer to other developers, reducing cognitive load and improving maintainability.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>Which operator has one of the highest precedences? (Grouping \`()\`).</li>
            <li>What is the associativity of the exponentiation operator (\`**\`)? (Right-to-left).</li>
            <li>Can you explain the order of evaluation for \`a && b || c\`?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence" target="_blank">MDN — Operator Precedence</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/operators#operator-precedence" target="_blank">javascript.info — Operator precedence</a></li>
          </ul>
        </section>
      </div>
      `
    },
    {
      title: "Testing & Debugging Strategies",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "My approach to quality involves both testing and debugging. I write unit tests for critical business logic, especially for pure functions, using frameworks like Jest. For debugging, I'm proficient with browser DevTools, using breakpoints, the console, and the network tab to diagnose issues efficiently."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Core Concepts</h2>
          <p><strong>Testing</strong> is the proactive process of verifying that your code works as expected. This includes:</p>
          <ul class="list-disc list-inside ml-4 text-gray-300">
            <li><strong>Unit Tests:</strong> Testing individual functions or components in isolation.</li>
            <li><strong>Integration Tests:</strong> Testing how multiple parts of the system work together.</li>
            <li><strong>End-to-End (E2E) Tests:</strong> Automating a browser to test a full user flow.</li>
          </ul>
          <p class="mt-2"><strong>Debugging</strong> is the reactive process of finding and fixing bugs when they occur. Key tools include:</p>
          <ul class="list-disc list-inside ml-4 text-gray-300">
            <li><strong>Browser DevTools:</strong> The Console, Sources (for breakpoints), Network, and Elements tabs.</li>
            <li><strong>\`console.log()\`:</strong> The simplest form of debugging to trace values.</li>
            <li><strong>\`debugger\` statement:</strong> Programmatically sets a breakpoint in your code.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>Writing code is only half the battle. A robust testing strategy ensures new features don't break existing ones and gives confidence when refactoring. Effective debugging skills are non-negotiable for a developer; they dramatically reduce the time it takes to solve problems and are essential for maintaining a high-quality application.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>What is the difference between a unit test and an integration test?</li>
            <li>How would you debug an issue that only happens for a specific user?</li>
            <li>What is Test-Driven Development (TDD)?</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Further reading</h2>
          <ul class="list-disc list-inside ml-4">
            <li><a class="text-blue-300" href="https://jestjs.io/" target="_blank">Jest (Testing Framework)</a></li>
            <li><a class="text-blue-300" href="https://developer.chrome.com/docs/devtools/" target="_blank">Chrome DevTools Documentation</a></li>
            <li><a class="text-blue-300" href="https://javascript.info/debugging-chrome" target="_blank">javascript.info — Debugging in the browser</a></li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Type Coercion Shortcuts (`+`, `!!`)",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm familiar with common type coercion shortcuts, like the unary plus \`(+)\` to convert a value to a number and the double negatio \`(!!)\` to convert a value to a boolean. While they can be concise, I use them judiciously and prefer explicit constructors like 'Number()' or 'Boolean()' for maximum clarity."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p>These are idiomatic shortcuts that leverage JavaScript's type coercion rules to perform quick type conversions.</p>
          <ul class="list-disc list-inside ml-4 text-gray-300">
            <li><strong>Unary Plus (\`+\`):</strong> When placed before a value, it attempts to convert it into a number.</li>
            <li><strong>Double Negation (\`!!\`):</strong> Converts any value to its corresponding boolean value (\`true\` or \`false\`).</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// --- Unary Plus (+) for number conversion ---
console.log(+'123');      // 123
console.log(+'');         // 0
console.log(+false);      // 0
console.log(+true);       // 1
console.log(+'hello');    // NaN

// --- Double Negation (!!) for boolean conversion ---
console.log(!!'hello');    // true
console.log(!!1);         // true
console.log(!!{});        // true
console.log(!!'');        // false (empty string is falsy)
console.log(!!0);         // false (zero is falsy)
console.log(!!null);      // false (null is falsy)
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>These shortcuts are very common in existing JavaScript codebases, so being able to read and understand them is important. While they are concise, their "cleverness" can sometimes come at the cost of readability for less experienced developers. Using explicit functions like \`Number()\` and \`Boolean()\` often makes the code's intent clearer, which can be more valuable in a team setting.</p>
        </section>
        
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How does \`+value\` differ from \`parseInt(value)\`?</li>
            <li>Is there any difference between \`!!value\` and \`Boolean(value)\`? (Functionally no, but style-wise yes).</li>
            <li>What other ways can you convert a string to a number?</li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Escape Sequences & Literals",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "I'm aware of standard escape sequences like '\\n' for newlines and '\\t' for tabs. I also know about numeric literals for octal ('0o') and binary ('0b'), which are useful in specific contexts like working with file permissions or bitwise operations."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Short explanation</h2>
          <p><strong>Escape Sequences</strong> are combinations of characters that have a special meaning in strings, such as representing whitespace or special characters.
          <br><strong>Numeric Literals</strong> are prefixes that allow numbers to be represented in different bases.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-40 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
// --- Escape Sequences ---
// Newline (\\n), Tab (\\t), Backslash (\\\\)
const formattedString = 'First line.\\n\\tSecond line, indented.';
console.log(formattedString);
const path = 'C:\\\\Users\\\\Guest'; // Need to escape the backslash
console.log(path);

// --- Numeric Literals ---
let binary = 0b1010;  // 1*8 + 0*4 + 1*2 + 0*1
console.log('Binary:', binary); // 10

let octal = 0o12;    // 1*8 + 2*1
console.log('Octal:', octal); // 10

let hex = 0xA;       // Hexadecimal A
console.log('Hex:', hex); // 10
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it matters</h2>
          <p>While often overlooked, these literal syntaxes are fundamental tools. Escape sequences are essential for formatting text for display or logs. Alternative numeric bases are less common in general web development but are critical when dealing with low-level data, networking protocols, bitwise flags, or other specialized programming domains.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Related questions the reviewer may ask</h2>
          <ul class="list-disc list-inside ml-4">
            <li>How do template literals affect the need for escape sequences like \`\\n\`?</li>
            <li>How can you convert a number to its binary or hexadecimal string representation? (\`num.toString(2)\`)</li>
            <li>What is a use case for binary literals? (e.g., defining bitmasks for permissions).</li>
          </ul>
        </section>
      </div>
    `
    },
    {
      title: "Exercise: Promise Resolution Order",
      difficulty: "Advanced",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "This exercise demonstrates the interaction between synchronous code, microtasks, and macrotasks in the event loop. I know that synchronous code runs first, followed by all queued microtasks (like Promise.then), and only then is the next macrotask (like setTimeout) processed."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">The Challenge</h2>
          <p>Predict the order in which the numbers will be logged to the console. Run the code to verify your answer and be prepared to explain *why* it happens in that order.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
console.log('1');

setTimeout(() => {
  console.log('7');
  Promise.resolve().then(() => console.log('8'));
}, 0);

setTimeout(() => {
  console.log('9');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
  Promise.resolve().then(() => console.log('5'));
});

Promise.resolve().then(() => console.log('4'));

queueMicrotask(() => console.log('6'));

console.log('2');

// Your predicted order: ?
// Correct order: 1, 2, 3, 4, 6, 5, 7, 8, 9
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Explanation</h2>
          <ol class="list-decimal list-inside ml-4 space-y-2">
            <li><strong>Sync Code:</strong> \`1\` and \`2\` are logged immediately.</li>
            <li><strong>Microtask Queue:</strong> The three top-level \`Promise.then\` and the \`queueMicrotask\` are added to the microtask queue.</li>
            <li><strong>Macrotask Queue:</strong> The two \`setTimeout\` callbacks are added to the macrotask queue.</li>
            <li><strong>Microtask Drain:</strong> The call stack is now empty, so the event loop processes all microtasks: \`3\` is logged, which queues \`5\`. \`4\` is logged. \`6\` is logged. Now \`5\` is the only microtask left, so it is logged.</li>
            <li><strong>First Macrotask:</strong> The first \`setTimeout\` runs. \`7\` is logged. It queues a microtask to log \`8\`.</li>
            <li><strong>Microtask Drain:</strong> Before the next macrotask, the microtask queue is checked again. \`8\` is logged.</li>
            <li><strong>Second Macrotask:</strong> The second \`setTimeout\` runs, logging \`9\`.</li>
          </ol>
        </section>
      </div>
    `
    },
    {
      title: "Exercise: Closure & Loops",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "This exercise highlights a classic closure problem. When using 'var' in a loop, all the setTimeout callbacks close over the same variable 'i'. By the time they execute, the loop has finished and 'i' is at its final value. Using 'let' solves this because 'let' is block-scoped, creating a new binding for each iteration."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">The Challenge</h2>
          <p>Predict the output of the \`logWithVar\` function. Then, explain why \`logWithLet\` produces the expected sequential output (0, 1, 2).</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
function logWithVar() {
  console.log('Using var:');
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      // This 'i' is the same variable in all three callbacks
      console.log(i);
    }, 10);
  }
}

function logWithLet() {
  console.log('Using let:');
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      // This 'i' is a new variable for each loop iteration
      console.log(i);
    }, 10);
  }
}

logWithVar();
setTimeout(logWithLet, 100); // Delay to separate outputs

// Predicted 'var' output: 3, 3, 3
// Predicted 'let' output: 0, 1, 2
            </textarea>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Why it happens</h2>
          <p>With <code>var</code>, there is only one <code>i</code> variable for the entire function scope. The loop runs to completion, incrementing <code>i</code> to 3. After the loop, the <code>setTimeout</code> callbacks finally execute, and they all read the current value of this single <code>i</code>, which is 3.</p>
          <p>With <code>let</code>, a new lexical scope is created for each iteration of the loop. Each <code>setTimeout</code> callback closes over its own, unique <code>i</code> variable for that specific iteration (0, 1, and 2 respectively), preserving the value at the time the callback was created.</p>
        </section>
      </div>
    `
    },
    {
      title: "Exercise: 'this' Keyword Contexts",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: "This exercise tests the understanding of 'this' binding rules. I can predict the output because I know 'this' is determined by how a function is called: as a method (this=object), as a standalone function (this=undefined in strict mode), or as an arrow function (this=lexical scope)."
      </blockquote>

      <div class="space-y-6 text-gray-300">
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">The Challenge</h2>
          <p>For each <code>console.log</code>, predict what the value of <code>this.name</code> will be, and explain the binding rule that applies in each case.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Example</h2>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <textarea class="js-playground-input w-full h-48 bg-gray-800 text-sm p-3 rounded text-white" spellcheck="false">
'use strict';

const person = {
  name: 'Person Object',
  regularMethod() {
    console.log('1. Regular Method:', this.name);
  },
  arrowMethod: () => {
    // Arrow functions have no 'this' of their own
    console.log('2. Arrow Method:', this.name);
  },
  delayedMethod() {
    setTimeout(function() {
      // Callback is a standalone function call
      console.log('3. setTimeout with regular fn:', this.name);
    }, 10);
    setTimeout(() => {
      // Arrow function inherits 'this' from delayedMethod
      console.log('4. setTimeout with arrow fn:', this.name);
    }, 20);
  }
};

person.regularMethod();
person.arrowMethod();
person.delayedMethod();

const detached = person.regularMethod;
detached(); // Standalone function call
            </textarea>
          </div>
        </section>
        
        <section>
          <h2 class="text-lg font-semibold text-white mb-2">Answers & Explanations</h2>
          <ol class="list-decimal list-inside ml-4 space-y-2">
            <li><strong>1. 'Person Object'</strong>: Method invocation. <code>this</code> is the object the method was called on (\`person\`).</li>
            <li><strong>2. undefined</strong>: Arrow function. \`this\` is taken from the surrounding (lexical) scope, which is the global scope here. In strict mode, global \`this\` is \`undefined\`.</li>
            <li><strong>3. undefined</strong>: Function invocation. The callback to \`setTimeout\` is invoked as a standalone function, not a method. \`this\` is \`undefined\` in strict mode.</li>
            <li><strong>4. 'Person Object'</strong>: Arrow function. \`this\` is inherited from the surrounding \`delayedMethod\` scope, where \`this\` was correctly bound to \`person\` when it was called.</li>
            <li><strong>(detached call) undefined</strong>: Function invocation. The method was detached from its object and called as a standalone function, so \`this\` is \`undefined\`.</li>
          </ol>
        </section>
      </div>
    `
    }

  ],

  proTips: [
    // Add JavaScript-specific pro tips here
  ],

  practicals: [
    {
      practicalTopic: "Check All Null Arguments",
      difficulty: "Intermediate",
      details: `
      <div class="space-y-4 text-gray-300">
        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Problem Description</h3>
          <p>Write a function that checks if all arguments passed are null. If they are, throw an error with the message "All arguments are null."</p>
        </section>

        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Examples</h3>
          <div class="space-y-3">
            <div class="bg-gray-900 p-3 rounded-lg border border-gray-700">
              <p><strong class="text-gray-400">Input:</strong> checkAllNull(null, null)</p>
              <p><strong class="text-gray-400">Output:</strong> Error: "All arguments are null."</p>
            </div>
            <div class="bg-gray-900 p-3 rounded-lg border border-gray-700">
              <p><strong class="text-gray-400">Input:</strong> checkAllNull(1, null)</p>
              <p><strong class="text-gray-400">Output:</strong> No error (at least one argument is not null)</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Solution</h3>
          <div class="bg-gray-900 p-4 rounded-lg border border-gray-700 overflow-x-auto">
            <pre><code class="language-js text-sm">
function checkAllNull(...args) {
  if (args.length > 0 && args.every(arg => arg === null)) {
    throw new Error("All arguments are null.");
  }
}

// try {
//   checkAllNull(null, null);
// } catch (e) {
//   console.error(e.message);
// }
            </code></pre>
          </div>
        </section>
      </div>
    `
    },
    {
      practicalTopic: "Sum of Digits Using Recursion",
      difficulty: "Intermediate",
      details: `
      <div class="space-y-4 text-gray-300">
        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Problem Description</h3>
          <p>Write a recursive function that takes a non-negative integer and returns the sum of its digits. For example, the sum of digits for 123 is 1 + 2 + 3 = 6.</p>
        </section>

        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Examples</h3>
          <div class="space-y-3">
            <div class="bg-gray-900 p-3 rounded-lg border border-gray-700">
              <p><strong class="text-gray-400">Input:</strong> 4321</p>
              <p><strong class="text-gray-400">Output:</strong> 10</p>
            </div>
            <div class="bg-gray-900 p-3 rounded-lg border border-gray-700">
              <p><strong class="text-gray-400">Input:</strong> 9</p>
              <p><strong class="text-gray-400">Output:</strong> 9</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Solution</h3>
          <div class="bg-gray-900 p-4 rounded-lg border border-gray-700 overflow-x-auto">
            <pre><code class="language-js text-sm">
function sumDigitsRecursively(n) {
  // Base case: if the number is a single digit, return it.
  if (n < 10) {
    return n;
  }
  
  // Recursive step:
  // Get the last digit with the modulo operator (n % 10).
  // Get the rest of the number by removing the last digit.
  const lastDigit = n % 10;
  const remainingDigits = Math.floor(n / 10);
  
  return lastDigit + sumDigitsRecursively(remainingDigits);
}
            </code></pre>
          </div>
        </section>
      </div>
    `
    }
  ]
}
