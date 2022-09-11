getFromLocalStorage();
calculateTotal();

const eventListeners = () => {
  document.querySelector(".container").addEventListener("click", function (e) {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("reserved")
    ) {
      e.target.classList.toggle("selected");
    }
    calculateTotal();
  });

  document.getElementById("movie").addEventListener("change", function (e) {
    calculateTotal();
  });
};

eventListeners();

function calculateTotal() {
  const container = document.querySelector(".container");
  const select = document.getElementById("movie");
  const count = document.getElementById("count");
  const amount = document.getElementById("amount");
  const selectedSeats = container.querySelectorAll(".seat.selected");
  const seats = document.querySelectorAll(".seat:not(.reserved)");
  const selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach((seat) => selectedSeatsArr.push(seat));
  seats.forEach((seat) => seatsArr.push(seat));

  let selectedSeatIndexs = selectedSeatsArr.map((seat) =>
    seatsArr.indexOf(seat)
  );

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  saveToLocalStorage(selectedSeatIndexs);
}

function saveToLocalStorage(indexs) {
  const select = document.getElementById("movie");
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}

function getFromLocalStorage() {
  const select = document.getElementById("movie");
  const seats = document.querySelectorAll(".seat:not(.reserved)");
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}
