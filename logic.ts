//listing element

document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();


    //adding profilepicture

    const profilepictureInput = document.getElementById('profilePicture') as HTMLInputElement;

    //type assertion
    const nameElement = document.getElementById("name") as HTMLTextAreaElement;
    const emailElement = document.getElementById("email") as HTMLTextAreaElement;
    const phoneElement = document.getElementById("phone") as HTMLTextAreaElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLTextAreaElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLTextAreaElement;
    const skillsElement = document.getElementById("skills") as HTMLTextAreaElement;

    if (
      profilepictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement
    ) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;

// picture element
const profilePictureFile = profilepictureInput.files?.[0]
const profilePictureURL = profilePictureFile? URL.createObjectURL(profilePictureFile) : '';


      //create resume Output
const resumeOutput = `
<h2>Resume</h2>
${profilePictureURL ? `<img src="${profilePictureURL} alt="Profile Picture"class="profilePicture">` : "" }
<p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
<p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
<p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
<h3>Education</h3>
<p id="edit-education" class="editable">${education}</p>
<h3>Experience</h3>
<p id="edit-experience" class="editable">${experience}</p>
<h3>Skills</h3>
<p id="edit-skills" class="editable">${skills}</p>
`;

      // Display the resume output
      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        makeEditable();
      }
    } else {
      console.error("one more output element is missing");
    }
  });

  function makeEditable() {
    const nodeList = document.querySelectorAll('.editable');
    const editableElements = Array.prototype.slice.call(nodeList);
    editableElements.forEach(element => {
      element.addEventListener('click', function () {
        const currentElement = element as HTMLElement;
        const currentValue = currentElement.textContent || "";
  
        if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
          const input = document.createElement('input');
          input.type = 'text';
          input.value = currentValue;
          input.classList.add('editing-input');
          
          input.addEventListener('blur', function () {
            currentElement.textContent = input.value;
            currentElement.style.display = 'inline';
            input.remove();
          });
  
          currentElement.style.display = 'none';
          currentElement.parentNode?.insertBefore(input, currentElement);
          input.focus();
        }
      });
    });
  }