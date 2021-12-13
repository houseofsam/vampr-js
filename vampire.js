class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampr = this;

    while (currentVampr.creator) {
      currentVampr = currentVampr.creator;
      count++;
    }

    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }

    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    console.log('name being searched', name)

    if (this.name === name) {
      console.log('found a match!', this.name);
      return this;
    }
    
    for (const offspring of this.offspring) {
      console.log('offspring', offspring.name);
      const vampWeLookingFor = offspring.vampireWithName(name);
      if (vampWeLookingFor) {
        return vampWeLookingFor;
      }
    }

    return null;
    
  }

  /*
  returns. line 58 & 59 is the difference. 

 name being searched root
found a match! root
name being searched andrew
offspring andrew
name being searched andrew
found a match! andrew
name being searched sarah
offspring andrew
name being searched sarah
offspring sarah
name being searched sarah
found a match! sarah
name being searched e
offspring andrew
name being searched e
offspring sarah
name being searched e
offspring c
name being searched e
offspring d
name being searched e
offspring e
name being searched e
found a match! e
name being searched e
offspring d
name being searched e
offspring e
name being searched e
found a match! e
  
  */

  // Returns the total number of vampires that exist
  get totalDescendents() {
    
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampr = vampire;
    let thisCurrentVampr = this;
    let vampireAncestors = [];
    let thisVampireAncestors = []

    if (currentVampr.creator === null) {
      return currentVampr;
    } else if (thisCurrentVampr.creator === null) {
      return thisCurrentVampr;
    }
  

    while (currentVampr.creator) {
      vampireAncestors.push(currentVampr.name);
      currentVampr = currentVampr.creator;
    }
    
    while (thisCurrentVampr.creator) {
      thisVampireAncestors.push(thisCurrentVampr.name);
      thisCurrentVampr = thisCurrentVampr.creator;
    }

    console.log('vamp anc', vampireAncestors);
    console.log('this vamp anc', thisVampireAncestors);

    // if the ancestors are the same, a vampire is being compared to itself therefore return that vampire.
    if (JSON.stringify(vampireAncestors) === JSON.stringify(thisVampireAncestors)) {
      return this;
    }

    for (let i = 0; i < vampireAncestors.length; i++) {
      for (let j = 0; j < thisVampireAncestors.length; j++){
        if (vampireAncestors[i] === thisVampireAncestors[j]) {
          console.log(vampireAncestors[i]);
          return vampireAncestors[i];
        }
      }
    }

    return currentVampr;

  }
}

module.exports = Vampire;



