const signIn = e => {
  let formData = {
    name: document.getElementById('name').value,
    password: document.getElementById('password').value
  }

  localStorage.setItem('formData', JSON.stringify(formData));

  if (formData.name === 'manager' && formData.password === 'password') {
    console.log(localStorage.getItem('formData'));
  } else {
    e.preventDefault();
    document.getElementById('error-field').innerHTML = 'Username and/or password invalid. Please try again';

    document.onclick = function(e) {
      document.getElementById('error-field').innerHTML = '';
    }
  }
};