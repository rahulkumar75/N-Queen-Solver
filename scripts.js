// DOM ELEMENTS
const inp = document.querySelector(".user-input");
const btn = document.querySelector(".btn");
const ans = document.querySelector(".answer");
const chs = document.querySelector(".chess");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let solutions = [];
let currentPage = 1;
const solutionsPerPage = 4;

// N-Queen PART
var solveNQueens = function (n) {
  var res = [];
  if (n === 1 || n >= 4) backtrack(res, [], n, 0);
  return res;
};

var backtrack = function (res, points, n, index) {
  for (var i = index; i < n; i++) {
    if (points.length !== i) return;
    for (var j = 0; j < n; j++) {
      if (isValid(points, [i, j])) {
        points.push([i, j]);
        backtrack(res, points, n, i + 1);
        if (points.length === n) res.push(buildRes(points));
        points.pop();
      }
    }
  }
};

var buildRes = function (points) {
  var res = [];
  var n = points.length;
  for (var i = 0; i < n; i++) {
    res[i] = "";
    for (var j = 0; j < n; j++) {
      res[i] += points[i][1] === j ? "Q" : ".";
    }
  }
  return res;
};

var isValid = function (oldPoints, newPoint) {
  var len = oldPoints.length;
  for (var i = 0; i < len; i++) {
    if (
      oldPoints[i][0] === newPoint[0] ||
      oldPoints[i][1] === newPoint[1]
    )
      return false;
    if (
      Math.abs(
        (oldPoints[i][0] - newPoint[0]) / (oldPoints[i][1] - newPoint[1])
      ) === 1
    )
      return false;
  }
  return true;
};

// RENDERING PART
var renderCol = function (res, solutionIndex) {
  const sol = document.querySelector(`.solution${solutionIndex + 1}`);

  for (let j = 0; j < res[0].length; j++) {
    for (let k = 0; k < res[0].length; k++) {
      const colMarkup = `<div class='col col${k}'></div>`;
      sol.childNodes[j].insertAdjacentHTML("beforeend", colMarkup);
      if (res[solutionIndex][j].charAt(k) === "Q") {
        sol.childNodes[j].childNodes[k].innerHTML =
          '<img src="./queen.png" alt="Q">' || "Q";
      }
    }
  }
};

var renderRow = function (res, solutionIndex) {
  const sol = document.querySelector(`.solution${solutionIndex + 1}`);
  for (let j = 0; j < res[0].length; j++) {
    const rowMarkup = `<div class='row row${j}'></div>`;
    sol.insertAdjacentHTML("beforeend", rowMarkup);
  }
};

var renderSolution = function (res, solNum) {
  const solMarkup = `<div class="solution solution${solNum + 1}"></div>`;
  chs.insertAdjacentHTML("beforeend", solMarkup);
};

var renderChess = function (res, page = 1) {
  chs.innerHTML = "";
  const startIndex = (page - 1) * solutionsPerPage;
  const endIndex = Math.min(startIndex + solutionsPerPage, res.length);
  for (let i = startIndex; i < endIndex; i++) {
    renderSolution(res, i);
    renderRow(res, i);
    renderCol(res, i);
  }
};

var updatePagination = function (totalPages) {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
};

var handlePagination = function () {
  const totalPages = Math.ceil(solutions.length / solutionsPerPage);
  updatePagination(totalPages);
  renderChess(solutions, currentPage);
};

// EVENT CALL
btn.addEventListener("click", () => {
  // clearing previous results
  ans.innerHTML = "";
  chs.innerHTML = "";
  currentPage = 1;

  // taking input from user
  const nQueen = parseInt(inp.value);
  // clearing input field
  inp.value = "";
  // finding solutions
  solutions = solveNQueens(nQueen);

  if (solutions.length === 0) {
    ans.insertAdjacentHTML(
      "beforeend",
      `<p class='no-sol'>Oops 😐 ! There Is No Any Possible Solution.</p>`
    );
  } else {
    ans.insertAdjacentHTML(
      "beforeend",
      `<p class='sol'>Number of Solutions 😊 : ${solutions.length}</p>`
    );
    handlePagination();
  }
});

// PAGINATION BUTTONS
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    handlePagination();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(solutions.length / solutionsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    handlePagination();
  }
});

// INTERACTIVITY: Highlight selected solution
chs.addEventListener("click", (event) => {
  if (event.target.classList.contains("solution")) {
    document
      .querySelectorAll(".solution")
      .forEach((sol) => sol.classList.remove("highlight"));
    event.target.classList.add("highlight");
  }
});
