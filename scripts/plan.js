const planItem = document.getElementsByClassName('plan__item');
const planCard = Array.from(document.getElementsByClassName('plan__card'));
const planOptions = document.getElementsByClassName('plan__options');

// * Open and close Plan Item.
const planButton = document.getElementsByClassName('plan__button');

for (let i = 0; i < planButton.length; i++) {
    planButton[i].addEventListener('click', () => {
        planOptions[i].classList.toggle('hide');
        planButton[i].classList.toggle('hide');
    })
}


// * Select each option for each plan item when creating the coffee plan.
const orderSummary = document.getElementById('order-summary');
let weight;
let frequencyShipment;
let finalOrderSummary;
let isCapsule = false;

for (let i = 0; i < planItem.length; i++) { // * Iterates through each plan item.
    for (let j = 0; j < 3; j++) { // * Add event when which plan card is clicked.
        planItem[i].children[1].querySelectorAll('.plan__card')[j].addEventListener('click', event => {
            /** 
             ** Removes the 'selected' class for all of the cards in the actual 
             ** plan item in case any of them have it and add the same class at the clicked card.
             */
            for (let k = 0; k < 3; k++) { 
                planItem[i].children[1].querySelectorAll('.plan__card')[k].classList.remove('selected', `planItem-${[i + 1]}`);
            }

            event.currentTarget.classList.add('selected', `planItem-${[i + 1]}`);

            /**
             ** Opens the next plan item option when the previous is selected and 
             ** checks if the capsule is selected.
             **/
            if (isCapsule === false && i < (planOptions.length - 1)) {
                planOptions[i + 1].classList.remove('hide');
            } else {
                if (i === 2) {
                    planOptions[i + 2].classList.remove('hide');
                } else if (i < (planOptions.length - 1)) {
                    planOptions[i + 1].classList.remove('hide');
                }
            }

            //* Change the preferences in the order summary as the user selects the options.
            if (planItem[i].children[1].querySelectorAll('.plan__card')[j].classList.contains('planItem-1')) {
                const drinkAs = document.querySelector('.planItem-1').children[0].innerHTML;
                orderSummary.children[i].innerHTML = drinkAs;
                
                console.log(drinkAs);
                //* When 'Capsule' is selected, the summary text changes and the grind option is not available.
                if (drinkAs === 'Capsule') {
                    orderSummary.innerHTML = `I drink coffee using <span id="how-drink-summary">Capsules</span>, with a <span
                                            id="type-of-coffee-summary">_____</span> type of bean.
                                            <span id="coffee-quantity-summary">_____</span> ground,
                                            sent to me <span id="frequency-summary">_____</span>.`
                    planItem[3].classList.add('capsule-selected');
                    planButton[3].disabled = true;
                    isCapsule = true;

                } else {
                    orderSummary.innerHTML = `I drink coffee as <span id="how-drink-summary">${drinkAs}</span>, with a <span
                                            id="type-of-coffee-summary">_____</span> type of bean.
                                            <span id="coffee-quantity-summary">_____</span> ground ala <span id="grind-summary">_____</span>,
                                            sent to me <span id="frequency-summary">_____</span>.`
                    planItem[3].classList.remove('capsule-selected');
                    planButton[3].classList.remove('hide');
                    planButton[3].disabled = false;
                }

            } else if (planItem[i].children[1].querySelectorAll('.plan__card')[j].classList.contains('planItem-2')) {
                const beanType = document.querySelector('.planItem-2').children[0].innerHTML;
                orderSummary.children[i].innerHTML = beanType;
            } else if (planItem[i].children[1].querySelectorAll('.plan__card')[j].classList.contains('planItem-3')) {
                const gramsQuantity = document.querySelector('.planItem-3').children[0].innerHTML;
                orderSummary.children[i].innerHTML = gramsQuantity;
                weight = gramsQuantity;
            } else if (planItem[i].children[1].querySelectorAll('.plan__card')[j].classList.contains('planItem-4')) {
                const grind = document.querySelector('.planItem-4').children[0].innerHTML;
                orderSummary.children[i].innerHTML = grind;
            } else if (planItem[i].children[1].querySelectorAll('.plan__card')[j].classList.contains('planItem-5')) {
                const frequency = document.querySelector('.planItem-5').children[0].innerHTML;
                frequencyShipment = frequency;

                
                // * If the 'Capsules' option is selected, the grind text must be ommited.
                if (orderSummary.children[0].innerHTML === 'Capsules') {
                    orderSummary.children[i - 1].innerHTML = frequency;
                } else {
                    orderSummary.children[i].innerHTML = frequency;
                }
                // * Apllies order summary into the modal order summary.
                const createPlanButton = document.getElementById('create-plan');
                const modal = document.getElementById('modal');
                const modalOrderSummary = document.getElementById('modal__order-summary');
                const body = document.body;
                const changeOrderButton = document.getElementById('change-order');
                modalOrderSummary.innerHTML = finalOrderSummary;
                createPlanButton.addEventListener('click', () => {
                    modal.classList.add('modal-show');
                    body.classList.add('modal-show');
                    changeOrderButton.addEventListener('click', () => {
                        modal.classList.remove('modal-show');
                        body.classList.remove('modal-show');
                    })
                })
                modalOrderSummary.innerHTML = orderSummary.innerHTML;
    
                // * Shows the price of the shipment in the modal button.
                const price = document.getElementById('price');
                price.innerHTML = getShipmentPrice(weight, frequencyShipment);
            }            
        })
    }
}

//* Return different prices depending on the weight and frequency of shipment. 
function getShipmentPrice(wt, frequencyShip) {
    if (wt === '250g') {
        if (frequencyShip === 'Every week') {
            return '$7.20';
        } else if (frequencyShip === 'Every 2 weeks') {
            return '$9.60';
        } else if (frequencyShip === 'Every month')
            return '$12.00';
    } else if (wt === '500g') {
        if (frequencyShip === 'Every week') {
            return '$13.00';
        } else if (frequencyShip === 'Every 2 weeks') {
            return '$17.50';
        } else if (frequencyShip === 'Every month') {
            return '$22.00';
        }
    } else if (wt === '1000g') {
        if (frequencyShip === 'Every week') {
            return '$22.00';
        } else if (frequencyShip === 'Every 2 weeks') {
            return '$32.00';
        } else if (frequencyShip === 'Every month') {
            return '$42.00';
        }
    }
}

//* Returns the price per month of the order.
function getMonthlyCost(frequencyShip, price) {
    if (frequencyShip === 'Every week') {
        return price * 4;
    } else if (frequencyShip === 'Every 2 weeks') {
        return price * 2;
    } else if (frequencyShip === 'Every month') {
        return price;
    }
}
