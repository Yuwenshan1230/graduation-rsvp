document.getElementById('rsvpForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById('submitBtn');
  const statusEl = document.getElementById('statusMessage');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'PROCESSING...';
  statusEl.textContent = '';
  statusEl.style.color = '';

  try {
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const pax = document.getElementById('pax');
    const participate = document.querySelector('input[name="participate"]:checked');

    // Validate elements exist
    if (!name || !email || !phone || !pax || !participate) {
      throw new Error("Form fields are missing in HTML");
    }

    // Prepare data
    const formData = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      pax: pax.value,
      participate: participate.value,
      timestamp: new Date().toISOString()
    };

    // Submit to Firebase
    const db = getDatabase();
    await push(ref(db, 'submissions'), formData);
    
    statusEl.textContent = '✅ RSVP SUBMITTED!';
    statusEl.style.color = '#076A63';
    e.target.reset();

  } catch (error) {
    console.error('Error:', error);
    statusEl.textContent = `❌ ERROR: ${error.message}`;
    statusEl.style.color = '#E8415E';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'SUBMIT RSVP';
  }
});