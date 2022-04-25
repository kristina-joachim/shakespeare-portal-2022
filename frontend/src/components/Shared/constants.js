export const BASE_URL = "https://graph.microsoft.com/v1.0";

export const ACTIONS = {
  LOGIN_INITIALIZED: "LOGIN_INITIALIZED", //User clicks the log in button > fetch AuthURL > page is redirected externally to authURL
  LOGIN_VALIDATED: "LOGIN_VALIDATED",
  LOGIN_LOGOUT: "LOGIN_LOGOUT",
  GET_MAILBOX: "GET_MAILBOX",
  GET_EVENT_DETAILS: "GET_EVENT_DETAILS",
  ERROR: "ERROR",
  TODAYS_EVENTS: "TODAYS_EVENTS",
};

export const URLS = {
  LOGIN_INITIALIZED: "/auth/signin",
  LOGIN_VALIDATED: "/auth/redirect?code",
  LOGIN_LOGOUT: "/auth/signout",
  GET_MAILBOX: BASE_URL + "me/messages?$count&$top",
  GET_EVENT_DETAILS: BASE_URL + "/me/events/:evID",
};

export const ENDPOINTS = {
  tsByDate: {
    url: "/crud/timesheets?date",
  },
  tsById: {
    url: "/crud/timesheets?id",
  },
  myAvatar: {
    url: BASE_URL + "/me/photo",
    options: {
      headers: {
        Authorization: "authToken",
      },
    },
  },
  calendarEvents: {
    url: BASE_URL + "/me/calendars/:calID/calendarView?startDateTime&endDateTime&$top&$count",
    options: {
      headers: {
        Authorization: "authToken",
        Prefer: 'outlook.timezone="Eastern Standard Time"',
      },
    },
  },
  logout: {
    url: "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri",
  },
};

/*
  User Info: 
  Default: (id, displayName, givenName, surname, mail, userPrincipalName, preferredLanguage) 
    - otherMails for aliases
    - userType = Member or Guest
    - preferredName
    - externalUserState
  /users/{id}/{endpoint} = photo/$value, messages, events, drive
  PHOTO/$VALUE 
  const url = window.URL || window.webkitURL;
  const blobUrl = url.createObjectURL(image.data);
  document.getElementById(imageElement).setAttribute("src", blobUrl);
*/
const initialUser = {
  userID: null,
  userPrincipalName: null,
  names: {
    displayName: null,
    givenName: null,
    surname: null,
    preferredName: null,
  },
  emails: {
    main: null,
    aliases: null,
  },
  settings: {
    lang: null,
    avatar: null,
  },
};

/*
  Calendar Info: 
  (id, name, owner) 
  /users/{id}/{endpoint} = 
    Calendar details: calendar/{id}, 
    Events list: calendar/{id}/events
    Single Event: calendar/{id}/events/{id}
    Reccurring Event: calendar/{id}/events/{id}/instances?startDateTime&endDateTime
  ** headers: { Prefer: 'outlook.timezone="Eastern Standard Time"' }, ** else UTC
    
  REFERENCES: https://docs.microsoft.com/en-ca/graph/api/resources/{ENDPOINT}?view=graph-rest-1.0
  to create a new online meeting: 
    post event object. {isOnlineMeeting: true, onlineMeetingProvider: "teamsForBusiness"}
*/
const initialEvents = {
  calendar: {
    id: null,
    name: null,
    owner: null, // {name: "", address: ""}
  },
  events: [
    {
      id: null,
      subject: null,
      body: null,
      bodyPreview: null,
      organizer: null, //{ emailAddress: {name, address}}
      joinUrl: null,
      end: null, // TIME only { dateTime, timeZone}
      start: null, // TIME only
      isAllDay: null,
      recurrence: {
        iCalUId: null, // for recurring
        seriesMasterId: null,
        pattern: {
          daysOfWeek: null, //sunday, monday, tuesday, wednesday, thursday, friday, saturday
          firstDayOfWeek: null, //sunday, monday, tuesday, wednesday, thursday, friday, saturday
          interval: null, //every X days/weeks/months/years
          type: null, //daily, weekly, absoluteMonthly, absoluteYearly, relativeMonthly, relativeYearly
        }, //REF: recurrencepattern
        range: {
          startDate: null, //=EQUAL to start ^
          endDate: null, //not necessarily date of last occurence
          occurences: null,
          type: null, //endDate, noEnd, numbered
        }, //REF: recurrencerange
      },
      attendees: [
        {
          type: null, //required optional
          status: { repsonse: null, time: null }, //accept or declined?
          attendee: null, //{ name, address }
          attendance: {
            //REF: attendancerecord-list
            role: null, //organizer, presenter
            attendanceTime: null, //total in seconds
            displayName: null,
            id: null,
            tenantId: null,
            connections: [{ start: null, end: null, duration: null }], //connection intervals
          },
        },
      ], //{type, status:{response, time}, emailAddress: }
      location: null, // {displayName, locationType, uniqueId, uniqueIdType}
      status: {
        isCancelled: null,
        originalStart: null,
        type: null,
      },
    },
  ],
};
