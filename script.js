 document.addEventListener("DOMContentLoaded", () => {
  const courses = [
    { label: "First Aid", fee: 1500 },
    { label: "Sewing", fee: 1500 },
    { label: "Landscaping", fee: 1500 },
    { label: "Life Skills", fee: 1500 },
    { label: "Child Minding", fee: 1500 },
    { label: "Cooking", fee: 750 },
    { label: "Garden Maintenance", fee: 750 }
  ];

  const listContainer = document.getElementById("courseList");
  if (listContainer) {
    courses.forEach(course => {
      const div = document.createElement("div");
      div.innerHTML = `
        <label>
          <input type="checkbox" value="${course.label}" data-fee="${course.fee}">
          ${course.label} - R${course.fee}
        </label>
      `;
      listContainer.appendChild(div);
    });
  }
});

function calculateTotal() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  let total = 0;
  let selectedCourses = [];

  checkboxes.forEach(cb => {
    total += parseFloat(cb.dataset.fee);
    selectedCourses.push(cb.value);
  });

  if (selectedCourses.length === 0) {
    document.getElementById("result").innerHTML = "<p>Please select at least one course.</p>";
    return;
  }

  let discount = selectedCourses.length >= 2 ? total * 0.10 : 0;
  const vat = (total - discount) * 0.15;
  const finalTotal = total - discount + vat;

  document.getElementById("result").innerHTML = `
    <h3>Quote Summary</h3>
    <p><strong>Courses Selected:</strong> ${selectedCourses.join(", ")}</p>
    <p>Subtotal: R${total.toFixed(2)}</p>
    <p>Discount (10%): -R${discount.toFixed(2)}</p>
    <p>VAT (15%): R${vat.toFixed(2)}</p>
    <h4>Total: R${finalTotal.toFixed(2)}</h4>
  `;

  alert("✅ Quote generated successfully!");
}