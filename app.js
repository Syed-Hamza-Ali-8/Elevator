let currentFloor = 1; 
let floorQueue = []; 
let isMoving = false; 

const personImages = {
    1: 'person-1',
    2: 'person-2',
    3: 'person-3',
    4: 'person-4'
};

function moveElevatorToFloor(floor) {

    if (floorQueue.includes(floor)) return;
    
    floorQueue.push(floor);
    
    if (!isMoving) {
        processNextFloor();
    }
}

function processNextFloor() {
    if (floorQueue.length === 0) {
        isMoving = false;
        return;
    }
    
    isMoving = true;
    
    const nextFloor = floorQueue.shift(); 
    const elevator = document.querySelector('.elevator');
    const leftDoor = document.querySelector('.left-door');
    const rightDoor = document.querySelector('.right-door');
    const floorDisplay = document.getElementById('currentFloor');
    

    let transformValue;
    if (nextFloor === 1) {
        transformValue = 'translateY(0px)';
    } else if (nextFloor === 2) {
        transformValue = 'translateY(-123px)';
    } else if (nextFloor === 3) {
        transformValue = 'translateY(-246px)';
    } else if (nextFloor === 4) {
        transformValue = 'translateY(-369px)';
    } else {
        transformValue = 'translateY(0px)';
    }
    

    closeDoors();
    

    elevator.style.transform = transformValue;
    floorDisplay.textContent = `Current Floor: ${nextFloor}`;
    

    setTimeout(() => {
        openDoors();
        showPersonInElevator(nextFloor);
        

        setTimeout(() => {
            closeDoors();
            hidePersonInElevator();
            processNextFloor();
        }, 4000); 
    }, 3000); 
}

function openDoors() {
    const leftDoor = document.querySelector('.left-door');
    const rightDoor = document.querySelector('.right-door');
    
    leftDoor.classList.add('open-left');
    rightDoor.classList.add('open-right');
}

function closeDoors() {
    const leftDoor = document.querySelector('.left-door');
    const rightDoor = document.querySelector('.right-door');
    
    leftDoor.classList.remove('open-left');
    rightDoor.classList.remove('open-right');
}

function showPersonInElevator(floor) {
    const people = document.querySelectorAll('.person');
    people.forEach(person => person.style.visibility = 'hidden'); 
    const visiblePerson = document.querySelector(`.${personImages[floor]}`);
    if (visiblePerson) {
        visiblePerson.style.visibility = 'visible'; 
    }
}

function hidePersonInElevator() {
    const people = document.querySelectorAll('.person');
    people.forEach(person => person.style.visibility = 'hidden'); 
}
