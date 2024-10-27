document.getElementById("submit").addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let price = Number(document.getElementById("startingBid").value);

    if (name && price) {
        calculateDowry(name, price);
    } else {
        alert("Please enter both a name and a starting bid.");
    }
});

const calculateDowry = (name, price) => {

    const educationCoefficient = Number(document.getElementById("education").value);
    price *= educationCoefficient;


    const netWorthCoefficient = Number(document.getElementById("networth").value);
    price *= netWorthCoefficient;


    const casteValue = Number(document.getElementById("caste").value);
    price += casteValue;

 
    const skills = Array.from(document.querySelectorAll(".skills:checked"))
        .map(skill => Number(skill.value));
    const skillTotal = skills.reduce((acc, curr) => acc + curr, 0);
    price += skillTotal;


    let ageCoefficient = 1;
    document.querySelectorAll(".age").forEach(ageOption => {
        if (ageOption.checked) {
            ageCoefficient = Number(ageOption.value);
        }
    });
    price *= ageCoefficient;


    let reputationCoefficient = 1;
    const reputations = document.querySelectorAll(".reputation:checked");
    for (let i = 0; i < reputations.length; i++) {
        const repValue = Number(reputations[i].value);
        if (repValue < 1) {
            price += repValue;
        } else {
            reputationCoefficient *= repValue;
        }
    }
    price *= reputationCoefficient;

    const loveLetter = document.getElementById("loveLetter").value;

    const person = {
        name,
        price: price.toFixed(2),
        loveLetter
    };

    document.getElementById("result").innerHTML = `
        <p>Your calculated dowry for ${person.name} is $${person.price}</p>
        <p>Your love letter: ${person.loveLetter}</p>
    `;
};
