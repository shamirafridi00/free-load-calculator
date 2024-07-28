document.getElementById('calculateTensile').addEventListener('click', calculateTensileLoad);
document.getElementById('calculateShear').addEventListener('click', calculateShearLoad);
document.getElementById('calculateClamp').addEventListener('click', calculateClampLoad);
document.getElementById('calculateEccentric').addEventListener('click', calculateEccentricLoad);
document.getElementById('calculateAxial').addEventListener('click', calculateAxialLoad);
document.getElementById('clearForm').addEventListener('click', clearForm);

function calculateTensileLoad() {
    const diameter = parseFloat(document.getElementById('diameter').value);
    const force = parseFloat(document.getElementById('force').value);
    clearErrors();
    if (validateInputs(diameter, force)) {
        const area = Math.PI * Math.pow(diameter / 2, 2);
        const tensileLoad = force / area;
        displayResult(`Tensile Load: ${tensileLoad.toFixed(2)} N/mm²`, 'Tensile Load is the maximum load a bolt can withstand without breaking when being stretched or pulled.');
    }
}

function calculateShearLoad() {
    const diameter = parseFloat(document.getElementById('diameter').value);
    const force = parseFloat(document.getElementById('force').value);
    const angle = parseFloat(document.getElementById('angle').value);
    clearErrors();
    if (validateInputs(diameter, force, angle)) {
        const area = Math.PI * Math.pow(diameter / 2, 2);
        const shearLoad = (force * Math.cos(angle * Math.PI / 180)) / area;
        displayResult(`Shear Load: ${shearLoad.toFixed(2)} N/mm²`, 'Shear Load is the load that causes a bolt to slide or shear off at a right angle to its axis.');
    }
}

function calculateClampLoad() {
    const diameter = parseFloat(document.getElementById('diameter').value);
    const force = parseFloat(document.getElementById('force').value);
    clearErrors();
    if (validateInputs(diameter, force)) {
        const clampLoad = force / diameter;
        displayResult(`Clamp Load: ${clampLoad.toFixed(2)} N/mm`, 'Clamp Load is the force that holds the components together, preventing them from separating.');
    }
}

function calculateEccentricLoad() {
    const diameter = parseFloat(document.getElementById('diameter').value);
    const force = parseFloat(document.getElementById('force').value);
    const eccentricDistance = parseFloat(document.getElementById('eccentricDistance').value);
    clearErrors();
    if (validateInputs(diameter, force, eccentricDistance)) {
        const area = Math.PI * Math.pow(diameter / 2, 2);
        const eccentricLoad = (force * eccentricDistance) / area;
        displayResult(`Eccentric Load: ${eccentricLoad.toFixed(2)} N/mm²`, 'Eccentric Load is the load applied at a distance from the bolt\'s axis, causing bending in addition to direct shear or tensile loads.');
    }
}

function calculateAxialLoad() {
    const diameter = parseFloat(document.getElementById('diameter').value);
    const force = parseFloat(document.getElementById('force').value);
    clearErrors();
    if (validateInputs(diameter, force)) {
        const area = Math.PI * Math.pow(diameter / 2, 2);
        const axialLoad = force / area;
        displayResult(`Axial Load: ${axialLoad.toFixed(2)} N/mm²`, 'Axial Load is the load applied along the axis of the bolt, causing it to elongate or compress.');
    }
}

function displayResult(result, summary) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerText = result;
    resultsElement.classList.add('success');
    setTimeout(() => resultsElement.classList.remove('success'), 3000);
    displaySummary(summary);
}

function displaySummary(summary) {
    document.getElementById('summary').innerText = summary;
}

function validateInputs(...values) {
    let isValid = true;
    values.forEach((value, index) => {
        if (isNaN(value) || value <= 0 || !isFinite(value) || value > 1e9) {
            const errorElement = document.getElementById(`${getFieldName(index)}Error`);
            errorElement.innerText = getErrorMessage(index, value);
            errorElement.style.display = 'block';
            isValid = false;
        }
    });
    return isValid;
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.style.display = 'none';
    });
}

function getFieldName(index) {
    switch (index) {
        case 0: return 'diameter';
        case 1: return 'force';
        case 2: return 'angle';
        case 3: return 'eccentricDistance';
        default: return '';
    }
}

function getErrorMessage(index, value) {
    if (isNaN(value) || !isFinite(value)) {
        return 'Please enter a valid number.';
    }
    if (value <= 0) {
        switch (index) {
            case 0: return 'Please enter a bolt diameter greater than 0.';
            case 1: return 'Please enter an applied force greater than 0.';
            case 2: return 'Please enter a load angle greater than 0.';
            case 3: return 'Please enter an eccentric distance greater than 0.';
            default: return 'Invalid input. Please enter a positive number.';
        }
    }
    if (value > 1e9) {
        return 'Please enter a value less than or equal to 1,000,000,000.';
    }
    return 'Invalid input. Please enter a positive number.';
}

function clearForm() {
    document.getElementById('boltForm').reset();
    clearErrors();
    displayResult('', '');
    displaySummary('');
}
