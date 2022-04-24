const sampleTimesheets = {
  _id: "2022-pp-9",
  status: "active",
  expected: 3,
  received: 1,
  timesheets: {
    "maria@ecoleshakespeare.com": {
      status: "awaitingApproval", //draft, toReview, accepted, rejected, paid
      total: 18.5, //hour count
      count: 13, //separate events?

      // start-end dateTime, duration, type (eval, class, admin, travel), name
      hours: [
        {
          start: "18 Apr 22 13:00 -05:00",
          end: "18 Apr 22 13:30 -05:00",
          duration: 0.5,
          type: "eval",
          name: "Walmart Evaluations - Arjun House",
        },
        {
          start: "18 Apr 22 13:30 -05:00",
          end: "18 Apr 22 14:00 -05:00",
          duration: 0.5,
          type: "eval",
          name: "Walmart Evaluations - Azaria Hernandez",
        },
        {
          start: "18 Apr 22 14:00 -05:00",
          end: "18 Apr 22 14:30 -05:00",
          duration: 0.5,
          type: "eval",
          name: "Walmart Evaluations - Kyleigh Chandler",
        },
        {
          start: "18 Apr 22 16:00 -05:00",
          end: "18 Apr 22 16:30 -05:00",
          duration: 0.5,
          type: "eval",
          name: "Walmart Evaluations - Randall Marsh",
        },
        {
          start: "18 Apr 22 16:30 -05:00",
          end: "18 Apr 22 17:00 -05:00",
          duration: 0.5,
          type: "eval",
          name: "Walmart Evaluations - Ricky Mann",
        },
        {
          start: "19 Apr 22 08:00 -05:00",
          end: "19 Apr 22 10:00 -05:00",
          duration: 2,
          type: "class",
          name: "Shakespeare - Teams 1 - session #3",
        },
        {
          start: "19 Apr 22 10:00 -05:00",
          end: "19 Apr 22 12:00 -05:00",
          duration: 2,
          type: "class",
          name: "Shakespeare - Teams 2 - session #3",
        },
        {
          start: "20 Apr 22 08:00 -05:00",
          end: "20 Apr 22 10:00 -05:00",
          duration: 2,
          type: "class",
          name: "Shakespeare - Teams 1 - session #4",
        },
        {
          start: "20 Apr 22 10:00 -05:00",
          end: "20 Apr 22 12:00 -05:00",
          duration: 2,
          type: "class",
          name: "Shakespeare - Teams 2 - session #4",
        },
        {
          start: "21 Apr 22 08:00 -05:00",
          end: "21 Apr 22 10:00 -05:00",
          duration: 2,
          type: "class",
          name: "Shakespeare - Teams 1 - session #3",
        },
        {
          start: "21 Apr 22 10:00 -05:00",
          end: "21 Apr 22 12:00 -05:00",
          duration: 2,
          type: "class",
          name: "Shakespeare - Teams 2 - session #3",
        },
        {
          start: "22 Apr 22 08:00 -05:00",
          end: "22 Apr 22 10:00 -05:00",
          duration: 2,
          type: "class",
          name: "Shakespeare - Teams 1 - session #4",
        },
        {
          start: "22 Apr 22 10:00 -05:00",
          end: "22 Apr 22 12:00 -05:00",
          duration: 2,
          type: "class",
          name: "Shakespeare - Teams 2 - session #4",
        },
      ],
    },
  },
};

const sampleClasses = [
  {
    _id: "shakespeare-h22-teams-1-angiet",
    name: "Bonduelle - Teams 1",
    eventID: "",
    url: "",
    teacher_id: "angie_theodorakis",
    participants: ["kristina_joachim", "john_doe_3", "maria_pacheco"],
  },
];

