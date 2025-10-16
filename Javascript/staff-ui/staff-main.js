// ===================== MAIN JS =====================
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.content-area');

  // ===== Function to load a page (reusable) =====
  function loadPage(pageUrl) {
    fetch(pageUrl)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;

        if (pageUrl.includes("dashboard")) document.title = "Staff Portal - Dashboard";
        else if (pageUrl.includes("appointments")) document.title = "Staff Portal - Appointments";
        else if (pageUrl.includes("help")) document.title = "Staff Portal- Help";
        else if (pageUrl.includes("account")) document.title = "Staff Portal - My Account";
        else if (pageUrl.includes("records")) document.title = "Staff Portal Patient Record";
        else if (pageUrl.includes("messages")) document.title = "Staff Portal - Messages";
        else if (pageUrl.includes("inventory")) document.title = "Staff Portal - Inventory Management";


        else document.title = "Staff Portal";
        // ✅ Always reset scroll to top
        window.scrollTo(0, 0);
        const contentArea = document.querySelector('.main-content-area-container');
        if (contentArea) contentArea.scrollTop = 0;

        // ✅ Initialize the page logic after it's inserted
        initPageScript(pageUrl);
      })
      .catch(err => console.error('Error loading page:', err));
  }

  // ===== Attach click events to all sidebar links =====
  document.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault(); 
      const pageUrl = link.getAttribute('data-page');
      loadPage(pageUrl);
    });
  });

  // ✅ Automatically load the dashboard by default when page loads
  loadPage('../../HTML/staff-ui/staff-subfolder/staff-dashboard.html');
});


// ===================== PAGE SCRIPT INITIALIZER =====================
function initPageScript(pageUrl) {
  if (pageUrl.includes('staff-my-account.html')) {
    if (typeof initMyAccountPage === 'function') {
      initMyAccountPage();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/patient-ui/patient-subfolder/patient-my-account.js';
      script.defer = true;
      script.onload = () => initMyAccountPage();
      document.body.appendChild(script);
    }
  }

  if (pageUrl.includes('patient-dashboard.html')) {
    if (typeof initPatientDashboard === 'function') {
      initPatientDashboard();
    }
  }

  if (pageUrl.includes('patient-appointments.html')) {
    if (typeof initPatientAppointments === 'function') {
      initPatientAppointments();
    }
  }
}


// ===================== Example Init Functions =====================
function initPatientDashboard() {
  console.log('Dashboard initialized');
}

function initPatientAppointments() {
  console.log('Appointments initialized');
}
