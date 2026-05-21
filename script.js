let selectedRole = "";
let currentSection = "";

function selectRole(role) {
  selectedRole = role;
  document.getElementById("selectedRole").value = role;
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!selectedRole) {
    alert("Selecciona un tipo de acceso");
    return;
  }

  if (!username || !password) {
    alert("Completa usuario y contraseña");
    return;
  }

  if (selectedRole === "admin") {
    window.location.href = "admin.html";
  } else if (selectedRole === "alumno") {
    window.location.href = "alumno.html";
  } else if (selectedRole === "departamento") {
    window.location.href = "departamento.html";
  }
});

function showSection(id, btn) {
  document.querySelectorAll(".section").forEach(section => {
    section.style.display = "none";
  });

  document.getElementById(id).style.display = "block";

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.remove("active");
  });

  btn.classList.add("active");
}

function deleteRow(btn) {
  btn.closest("tr").remove();
}

function deleteCard(btn) {
  btn.closest(".info-card").remove();
}

function openModal(section) {
  currentSection = section;
  const modal = document.getElementById("modal");
  const title = document.getElementById("modalTitle");
  const fields = document.getElementById("modalFields");

  modal.style.display = "block";
  fields.innerHTML = "";

  if (section === "horas") {
    title.textContent = "Agregar Hora";
    fields.innerHTML = `
      <input id="field1" type="text" placeholder="Nombre">
      <input id="field2" type="text" placeholder="Ingreso (09:00)">
      <input id="field3" type="text" placeholder="Salida (13:00)">
      <input id="field4" type="text" placeholder="Estado">
    `;
  }

  if (section === "tareas") {
    title.textContent = "Agregar Tarea";
    fields.innerHTML = `
      <input id="field1" type="text" placeholder="Alumno">
      <input id="field2" type="text" placeholder="Tarea">
      <input id="field3" type="text" placeholder="Estado">
    `;
  }

  if (section === "alumnos") {
    title.textContent = "Agregar Alumno";
    fields.innerHTML = `
      <input id="field1" type="text" placeholder="Nombre">
      <input id="field2" type="text" placeholder="Departamento">
    `;
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modalForm").reset();
}

document.getElementById("modalForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (currentSection === "horas") {
    const name = field1.value;
    const ingreso = field2.value;
    const salida = field3.value;
    const estado = field4.value;

    document.getElementById("horasTable").innerHTML += `
      <tr>
        <td>${name}</td>
        <td>${ingreso}</td>
        <td>${salida}</td>
        <td>${estado}</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Eliminar</button></td>
      </tr>
    `;
  }

  if (currentSection === "tareas") {
    const alumno = field1.value;
    const tarea = field2.value;
    const estado = field3.value;

    document.getElementById("tareasTable").innerHTML += `
      <tr>
        <td>${alumno}</td>
        <td>${tarea}</td>
        <td>${estado}</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Eliminar</button></td>
      </tr>
    `;
  }

  if (currentSection === "alumnos") {
    const nombre = field1.value;
    const depto = field2.value;

    document.getElementById("alumnosGrid").innerHTML += `
      <article class="info-card">
        <h3>${nombre}</h3>
        <p>${depto}</p>
        <button class="delete-btn" onclick="deleteCard(this)">Eliminar</button>
      </article>
    `;
  }

  closeModal();
  let html5QrCode;

document.getElementById("startCameraBtn").addEventListener("click", function () {
  const reader = document.getElementById("reader");
  const result = document.getElementById("scanResult");

  reader.style.display = "block";

  html5QrCode = new Html5Qrcode("reader");

  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      const cameraId = devices[0].id;

      html5QrCode.start(
        cameraId,
        {
          fps: 10,
          qrbox: 250
        },
        decodedText => {
          result.textContent = "QR detectado: " + decodedText;
          html5QrCode.stop();
        },
        errorMessage => {
        }
      );
    }
  }).catch(err => {
    result.textContent = "No se pudo abrir la cámara.";
  });
});
});