const sampleUsers = [
  {
    _id: "kristina_joachim",
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
    },
  },
  {
    legalName: "Allen Rosenbaum",
    _id: "allen_rosenbaum",
    displayName: "Allen R",
    givenName: "Allen",
    surname: "Rosenbaum",
    emails: {
      work: "allen4@memory.com",
      personal: "allen09426@hotmail.com",
    },
    phones: {
      cell: "118-330-0749",
      work: "027-314-9488",
    },
    company: 001,
    active: true,
    type: "internal teacher",
    moreInfo: {
      salary: "28.24",
      activeCourses: ["tablets_software-a19-zoom-1-allen"],
      pastCourses: ["tablets_software-e20-zoom-3-allen", "newport_mutual_gmbh-e20-zoom-5-allen"],
      langTaught: "FR",
    },
  },
  {
    legalName: "Linda Hazel",
    _id: "linda_hazel",
    displayName: "Linda H",
    givenName: "Linda",
    surname: "Hazel",
    emails: {
      work: "linda8457@randy.com",
      personal: "linda-hazel@gmail.com",
    },
    phones: {
      work: "487-883-4052",
    },
    company: 001,
    active: false,
    type: "internal teacher",
    moreInfo: {
      salary: "39.97",
      activeCourses: ["mustang_gmbh-p20-teams-3-linda"],
      pastCourses: ["mustang_gmbh-a19-teams-3-linda", "newest_international_ltd-h19-teams-9-linda"],
      langTaught: "EN",
    },
  },
  {
    legalName: "Lavada Ledford",
    _id: "lavada_ledford",
    displayName: "Lavada L",
    givenName: "Lavada",
    surname: "Ledford",
    emails: {
      work: "lavada.ledford24@adjust.com",
      personal: "lavada23@gmail.com",
    },
    phones: {
      cell: "516-570-5157",
      home: "736-883-1581",
    },
    company: 001,
    active: false,
    type: "internal teacher",
    moreInfo: {
      salary: "31.92",
      activeCourses: ["ms_corp-p21-zoom-5-lavada"],
      pastCourses: ["ms_corp-a20-zoom-2-lavada", "rock_ind-h20-teams-2-lavada"],
      langTaught: "SPA",
    },
  },
  {
    legalName: "Chance Lindquist",
    _id: "chance_lindquist",
    displayName: "Chance",
    givenName: "Chance",
    surname: "Lindquist",
    emails: {
      work: "chance715@cassette.is-an-artist.com",
    },
    phones: {
      work: "563-211-0443",
      cell: "308-517-5353",
    },
    company: 500,
    active: false,
    type: "external student",
    moreInfo: {
      activeCourses: ["unsigned industries s.a-e-18-zoom-8-chance"],
      pastCourses: ["unsigned industries s.a-h-19-teams-7-chance", "compare energy sia-h-18-zoom-9-chance"],
      workplaceInfo: {
        dept: "Extraction of salt",
        title: "-",
        notes: "-",
      },
    },
  },
  {
    legalName: "Denisse Uribe-Driver",
    _id: "denisse_uribe-driver",
    displayName: "Denisse",
    givenName: "Denisse",
    surname: "Uribe-Driver",
    emails: {
      work: "denisse3@hotmail.com",
    },
    phones: {
      work: "343-101-9744",
      home: "385-403-8449",
    },
    company: 536,
    active: true,
    type: "external student",
    moreInfo: {
      activeCourses: ["walter industries company-p-20-zoom-7-denisse"],
      pastCourses: ["walter industries company-a-18-zoom-9-denisse", "eating ltd-e-20-teams-6-denisse"],
      workplaceInfo: {
        dept: "Film processing",
        title: "-",
        notes: "-",
      },
    },
  },
  {
    legalName: "Alyce Robbins",
    _id: "alyce_robbins",
    displayName: "Alyce",
    givenName: "Alyce",
    surname: "Robbins",
    emails: {
      work: "alyce8501@until.industries.org",
    },
    phones: {
      work: "788-116-5074",
      home: "553-718-6459",
    },
    company: 214,
    active: false,
    type: "external student",
    moreInfo: {
      activeCourses: ["until_industries-p22-zoom-3-alyce"],
      pastCourses: ["until_industries-p18-teams-4-alyce", "until_industries-h20-zoom-1-alyce"],
      workplaceInfo: {
        dept: "Manufacture of cleaning and polishing preparations",
        title: "-",
        notes: "-",
      },
    },
  },
  {
    legalName: "Kristianne Alice Ledet",
    _id: "kristy_ledet",
    displayName: "Kristy L",
    givenName: "Kristy",
    surname: "Ledet",
    emails: {
      work: "kristy-ledet09583@holidaysmutual.com",
    },
    phones: {
      work: "750-020-8160",
      cell: "738-396-3448",
    },
    company: 960,
    active: true,
    type: "external student",
    moreInfo: {
      activeCourses: ["holidays_mutual-a22-zoom-6-kristy"],
      pastCourses: ["holidays_mutual-h20-zoom-7-kristy", "holidays_mutual-a20-teams-2-kristy"],
      workplaceInfo: {
        dept: "Museums activities",
        title: "-",
        notes: "-",
      },
    },
  },
  {
    legalName: "Melodee Lloyd",
    _id: "melodee_lloyd",
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
      activeCourses: ["holidays_mutual-p22-teams-4-melodee"],
      pastCourses: ["holidays_mutual-a19-zoom-8-melodee", "holidays_mutual-a21-teams-1-melodee"],
      workplaceInfo: {
        dept: "Manufacture of flat glass",
        title: "-",
        notes: "-",
      },
    },
  },
];

module.exports = { sampleClasses, sampleTimesheets, sampleUsers };
