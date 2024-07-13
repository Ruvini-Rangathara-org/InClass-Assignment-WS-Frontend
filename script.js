document.getElementById('dob').addEventListener('change', function() {
    const dob = new Date(this.value);
    const age = calculateAge(dob);
    document.getElementById('age').value = age;
});

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('image', image);

    console.log()
    console.log("Form Data : ", formData)
    console.log(formData.get('name'))
    console.log(formData.get('age'))


    fetch('http://18.206.158.216/app/users', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            showModal(`User ${name} has been saved successfully.`, true);
        })
        .catch(error => {
            console.error('Error:', error);
            showModal('An error occurred. Please try again.', false);
        });


});


document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('userForm').reset();
    document.getElementById('result').innerText = '';
});

function calculateAge(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    // If today's month and day are before dob's month and day, subtract one from age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}


function showModal(message, shouldReset) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModal = document.getElementsByClassName('close')[0];
    const modalOkButton = document.getElementById('modal-ok');

    modalMessage.innerText = message;
    modal.style.display = 'block';

    const closeHandler = () => {
        modal.style.display = 'none';
        if (shouldReset) {
            document.getElementById('userForm').reset();
        }
        closeModal.removeEventListener('click', closeHandler);
        modalOkButton.removeEventListener('click', closeHandler);
    };

    closeModal.addEventListener('click', closeHandler);
    modalOkButton.addEventListener('click', closeHandler);

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            if (shouldReset) {
                document.getElementById('userForm').reset();
            }
            closeModal.removeEventListener('click', closeHandler);
            modalOkButton.removeEventListener('click', closeHandler);
        }
    };
}