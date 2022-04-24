# DATA Formats

## Users

### Format

- \_id >> fullName (not necessarily legal name + number if duplicates)
- displayName >> what others see
- givenName + surname >> preffered full name
- legalName >> for pay purposes
- pronouns >> for identification
- emails >> object with types of emails
- phones >> object with types of phones
- company >> id of company or { active: , past: []}
- status >> active/inactive
- type >> one or more of >> internal + [coord, teacher] || external + [student, contact_person]
- moreInfo >> type specific info. (see options)
- staff >>
  - teacher >> activeCourses, pastCourses, workbooks, langTaught, availability, evaluator
  - student >> activeCourses, pastCourses, workbooks, evaluations, workplaceInfo
  - contact >> quotes, contactFor: { activeCourses, pastCourses }

#### moreInfo options

- activeCourses [...courseID]
- pastCourses [...courseID]
- langTaught [...langID]
- workbooks { provided [...bookID], missing [...bookID] }
- evaluations [...evalID]
- workplaceInfo: { current: { dept: "", title: "", notes: ""}, past: [ {..} ] }
- availability: { updatedOn: "", validUntil: "", schedule: { "monday": [ { start:"9:00 AM", end: "12:00 PM", duration: "3" }, { start:"2:30 PM", end: "7:00 PM", duration: "3" }]}
- evaluator: null || { bookings: "url", companies: [..companyID], lang: [...langID], availability\*, active: [] }
- quotes: [...quoteID]

#### Example

Teacher

```json
{
  \_id: "kristina_joachim",
  displayName: "Kristina",
  givenName: "Kristina",
  surname: "Joachim",
  legalName: "Kristina Venice Joachim",
  emails: {
    work: "kristina@ecoleshakespeare.com",
    personal: "k.venice@hotmail.com",
  },
  phones: {
    cell: "5148023118",
  },
  comapany: "542",
  status: "active",
  type: "teacher",
  moreInfo: {
    activeCourses: ["concordia-h22-teams-9-kristina", "shakes-p22-teams-5-kristina"],
    pastCourses: ["shakes-a19-teams-1-kristina"],
    langTaught: ["English", "French"],
    workbooks: {
      provided: ["EN-VOL-1", "FR-MJPF-N1", "FR-MJPF-N2", "FR-MJPF-N3", "FR-MJPF-N4"],
      missing: ["EN-VOL-2", "EN-VOL-3", "EN-VOL-4"],
    },
    salary: "28",
  }
}
```

Student

```json
{
  legalName: "Melodee Lloyd",
\_id: "melodee_lloyd",
displayName: "Melodee",
givenName: "Melodee",
surname: "Lloyd",
emails: {
work: "melodee-lloyd3203@holidaysmutual.com",
},
phones: {
work: "907-592-7581",
cell: "358-069-8415",
},
company: 960,
active: true,
type: "external student",
moreInfo: {
activeCourses: ["holidays_mutual-p22-teams-4-allen"],
pastCourses: ["holidays_mutual-a19-zoom-8-allen", "holidays_mutual-a21-teams-1-lavada"],
workplaceInfo: {
dept: "Manufacture of flat glass",
title: "-",
notes: "-",
    },
  },
},
```

### Source

https://www.coderstool.com/json-test-data-generator

#### FORMAT > TEACHERS

```json
{
  "legalName": "{{name}}",
  "_id": "{{last firstname}}_{{last surname}}",
  "displayName": "{{last firstname}}",
  "givenName": "{{last firstname}}",
  "surname": "{{last surname}}",
  "emails": {
    "work": "{{email true}}",
    "personal": "{{email true}}"
  },
  "phones": {
    "{{oneof cell home work}}": "{{digits 3}}-{{digits 3}}-{{digits 4}}",
    "{{oneof cell home work}}": "{{digits 3}}-{{digits 3}}-{{digits 4}}"
  },
  "company": {{digits 3}},
  "active": {{boolean}},
  "type": "internal teacher",
  "moreInfo": {
    "salary": "{{float 25 40 2}}",
    "activeCourses": [
      "{{company | toLowerCase}}-{{oneof h p e a}}-{{integer 18 22}}-{{oneof teams zoom}}-{{digits 1}}-{{last firstname | toLowerCase}}"
    ],
    "pastCourses": [
      "{{last company | toLowerCase}}-{{oneof h p e a}}-{{integer 18 21}}-{{oneof teams zoom}}-{{digits 1}}-{{last firstname | toLowerCase}}",
      "{{company | toLowerCase}}-{{oneof h p e a}}-{{integer 18 21}}-{{oneof teams zoom}}-{{digits 1}}-{{last firstname | toLowerCase}}"
    ],
    "langTaught": "{{oneof EN FR SPA}}"
  }
}
```

#### FORMAT > STUDENTS

```json
{
  "legalName": "{{name}}",
  "_id": "{{last firstname | toLowerCase}}_{{last surname | toLowerCase}}",
  "displayName": "{{last firstname}}",
  "givenName": "{{last firstname}}",
  "surname": "{{last surname}}",
  "emails": {
    "work": "{{email true}}"
  },
  "phones": {
    "work": "{{digits 3}}-{{digits 3}}-{{digits 4}}",
    "{{oneof cell home}}": "{{digits 3}}-{{digits 3}}-{{digits 4}}"
  },
  "company": {{digits 3}},
  "active": {{boolean}},
  "type": "external student",
  "moreInfo": {
    "activeCourses": [
      "{{company | toLowerCase}}-{{oneof h p e a}}-{{integer 18 22}}-{{oneof teams zoom}}-{{digits 1}}-{{last firstname | toLowerCase}}"
    ],
    "pastCourses": [
      "{{last company | toLowerCase}}-{{oneof h p e a}}-{{integer 18 21}}-{{oneof teams zoom}}-{{digits 1}}-{{last firstname | toLowerCase}}",
      "{{company | toLowerCase}}-{{oneof h p e a}}-{{integer 18 21}}-{{oneof teams zoom}}-{{digits 1}}-{{last firstname | toLowerCase}}"
    ],
    "workplaceInfo": {
      "dept": "{{sic}}",
      "title": "-",
      "notes": "-"
    }
  }
}
```
