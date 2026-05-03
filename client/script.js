const API = "https://tanvi-crm.onrender.com"; 

let selectedImage = "";
let priceChartInstance = null;
let locationChartInstance = null;

/* IMAGE PREVIEW */
document.getElementById("imageFile").addEventListener("change", function(e){
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader();

    reader.onload = function(event){
      selectedImage = event.target.result;
      const preview = document.getElementById("preview");
      preview.src = selectedImage;
      preview.style.display = "block";
    };

    reader.readAsDataURL(file);
  }
});

/* ADD PROPERTY */
async function addProperty(){
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  const status = document.getElementById('status').value;

  if(!title || !location || !price){
    alert("Please fill all fields");
    return;
  }

  await fetch(API + "/properties", {
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      title,
      location,
      price,
      status,
      image: selectedImage
    })
  });

  // RESET
  document.getElementById('title').value = "";
  document.getElementById('location').value = "";
  document.getElementById('price').value = "";
  document.getElementById('status').value = "Available";
  document.getElementById('preview').style.display = "none";
  selectedImage = "";

  loadProperties();
}

/* LOAD */
async function loadProperties(){
  const res = await fetch(API + "/properties");
  const data = await res.json();

  document.getElementById('propertyList').innerHTML =
    data.map(p => `
      <div class="property">
        <img src="${p.image || 'https://via.placeholder.com/300'}">
        <div class="property-content">
          <h3>${p.title}</h3>
          <p>${p.location}</p>
          <p>Status: ${p.status}</p>
          <strong>₹${p.price}</strong>

          <br><br>

          <button onclick="deleteProperty('${p._id}')">Delete</button>
          <button onclick="editProperty('${p._id}','${p.title}','${p.location}','${p.price}','${p.status}')">Edit</button>
        </div>
      </div>
    `).join('');

  loadDashboard(data);
}

/* DELETE */
async function deleteProperty(id){
  if(!confirm("Delete this property?")) return;

  await fetch(API + "/properties/" + id, { method:"DELETE" });
  loadProperties();
}

/* EDIT */
async function editProperty(id, title, location, price, status){
  const newTitle = prompt("Title", title);
  const newLocation = prompt("Location", location);
  const newPrice = prompt("Price", price);
  const newStatus = prompt("Status (Available/Sold/Rented)", status);

  if(!newTitle || !newLocation || !newPrice) return;

  await fetch(API + "/properties/" + id, {
    method:"PUT",
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      title: newTitle,
      location: newLocation,
      price: newPrice,
      status: newStatus
    })
  });

  loadProperties();
}

/* DASHBOARD */
function loadDashboard(properties){
  document.getElementById('totalProperties').innerText = properties.length;

  const totalValue = properties.reduce((sum, p) => sum + Number(p.price), 0);
  document.getElementById('totalValue').innerText = totalValue;

  const labels = properties.map(p => p.title);
  const prices = properties.map(p => Number(p.price));

  /* COLORFUL BAR CHART */
  if(priceChartInstance) priceChartInstance.destroy();

  priceChartInstance = new Chart(document.getElementById('priceChart'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Property Prices',
        data: prices,
        backgroundColor: [
          '#3b82f6',
          '#22c55e',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#06b6d4'
        ]
      }]
    }
  });

  /* LOCATION PIE CHART */
  const locationCount = {};
  properties.forEach(p => {
    locationCount[p.location] = (locationCount[p.location] || 0) + 1;
  });

  if(locationChartInstance) locationChartInstance.destroy();

  locationChartInstance = new Chart(document.getElementById('locationChart'), {
    type: 'pie',
    data: {
      labels: Object.keys(locationCount),
      datasets: [{
        data: Object.values(locationCount),
        backgroundColor: [
          '#3b82f6',
          '#22c55e',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#06b6d4'
        ]
      }]
    }
  });
}

/* FILTER */
function filterProperties(){
  const value = document.getElementById('filterLocation').value.toLowerCase();

  document.querySelectorAll('.property').forEach(card => {
    card.style.display =
      card.innerText.toLowerCase().includes(value) ? "block" : "none";
  });
}

/* INIT */
loadProperties();