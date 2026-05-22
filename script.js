document.addEventListener("DOMContentLoaded", () => {
  let selectedRole = "";
  let currentSection = "";
  let currentDate = new Date();
  let selectedDate = null;
  let events = {};
  let selectedImageBase64 = "";

  function selectRole(role) {
    selectedRole = role;
    const input = document.getElementById("selectedRole");
    if (input) input.value = role;
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!selectedRole) return alert("Selecciona un tipo de acceso");
      if (!username || !password) return alert("Completa usuario y contraseña");

      if (selectedRole === "admin") window.location.href = "admin.html";
      if (selectedRole === "alumno") window.location.href = "alumno.html";
      if (selectedRole === "departamento") window.location.href = "departamento.html";
    });
  }

  function showSection(id, btn) {
    document.querySelectorAll(".section").forEach(section => section.style.display = "none");
    const target = document.getElementById(id);
    if (target) target.style.display = "block";

    document.querySelectorAll(".nav-btn").forEach(button => button.classList.remove("active"));
    if (btn) btn.classList.add("active");

    if (id === "calendario") {
      setTimeout(renderCalendar, 50);
    }
  }

  function openModal(section) {
    currentSection = section;
    const modal = document.getElementById("modal");
    const title = document.getElementById("modalTitle");
    const fields = document.getElementById("modalFields");
    if (!modal || !title || !fields) return;

    modal.classList.remove("hidden");
    fields.innerHTML = "";
    selectedImageBase64 = "";

    if (section === "solicitud") {
      title.textContent = "Hoja de Solicitud";
      fields.innerHTML = `
        <input id="field1" type="text" placeholder="Nombre departamento">
        <input id="field2" type="date">
        <input id="field3" type="text" placeholder="Título">
        <textarea id="field4" placeholder="Descripción"></textarea>
      `;
    }

    if (section === "reporte") {
      title.textContent = "Hoja de Reporte";
      fields.innerHTML = `
        <input id="field1" type="text" placeholder="Nombre departamento">
        <input id="field2" type="date">
        <input id="field3" type="text" placeholder="Título">
        <textarea id="field4" placeholder="Descripción"></textarea>
      `;
    }

    if (section === "evidencia") {
      title.textContent = "Hoja de Evidencia";
      fields.innerHTML = `
        <input id="field1" type="text" placeholder="Título">
        <input id="field2" type="text" placeholder="Nombre alumno">
        <input id="field3" type="date">
        <textarea id="field4" placeholder="Descripción"></textarea>
        <div class="image-box">
          <p>Agregue imagen aquí</p>
          <input id="field5" type="file" accept="image/*">
          <img id="imagePreview" class="image-preview" alt="Vista previa">
        </div>
      `;

      const fileInput = document.getElementById("field5");
      const preview = document.getElementById("imagePreview");

      fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          selectedImageBase64 = e.target.result;
          preview.src = selectedImageBase64;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      });
    }
  }

  function closeModal() {
    const modal = document.getElementById("modal");
    const form = document.getElementById("modalForm");
    if (modal) modal.classList.add("hidden");
    if (form) form.reset();
  }

  const modalForm = document.getElementById("modalForm");
  if (modalForm) {
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (currentSection === "solicitud") {
        const departamento = document.getElementById("field1").value;
        const fecha = document.getElementById("field2").value;
        const titulo = document.getElementById("field3").value;
        const descripcion = document.getElementById("field4").value;

        const supportList = document.getElementById("supportList");
        if (supportList) {
          supportList.innerHTML += `
            <div class="event-item orange">
              <strong>Solicitud</strong><br>
              Departamento: ${departamento}<br>
              Fecha: ${fecha}<br>
              Título: ${titulo}<br>
              Descripción: ${descripcion}
            </div>
          `;
        }
      }

      if (currentSection === "reporte") {
        const departamento = document.getElementById("field1").value;
        const fecha = document.getElementById("field2").value;
        const titulo = document.getElementById("field3").value;
        const descripcion = document.getElementById("field4").value;

        const supportList = document.getElementById("supportList");
        if (supportList) {
          supportList.innerHTML += `
            <div class="event-item red">
              <strong>Reporte</strong><br>
              Departamento: ${departamento}<br>
              Fecha: ${fecha}<br>
              Título: ${titulo}<br>
              Descripción: ${descripcion}
            </div>
          `;
        }
      }

      if (currentSection === "evidencia") {
        const titulo = document.getElementById("field1").value;
        const alumno = document.getElementById("field2").value;
        const fecha = document.getElementById("field3").value;
        const descripcion = document.getElementById("field4").value;

        const evidenceList = document.getElementById("evidenceList");
        if (evidenceList) {
          evidenceList.innerHTML += `
            <div class="event-item blue">
              <strong>Evidencia</strong><br>
              Título: ${titulo}<br>
              Nombre alumno: ${alumno}<br>
              Fecha: ${fecha}<br>
              Descripción: ${descripcion}
              ${selectedImageBase64 ? `<img src="${selectedImageBase64}" style="max-width:100%;margin-top:10px;border-radius:10px;">` : ""}
            </div>
          `;
        }
      }

      closeModal();
    });
  }

  function renderCalendar() {
    const calendarGrid = document.getElementById("calendarGrid");
    const monthTitle = document.getElementById("monthTitle");
    if (!calendarGrid || !monthTitle) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    monthTitle.textContent = `${monthNames[month]} ${year}`;
    calendarGrid.innerHTML = "";

    dayNames.forEach(day => {
      const div = document.createElement("div");
      div.className = "day-name";
      div.textContent = day;
      calendarGrid.appendChild(div);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < adjustedFirstDay; i++) {
      const empty = document.createElement("div");
      calendarGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("div");
      cell.className = "day-cell";
      const dateKey = `${year}-${month + 1}-${day}`;
      cell.innerHTML = `<div class="day-number">${day}</div>`;

      if (events[dateKey]) {
        events[dateKey].forEach(text => {
          const tag = document.createElement("span");
          tag.textContent = text;
          cell.appendChild(tag);
        });
      }

      cell.addEventListener("click", () => {
        selectedDate = dateKey;
        const modal = document.getElementById("modal");
        const selectedDateText = document.getElementById("selectedDateText");
        const eventInput = document.getElementById("eventInput");

        if (modal && selectedDateText && eventInput) {
          modal.classList.remove("hidden");
          selectedDateText.textContent = `Fecha seleccionada: ${dateKey}`;
          eventInput.value = "";
        }
      });

      calendarGrid.appendChild(cell);
    }
  }

  function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
  }

  function goToday() {
    currentDate = new Date();
    renderCalendar();
  }

  function saveEvent() {
    const input = document.getElementById("eventInput");
    const text = input ? input.value.trim() : "";
    if (!text || !selectedDate) return;

    if (!events[selectedDate]) events[selectedDate] = [];
    events[selectedDate].push(text);

    const modal = document.getElementById("modal");
    if (modal) modal.classList.add("hidden");

    selectedDate = null;
    renderCalendar();
  }

  window.selectRole = selectRole;
  window.showSection = showSection;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.changeMonth = changeMonth;
  window.goToday = goToday;
  window.saveEvent = saveEvent;

  renderCalendar();
});