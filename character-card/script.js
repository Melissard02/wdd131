const character = {
      name: "Melissa Dickerson",
      class: "Just a crab?",
      level: 5,
      health: 100,
      image: '',
      attacked() {
        if (this.health >= 20) {
          this.level -= 1;
          this.health -= 20;
        } else {
            alert('Character Died');
            console.log("health reached 0")
        }
        console.log("attack button clicked")
      },
      levelUp() {
        this.level += 1;
        this.health += 20;
        console.log("level up button clicked")
      }

    };

    fillInCharacter();
    const attackButton = document.querySelector("#attacked")
    const levelButton = document.querySelector("#levelup")

    attackButton.addEventListener("click", () =>
    {
        character.attacked();
        fillInCharacter();
    });

    levelButton.addEventListener("click", () =>
    {
        character.levelUp();
        fillInCharacter();
    });
        

function fillInCharacter()
{
    const nameValue = document.querySelector("#name")
    const healthValue = document.querySelector("#health")
    const levelValue = document.querySelector("#level")
    const classValue = document.querySelector("#class")

    nameValue.textContent = character.name
    healthValue.textContent = character.health
    levelValue.textContent = character.level
    classValue.textContent = character.class
}

 